import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1757694518109 implements MigrationInterface {
  name = 'Migracion1757694518109';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "post" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "content" character varying NOT NULL, "excerpt" character varying NOT NULL, "coverImage" character varying NOT NULL, "published" boolean NOT NULL, "featured" boolean NOT NULL, "likesCount" integer NOT NULL, "tags" character varying array NOT NULL DEFAULT '{}', "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_cd1bddce36edc3e766798eab376" UNIQUE ("slug"), CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "post"`);
  }
}
