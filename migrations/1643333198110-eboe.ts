import {MigrationInterface, QueryRunner} from "typeorm";

export class eboe1643333198110 implements MigrationInterface {
    name = 'eboe1643333198110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cat" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "breed" character varying, "color" character varying, "age" integer, "price" integer, "photo" character varying, "isReserved" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_7704d5c2c0250e4256935ae31b4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cat"`);
    }

}
