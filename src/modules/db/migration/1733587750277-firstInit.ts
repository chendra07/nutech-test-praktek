import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstInit1733587750277 implements MigrationInterface {
    name = 'FirstInit1733587750277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "seeder" ("name" character varying(255) NOT NULL, "date" integer NOT NULL, CONSTRAINT "PK_78dcc3aa52c7a7b7af6960940ae" PRIMARY KEY ("name"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "seeder"`);
    }

}
