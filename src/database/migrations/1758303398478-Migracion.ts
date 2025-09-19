import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1758303398478 implements MigrationInterface {
  name = 'Migracion1758303398478';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "image" ADD "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "create_at"`);
  }
}
