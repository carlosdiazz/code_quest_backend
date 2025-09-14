import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1757817308843 implements MigrationInterface {
  name = 'Migracion1757817308843';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" ADD "id_user " integer`);
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_8dec203fd09650e9d169ed2ccdb" FOREIGN KEY ("id_user ") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_8dec203fd09650e9d169ed2ccdb"`,
    );
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "id_user "`);
  }
}
