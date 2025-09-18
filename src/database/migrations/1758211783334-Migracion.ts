import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1758211783334 implements MigrationInterface {
  name = 'Migracion1758211783334';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post_view" ADD "id_user" integer`);
    await queryRunner.query(`ALTER TABLE "post_view" ADD "id_post" integer`);
    await queryRunner.query(
      `ALTER TABLE "post" ADD "total_view" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_view" ADD CONSTRAINT "FK_b8413402d63182dd16265a9771d" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_view" ADD CONSTRAINT "FK_9f73d142f9958ae597b69f48d8e" FOREIGN KEY ("id_post") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_view" DROP CONSTRAINT "FK_9f73d142f9958ae597b69f48d8e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_view" DROP CONSTRAINT "FK_b8413402d63182dd16265a9771d"`,
    );
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "total_view"`);
    await queryRunner.query(`ALTER TABLE "post_view" DROP COLUMN "id_post"`);
    await queryRunner.query(`ALTER TABLE "post_view" DROP COLUMN "id_user"`);
  }
}
