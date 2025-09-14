import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1757818286000 implements MigrationInterface {
  name = 'Migracion1757818286000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "like" ADD "id_user" integer`);
    await queryRunner.query(`ALTER TABLE "like" ADD "id_post" integer`);
    await queryRunner.query(
      `ALTER TABLE "like" ADD CONSTRAINT "FK_24f01acb8ace79805b94edcdd68" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" ADD CONSTRAINT "FK_ab65a75739e2b93fbfbd0c8106f" FOREIGN KEY ("id_post") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "like" DROP CONSTRAINT "FK_ab65a75739e2b93fbfbd0c8106f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" DROP CONSTRAINT "FK_24f01acb8ace79805b94edcdd68"`,
    );
    await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "id_post"`);
    await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "id_user"`);
  }
}
