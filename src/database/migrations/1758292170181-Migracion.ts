import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1758292170181 implements MigrationInterface {
  name = 'Migracion1758292170181';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "about" character varying`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "twitter_url" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "instagram_url" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "instagram_url"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "twitter_url"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "about"`);
  }
}
