import { dataSource } from "../db/datasource";

export type PPOBServiceEntityType = {
  service_code: string;
  service_name: string;
  service_tariff: number;
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

export async function findOnePPOBServiceByServCode(serviceCode: string) {
  const result = await dataSource.manager.query(
    `SELECT * FROM "ppob_service" WHERE service_code = $1`,
    [serviceCode]
  );

  return result[0] as PPOBServiceEntityType;
}
