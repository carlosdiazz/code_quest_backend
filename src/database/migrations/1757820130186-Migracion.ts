import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1757820130186 implements MigrationInterface {
  name = 'Migracion1757820130186';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" ALTER COLUMN "likesCount" SET DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" ALTER COLUMN "likesCount" DROP DEFAULT`,
    );
  }
}
