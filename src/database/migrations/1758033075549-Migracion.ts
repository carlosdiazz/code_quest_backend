import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1758033075549 implements MigrationInterface {
  name = 'Migracion1758033075549';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sub_comment" ADD "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_comment" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "sub_comment" ADD "id_user" integer`);
    await queryRunner.query(
      `ALTER TABLE "sub_comment" ADD CONSTRAINT "FK_3023f1f6908307ef36a251589c1" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sub_comment" DROP CONSTRAINT "FK_3023f1f6908307ef36a251589c1"`,
    );
    await queryRunner.query(`ALTER TABLE "sub_comment" DROP COLUMN "id_user"`);
    await queryRunner.query(
      `ALTER TABLE "sub_comment" DROP COLUMN "update_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_comment" DROP COLUMN "create_at"`,
    );
  }
}
