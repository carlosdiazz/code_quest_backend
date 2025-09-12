import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1757699658894 implements MigrationInterface {
  name = 'Migracion1757699658894';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "comment" ADD "id_post" integer`);
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_1c90a15431e04e19b6ac3045bc1" FOREIGN KEY ("id_post") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_1c90a15431e04e19b6ac3045bc1"`,
    );
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "id_post"`);
  }
}
