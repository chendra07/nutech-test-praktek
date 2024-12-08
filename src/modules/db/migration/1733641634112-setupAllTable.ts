import { MigrationInterface, QueryRunner } from "typeorm";

export class SetupAllTable1733641634112 implements MigrationInterface {
  name = "SetupAllTable1733641634112";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "banner" (
        "id" uuid NOT NULL, 
        "banner_name" character varying(255) NOT NULL, 
        "description" character varying(255) NOT NULL, 
        "file_id" uuid NOT NULL, 
        "created_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "deleted_on" TIMESTAMP WITH TIME ZONE, 
        CONSTRAINT "REL_BANNER_FILE_FILEID" UNIQUE ("file_id"), 
        CONSTRAINT "PK_BANNER_ID" PRIMARY KEY ("id")
    )
`
    );
    await queryRunner.query(
      `CREATE TABLE "transaction" (
        "id" uuid NOT NULL, 
        "description" character varying(255) NOT NULL, 
        "user_id" uuid NOT NULL, 
        "service_code_id" character varying NOT NULL,
        "created_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "deleted_on" TIMESTAMP WITH TIME ZONE, 
        CONSTRAINT "PK_TRX_ID" PRIMARY KEY ("id")
    )
`
    );
    await queryRunner.query(
      `CREATE TABLE "ppob_service" (
        "service_code" character varying(30) NOT NULL, 
        "service_name" character varying NOT NULL, 
        "service_tariff" character varying NOT NULL, 
        "file_id" uuid NOT NULL, 
        "created_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "deleted_on" TIMESTAMP WITH TIME ZONE, 
        CONSTRAINT "REL_PPOBSERV_FILE_FILEID" UNIQUE ("file_id"), 
        CONSTRAINT "PK_PPOBSERV_SERVCODE" PRIMARY KEY ("service_code")
    )
`
    );
    await queryRunner.query(
      `CREATE TABLE "file" (
        "id" uuid NOT NULL, 
        "path" character varying(500) NOT NULL, 
        "source" character varying(20) NOT NULL, 
        "original_name" character varying(50) NOT NULL, 
        "created_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "deleted_on" TIMESTAMP WITH TIME ZONE,
        CONSTRAINT "PK_FILE_ID" PRIMARY KEY ("id")
    )
`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ( 
        "id" uuid NOT NULL, 
        "email" character varying(255) NOT NULL, 
        "password" character varying(255) NOT NULL, 
        "first_name" character varying(255) NOT NULL, 
        "last_name" character varying(255) NOT NULL, 
        "amount" integer NOT NULL DEFAULT '0', 
        "file_id" uuid, 
        "created_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "deleted_on" TIMESTAMP WITH TIME ZONE,
        CONSTRAINT "UQ_USER_EMAIL" UNIQUE ("email"), 
        CONSTRAINT "REL_USER_FILE_FILEID" UNIQUE ("file_id"), 
        CONSTRAINT "PK_USER_ID" PRIMARY KEY ("id")
    )
`
    );
    await queryRunner.query(
      ` ALTER TABLE 
            "banner" 
        ADD 
            CONSTRAINT "FK_BANNER_FILE_FILEID" FOREIGN KEY ("file_id") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      ` ALTER TABLE 
            "transaction" 
        ADD 
            CONSTRAINT "FK_TRX_USER_USERID" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      ` ALTER TABLE 
            "transaction" 
        ADD 
            CONSTRAINT "FK_TRX_PPOBSERV_SERVCODE" FOREIGN KEY ("service_code_id") REFERENCES "ppob_service"("service_code") ON DELETE RESTRICT ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      ` ALTER TABLE 
            "ppob_service" 
        ADD 
            CONSTRAINT "FK_PPOBSERV_FILE_FILEID" FOREIGN KEY ("file_id") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      ` ALTER TABLE 
            "user" 
        ADD 
            CONSTRAINT "FK_USER_FILE_FILEID" FOREIGN KEY ("file_id") REFERENCES "file"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_USER_FILE_FILEID"`
    );
    await queryRunner.query(
      `ALTER TABLE "ppob_service" DROP CONSTRAINT "FK_PPOBSERV_FILE_FILEID"`
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_TRX_PPOBSERV_SERVCODE"`
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_TRX_USER_USERID"`
    );
    await queryRunner.query(
      `ALTER TABLE "banner" DROP CONSTRAINT "FK_BANNER_FILE_FILEID"`
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "ppob_service"`);
    await queryRunner.query(`DROP TABLE "transaction"`);
    await queryRunner.query(`DROP TABLE "banner"`);
  }
}
