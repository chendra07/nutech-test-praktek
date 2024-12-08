import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";
import { envi } from "../../utils";

export type UploadFileInput = {
  fileBuffer: Buffer;
  savePath: string;
  fileName: string;
};

cloudinary.config({
  cloud_name: envi.CLD_NAME,
  api_key: envi.CLD_API_KEY,
  api_secret: envi.CLD_API_SECRET,
});

export async function cloudinary_uploadFile({
  fileBuffer,
  fileName,
  savePath,
}: UploadFileInput) {
  return (await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          public_id: fileName,
          folder: savePath,
          use_filename: true,
          unique_filename: false,
          overwrite: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      )
      .end(fileBuffer);
  })) as UploadApiResponse | UploadApiErrorResponse;
}

export async function cloudinary_deleteFileByIds(ids: string[]) {
  return await new Promise((resolve, reject) => {
    cloudinary.api.delete_resources(ids, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}
