import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1758038233600 implements MigrationInterface {
  name = 'Migracion1758038233600';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "likesCount"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" ADD "likesCount" integer NOT NULL DEFAULT '0'`,
    );
  }
}
