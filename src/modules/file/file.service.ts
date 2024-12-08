import { EntityManager } from "typeorm";
import { v4 as uuidv4 } from "uuid";

export type FileEntityType = {
  id: string;
  path: string;
  source: string;
  original_name: string;
};

type CreateFileInput = {
  path: string;
  source: "localhost" | "cloudinary";
  original_name: string;
};

export async function createFile(
  { original_name, path, source }: CreateFileInput,
  t: EntityManager
) {
  const uuid = uuidv4();

  await t.query(
    `INSERT INTO "file" (id, path, source, original_name) VALUES ($1, $2, $3, $4)`,
    [uuid, path, source, original_name]
  );

  return {
    id: uuid,
    path,
    source,
    original_name,
  };
}
