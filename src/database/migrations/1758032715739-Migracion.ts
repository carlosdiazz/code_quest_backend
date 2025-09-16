import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1758032715739 implements MigrationInterface {
  name = 'Migracion1758032715739';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sub_comment" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "id_comment" integer, CONSTRAINT "PK_3f0ef18575c8e1f76ad76d7277d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_comment" ADD CONSTRAINT "FK_efc7c7b98cb05654b6b50d8162b" FOREIGN KEY ("id_comment") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sub_comment" DROP CONSTRAINT "FK_efc7c7b98cb05654b6b50d8162b"`,
    );
    await queryRunner.query(`DROP TABLE "sub_comment"`);
  }
}
