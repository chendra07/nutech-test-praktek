import { z } from "zod";
import { t, translateZodError } from "../../../../utils";
import { NextFunction, Request, Response } from "express";
import { responses } from "../../../../utils/responses.util";

const zodBodyRegister = z.object({
  email: z
    .string()
    .min(1, {
      message: t("class_validator.is_not_empty"),
    })
    .email({
      message: t("class_validator.is_email"),
    })
    .max(255),
  password: z
    .string()
    .min(1, {
      message: t("class_validator.is_not_empty"),
    })
    .min(8, {
      message: t("class_validator.password_too_short"),
    }),
});

export type BodyRegisterType = z.infer<typeof zodBodyRegister>;

export function verifyInput_Register(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const verifyZod = zodBodyRegister.safeParse(req.body);
  const translatedErrors = translateZodError(req, verifyZod.error);

  if (!verifyZod.success) {
    return responses.res400(req, res, null, translatedErrors);
  }

  // const { password } = req.body as BodyRegisterType;

  // if (!passwordValidator(password)) {
  //   return responses.res400(
  //     req,
  //     res,
  //     null,
  //     "Password did not meet the security requirement"
  //   );
  // }

  next();
}
