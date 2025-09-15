import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1757965029722 implements MigrationInterface {
  name = 'Migracion1757965029722';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_9d6fb888ff336e42a58487634a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_f969065fcb87bdab543220746bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_9d6fb888ff336e42a58487634a6" FOREIGN KEY ("id_category") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_f969065fcb87bdab543220746bb" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_f969065fcb87bdab543220746bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_9d6fb888ff336e42a58487634a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_f969065fcb87bdab543220746bb" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_9d6fb888ff336e42a58487634a6" FOREIGN KEY ("id_category") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
