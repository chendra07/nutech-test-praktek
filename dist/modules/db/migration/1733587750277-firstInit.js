"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirstInit1733587750277 = void 0;
class FirstInit1733587750277 {
    constructor() {
        this.name = "FirstInit1733587750277";
    }
    async up(queryRunner) {
        await queryRunner.query(`
        CREATE TABLE "seeder" (
            "name" character varying(255) NOT NULL, 
            "date" integer NOT NULL, 
            CONSTRAINT "PK_SEEDER_NAME" PRIMARY KEY ("name")
        )
`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "seeder"`);
    }
}
exports.FirstInit1733587750277 = FirstInit1733587750277;
