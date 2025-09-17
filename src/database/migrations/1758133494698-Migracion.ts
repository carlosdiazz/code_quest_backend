import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1758133494698 implements MigrationInterface {
  name = 'Migracion1758133494698';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bookmark_post" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id_user" integer, "id_post" integer, CONSTRAINT "PK_88d15be9a11888c73c7328a32fc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmark_post" ADD CONSTRAINT "FK_548583f25c9ace9ddac6f1bbd01" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmark_post" ADD CONSTRAINT "FK_adb92706f32feab3619bd7f141f" FOREIGN KEY ("id_post") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookmark_post" DROP CONSTRAINT "FK_adb92706f32feab3619bd7f141f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmark_post" DROP CONSTRAINT "FK_548583f25c9ace9ddac6f1bbd01"`,
    );
    await queryRunner.query(`DROP TABLE "bookmark_post"`);
  }
}
