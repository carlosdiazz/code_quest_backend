import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1757965416341 implements MigrationInterface {
  name = 'Migracion1757965416341';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "like" DROP CONSTRAINT "FK_ab65a75739e2b93fbfbd0c8106f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_1c90a15431e04e19b6ac3045bc1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_9d6fb888ff336e42a58487634a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_f969065fcb87bdab543220746bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" ADD CONSTRAINT "FK_ab65a75739e2b93fbfbd0c8106f" FOREIGN KEY ("id_post") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_1c90a15431e04e19b6ac3045bc1" FOREIGN KEY ("id_post") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_9d6fb888ff336e42a58487634a6" FOREIGN KEY ("id_category") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_f969065fcb87bdab543220746bb" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_1c90a15431e04e19b6ac3045bc1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" DROP CONSTRAINT "FK_ab65a75739e2b93fbfbd0c8106f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_f969065fcb87bdab543220746bb" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_9d6fb888ff336e42a58487634a6" FOREIGN KEY ("id_category") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_1c90a15431e04e19b6ac3045bc1" FOREIGN KEY ("id_post") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" ADD CONSTRAINT "FK_ab65a75739e2b93fbfbd0c8106f" FOREIGN KEY ("id_post") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
