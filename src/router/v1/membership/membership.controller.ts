import { Request, Response } from "express";
import { responses } from "../../../utils/responses.util";
import { BodyRegisterType } from "./validator/register.validator";
import { UserEntity } from "../../../modules/user/entities/user.entity";
import { BodyLoginType } from "./validator/login.validator";
import {
  createUser,
  findOneUserByEmail,
  updateUserById,
  UserEntityType,
} from "../../../modules/user/user.service";
import {
  deleteFile,
  generateAuthToken,
  isFileMimeValid,
  isPasswordMatch,
  readFile,
  t,
} from "../../../utils";
import { dataSource } from "../../../modules/db/datasource";
import { BodyUpdateProfileType } from "./validator/updateProfile.validator";
import multer from "multer";
import { multerStorageCfg } from "../../../modules/file/multer.config";
import * as path from "path";
import { cloudinary_uploadFile } from "../../../modules/cloudinary/cloudinary.service";
import { createFile } from "../../../modules/file/file.service";
export async function httpPostRegister(
  req: Request,
  res: Response
): Promise<any> {
  const body = req.body as BodyRegisterType;

  const foundAnotherUser = await findOneUserByEmail(body.email.trim());

  if (foundAnotherUser) {
    return responses.res409(
      req,
      res,
      null,
      t(
        "general.error.already_exists",
        {
          property: t("property.user.email", null, req),
        },
        req
      )
    );
  }

  return await dataSource.manager.transaction(async (trx) => {
    await createUser(body, trx);

    return responses.res200(
      req,
      res,
      null,
      t(
        "general.info.created",
        {
          property: t("property.user.user", null, req),
        },
        req
      )
    );
  });
}

export async function httpPostLogin(req: Request, res: Response): Promise<any> {
  const body = req.body as BodyLoginType;
  const user = await findOneUserByEmail(body.email.trim());

  if (!user) {
    return responses.res401(
      req,
      res,
      null,
      t("general.error.invalid_credential", null, req)
    );
  }

  if (!isPasswordMatch(body.password, user.password)) {
    return responses.res401(
      req,
      res,
      null,
      t("general.error.invalid_credential", null, req)
    );
  }

  const authToken = generateAuthToken({
    id: user.id,
    email: user.email,
  });

  return responses.res200(
    req,
    res,
    {
      token: authToken,
    },
    t(
      "general.info.success",
      {
        property: t("property.general.login", null, req),
      },
      req
    )
  );
}

export async function httpGetProfile(
  req: Request,
  res: Response
): Promise<any> {
  const user = (req as any).user as UserEntityType;

  return responses.res200(req, res, {
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    profile_image: user.profile_image,
  });
}

export async function httpPutUpdate(req: Request, res: Response): Promise<any> {
  const oldUser = (req as any).user as UserEntityType;
  const body = req.body as BodyUpdateProfileType;

  return await dataSource.manager.transaction(async (trx) => {
    const user = await updateUserById(
      {
        user: {
          ...oldUser,
          first_name: body?.first_name || oldUser.first_name,
          last_name: body?.last_name || oldUser.last_name,
        },
        file: null,
      },
      trx
    );

    return responses.res200(req, res, {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_image: user.profile_image,
    });
  });
}

const upload = multer({
  storage: multerStorageCfg,
  limits: { fileSize: 1 * 1000 * 1000, files: 1 }, //1MB
}).single("file");

export async function httpPutUpdateProfileImage(
  req: Request,
  res: Response
): Promise<any> {
  await upload(req, res, async (_: any) => {
    const user = (req as any).user as UserEntityType;

    if (!req?.file) {
      return responses.res400(
        req,
        res,
        {},
        t(
          "class_validator.is_not_empty",
          {
            property: t("property.user.profile_picture", null, req),
          },
          req
        )
      );
    }

    const isValid = isFileMimeValid(req.file, [
      "image/png",
      "image/jpeg",
      "image/.png",
      "image/.jpeg",
    ]);

    if (!isValid) {
      return responses.res400(
        req,
        res,
        {},
        t("general.error.accpet_specific_extension", {
          extensions: ["png", "jpeg"].join(", "),
        })
      );
    }
    const filePath = path.join("/temp", req.file.filename);
    const fileBuffer = await readFile(filePath);
    const fileName = req.file.filename.split("#")[1];

    return await dataSource.manager.transaction(async (trx) => {
      const cloudinaryResponse = await cloudinary_uploadFile({
        fileBuffer,
        fileName: fileName,
        savePath: "nutech/profile",
      });

      const createdFile = await createFile(
        {
          original_name: fileName,
          path: cloudinaryResponse.secure_url,
          source: "cloudinary",
        },
        trx
      );

      const result = await updateUserById(
        {
          user,
          file: createdFile,
        },
        trx
      );

      await deleteFile(filePath);

      return responses.res200(
        req,
        res,
        {
          email: result.email,
          first_name: result.first_name,
          last_name: result.last_name,
          profile_image: result.profile_image,
        },
        t(
          "general.info.updated",
          {
            property: t("property.user.profile_picture", null, req),
          },
          req
        )
      );
    });
  });
}
