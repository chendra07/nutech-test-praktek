import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { dateToUnix } from "../../utils";

export const multerStorageCfg = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(process.cwd(), "/temp");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, dateToUnix() + "#" + uuidv4() + path.extname(file.originalname));
  },
});
