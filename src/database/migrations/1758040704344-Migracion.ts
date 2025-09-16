import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1758040704344 implements MigrationInterface {
  name = 'Migracion1758040704344';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "like_comment" DROP CONSTRAINT "FK_eb2d69839bb2a6e70a6cdd2302f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_comment" RENAME COLUMN "id_post" TO "id_comment"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_comment" ADD CONSTRAINT "FK_7fbbf36d79cb1336ad65b5f37c2" FOREIGN KEY ("id_comment") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "like_comment" DROP CONSTRAINT "FK_7fbbf36d79cb1336ad65b5f37c2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_comment" RENAME COLUMN "id_comment" TO "id_post"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_comment" ADD CONSTRAINT "FK_eb2d69839bb2a6e70a6cdd2302f" FOREIGN KEY ("id_post") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
