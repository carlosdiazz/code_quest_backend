import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1757695585787 implements MigrationInterface {
  name = 'Migracion1757695585787';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" ADD "id_category" integer`);
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_9d6fb888ff336e42a58487634a6" FOREIGN KEY ("id_category") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_9d6fb888ff336e42a58487634a6"`,
    );
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "id_category"`);
  }
}
