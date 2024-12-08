import { EntityManager } from "typeorm";
import { BodyRegisterType } from "../../router/v1/membership/validator/register.validator";
import { hashPassword } from "../../utils";
import { dataSource } from "../db/datasource";
import { v4 as uuidv4 } from "uuid";
import { FileEntityType } from "../file/file.service";

export type UserEntityType = {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  amount: number;
  file_id: string;
  profile_image?: string;
};

export async function findOneUserById(id: string) {
  const user = await dataSource.manager.query(
    `SELECT u.*, f.path as profile_image FROM "user" u left join "file" f on u.file_id = f.id WHERE u.id = $1`,
    [id]
  );

  return user[0] as UserEntityType;
}

export async function findOneUserByEmail(email: string) {
  const user = await dataSource.manager.query(
    `SELECT u.*, f.path as profile_image FROM "user" u left join "file" f on u.file_id = f.id WHERE u.email = $1`,
    [email]
  );

  return user[0] as UserEntityType;
}

export async function createUser(
  { email, first_name, last_name, password }: BodyRegisterType,
  t: EntityManager
) {
  const uuid = uuidv4();
  const hash = hashPassword(password);
  await t.query(
    `INSERT INTO "user" (id, email, password, first_name, last_name, amount, file_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [uuid, email, hash, first_name, last_name, 0, null]
  );

  return {
    id: uuid,
    email,
    password: hash,
    first_name,
    last_name,
    amount: 0,
    file_id: null,
  };
}

export async function updateUserById(
  input: {
    user: UserEntityType;
    file?: FileEntityType;
  },
  t: EntityManager
) {
  const { user, file } = input;
  await t.query(
    `UPDATE "user" SET "password" = $1, "first_name" = $2, "last_name" = $3, "amount" = $4, "file_id" = $5 WHERE id = $6`,
    [
      user.password,
      user.first_name,
      user.last_name,
      user.amount,
      file?.id || user?.file_id,
      user.id,
    ]
  );

  return { ...user, profile_image: file?.path } as UserEntityType;
}
