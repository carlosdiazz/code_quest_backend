import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1758039662340 implements MigrationInterface {
  name = 'Migracion1758039662340';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "like_sub_comment" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id_user" integer, "id_sub_comment" integer, CONSTRAINT "PK_203a51fdae504e103369d90b798" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_sub_comment" ADD CONSTRAINT "FK_2120ea6dd7e3fe87a8b7258d76d" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_sub_comment" ADD CONSTRAINT "FK_248527de5d6328c47e45a85642a" FOREIGN KEY ("id_sub_comment") REFERENCES "sub_comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "like_sub_comment" DROP CONSTRAINT "FK_248527de5d6328c47e45a85642a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_sub_comment" DROP CONSTRAINT "FK_2120ea6dd7e3fe87a8b7258d76d"`,
    );
    await queryRunner.query(`DROP TABLE "like_sub_comment"`);
  }
}
