import { dataSource } from "../db/datasource";

export type PPOBServiceEntityType = {
  id: string;
  banner_name: string;
  description: string;
  file_id: string;
  banner_image: string;
};

export async function findAllPPOBService() {
  const result = await dataSource.manager.query(
    `SELECT p.service_code, p.service_name, p.service_tariff, f.path as banner_image FROM "ppob_service" p left join "file" f on p.file_id = f.id`,
    []
  );

  return result as PPOBServiceEntityType[];
}
