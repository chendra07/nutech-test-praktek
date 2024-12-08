import { Seeder } from "@jorgebodega/typeorm-seeding";
import * as path from "path";
import { SeederEntity } from "../entities/seeder.entity";
import { DataSource } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { csvExtractor, hashPassword } from "../../../utils";

type CsvType = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  amount: number;
};

export default class UserSeeder extends Seeder {
  name = "user";
  date = 1726282490;

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
      const filePath = path.join(process.cwd(), "assets/user.csv");

      const extractedCsv: CsvType[] = await csvExtractor(filePath, {
        separator: ",",
      });

      const values = [];
      const placeholders = extractedCsv
        .map((user, index) => {
          const startIndex = index * 7;
          values.push(
            user.id,
            user.email,
            hashPassword(user.password),
            user.first_name,
            user.last_name,
            user.amount,
            null
          );
          return `($${startIndex + 1}, $${startIndex + 2}, $${
            startIndex + 3
          }, $${startIndex + 4}, $${startIndex + 5}, $${startIndex + 6}, $${
            startIndex + 7
          })`;
        })
        .join(", ");

      await dataSource.manager.transaction(async (t) => {
        const query = ` INSERT INTO "user" (id, email, password, first_name, last_name, amount, file_id) VALUES ${placeholders} `;
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
