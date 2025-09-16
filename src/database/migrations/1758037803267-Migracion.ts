import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1758037803267 implements MigrationInterface {
  name = 'Migracion1758037803267';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "likesCount"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" ADD "likesCount" integer NOT NULL DEFAULT '0'`,
    );
  }
}
