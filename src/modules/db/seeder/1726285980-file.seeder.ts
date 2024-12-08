import { Seeder } from "@jorgebodega/typeorm-seeding";
import * as path from "path";
import { SeederEntity } from "../entities/seeder.entity";
import { DataSource } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { csvExtractor, hashPassword } from "../../../utils";

type CsvType = {
  id: string;
  path: string;
  source: string;
  original_name: string;
};

export default class FileSeeder extends Seeder {
  name = "file";
  date = 1726285988;

  async run(dataSource: DataSource) {
    const seederRepo = dataSource
      .createEntityManager()
      .getRepository(SeederEntity);

    const latestSeed = await seederRepo.findOne({
      where: {
        name: this.name,
      },
    });

    if (latestSeed?.date >= this.date) {
      return;
    }

    try {
      const filePath = path.join(process.cwd(), "assets/file.csv");

      const extractedCsv: CsvType[] = await csvExtractor(filePath, {
        separator: ",",
      });

      const values = [];
      const placeholders = extractedCsv
        .map((file, index) => {
          const startIndex = index * 4;
          values.push(file.id, file.path, file.source, file.original_name);
          return `
          ($${startIndex + 1}, $${startIndex + 2}, $${startIndex + 3}, $${
            startIndex + 4
          })`;
        })
        .join(", ");

      await dataSource.manager.transaction(async (t) => {
        const query = ` INSERT INTO "file" (id, path, source, original_name) VALUES ${placeholders} `;
        await t.query(query, values);
      });

      await seederRepo.save({
        name: this.name,
        date: this.date,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
