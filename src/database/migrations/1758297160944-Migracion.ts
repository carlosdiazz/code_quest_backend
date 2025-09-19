import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1758297160944 implements MigrationInterface {
  name = 'Migracion1758297160944';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "coverImage"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" ADD "coverImage" character varying NOT NULL DEFAULT ''`,
    );
  }
}
