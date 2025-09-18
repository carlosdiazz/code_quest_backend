import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1758210935279 implements MigrationInterface {
  name = 'Migracion1758210935279';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "post_view" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_89a020aa096a078dc6f602ffe20" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "post_view"`);
  }
}
