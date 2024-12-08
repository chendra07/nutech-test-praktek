import { dataSource } from "../db/datasource";

export type BannerEntityType = {
  id: string;
  banner_name: string;
  description: string;
  file_id: string;
  banner_image: string;
};

export async function findAllBanner() {
  const result = await dataSource.manager.query(
    `SELECT b.banner_name, b.description, f.path as banner_image FROM "banner" b left join "file" f on b.file_id = f.id`,
    []
  );

  return result as BannerEntityType[];
}
