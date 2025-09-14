import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1757817766867 implements MigrationInterface {
  name = 'Migracion1757817766867';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_8dec203fd09650e9d169ed2ccdb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" RENAME COLUMN "id_user " TO "id_user"`,
    );
    await queryRunner.query(`ALTER TABLE "comment" ADD "id_user" integer`);
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_f969065fcb87bdab543220746bb" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_04eef282a6be5bed4e771c0df51" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_04eef282a6be5bed4e771c0df51"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_f969065fcb87bdab543220746bb"`,
    );
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "id_user"`);
    await queryRunner.query(
      `ALTER TABLE "post" RENAME COLUMN "id_user" TO "id_user "`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_8dec203fd09650e9d169ed2ccdb" FOREIGN KEY ("id_user ") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
