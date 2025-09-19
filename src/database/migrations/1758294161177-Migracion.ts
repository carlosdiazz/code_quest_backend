import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1758294161177 implements MigrationInterface {
  name = 'Migracion1758294161177';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "image" ("id" SERIAL NOT NULL, "secure_url" character varying NOT NULL, "public_id" character varying NOT NULL, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "image"`);
  }
}
