import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import * as dotenv from "dotenv";
import { envi } from "./environment.util";

dotenv.config();

export function hashPassword(password: string) {
  const salt = genSaltSync(envi.BCRYPT_SALT);
  const hash = hashSync(password, salt);
  return hash;
}

export function isPasswordMatch(password: string, hash: string) {
  return compareSync(password, hash);
}
