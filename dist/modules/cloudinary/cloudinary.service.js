"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary_uploadFile = cloudinary_uploadFile;
exports.cloudinary_deleteFileByIds = cloudinary_deleteFileByIds;
const cloudinary_1 = require("cloudinary");
const utils_1 = require("../../utils");
cloudinary_1.v2.config({
    cloud_name: utils_1.envi.CLD_NAME,
    api_key: utils_1.envi.CLD_API_KEY,
    api_secret: utils_1.envi.CLD_API_SECRET,
});
async function cloudinary_uploadFile({ fileBuffer, fileName, savePath, }) {
    return (await new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader
            .upload_stream({
            resource_type: "auto",
            public_id: fileName,
            folder: savePath,
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        })
            .end(fileBuffer);
    }));
}
async function cloudinary_deleteFileByIds(ids) {
    return await new Promise((resolve, reject) => {
        cloudinary_1.v2.api.delete_resources(ids, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
}
