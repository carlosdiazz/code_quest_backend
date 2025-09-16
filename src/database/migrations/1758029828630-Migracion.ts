import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1758029828630 implements MigrationInterface {
  name = 'Migracion1758029828630';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "like_comment" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id_user" integer, "id_post" integer, CONSTRAINT "PK_307553e232b4620fde327c59eb5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD "likesCount" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_comment" ADD CONSTRAINT "FK_ebea3280c2fb2fc5c4debb5bce3" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_comment" ADD CONSTRAINT "FK_eb2d69839bb2a6e70a6cdd2302f" FOREIGN KEY ("id_post") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "like_comment" DROP CONSTRAINT "FK_eb2d69839bb2a6e70a6cdd2302f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_comment" DROP CONSTRAINT "FK_ebea3280c2fb2fc5c4debb5bce3"`,
    );
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "likesCount"`);
    await queryRunner.query(`DROP TABLE "like_comment"`);
  }
}
