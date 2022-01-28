import {MigrationInterface, QueryRunner} from "typeorm";

export class withPhotos1643339931654 implements MigrationInterface {
    name = 'withPhotos1643339931654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cat" RENAME COLUMN "photo" TO "photoKey"`);
        await queryRunner.query(`CREATE TABLE "public_file" ("key" character varying NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_78a97e7c63be55fe9285369cd50" PRIMARY KEY ("key"))`);
        await queryRunner.query(`ALTER TABLE "cat" ADD CONSTRAINT "UQ_bb11a4282fbdd7418b7ed57cdf5" UNIQUE ("photoKey")`);
        await queryRunner.query(`ALTER TABLE "cat" ADD CONSTRAINT "FK_bb11a4282fbdd7418b7ed57cdf5" FOREIGN KEY ("photoKey") REFERENCES "public_file"("key") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cat" DROP CONSTRAINT "FK_bb11a4282fbdd7418b7ed57cdf5"`);
        await queryRunner.query(`ALTER TABLE "cat" DROP CONSTRAINT "UQ_bb11a4282fbdd7418b7ed57cdf5"`);
        await queryRunner.query(`DROP TABLE "public_file"`);
        await queryRunner.query(`ALTER TABLE "cat" RENAME COLUMN "photoKey" TO "photo"`);
    }

}
