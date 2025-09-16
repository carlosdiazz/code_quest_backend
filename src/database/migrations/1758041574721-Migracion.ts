import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1758041574721 implements MigrationInterface {
  name = 'Migracion1758041574721';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "like_post" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id_user" integer, "id_post" integer, CONSTRAINT "PK_d41caa70371e578e2a4791a88ae" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_post" ADD CONSTRAINT "FK_6eeb1916c4b0b6e19989a1a6d9f" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_post" ADD CONSTRAINT "FK_c94f364f8e5fdff6899e6ff0245" FOREIGN KEY ("id_post") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "like_post" DROP CONSTRAINT "FK_c94f364f8e5fdff6899e6ff0245"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_post" DROP CONSTRAINT "FK_6eeb1916c4b0b6e19989a1a6d9f"`,
    );
    await queryRunner.query(`DROP TABLE "like_post"`);
  }
}
