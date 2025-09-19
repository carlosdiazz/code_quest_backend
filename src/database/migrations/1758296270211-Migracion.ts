import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1758296270211 implements MigrationInterface {
  name = 'Migracion1758296270211';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" ADD "id_image" integer`);
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "UQ_badc7805a6e452200ea4090f3c0" UNIQUE ("id_image")`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_badc7805a6e452200ea4090f3c0" FOREIGN KEY ("id_image") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_badc7805a6e452200ea4090f3c0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "UQ_badc7805a6e452200ea4090f3c0"`,
    );
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "id_image"`);
  }
}
