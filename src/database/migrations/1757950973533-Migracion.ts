import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migracion1757950973533 implements MigrationInterface {
  name = 'Migracion1757950973533';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "comment" ADD "parent_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_8bd8d0985c0d077c8129fb4a209" FOREIGN KEY ("parent_id") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_8bd8d0985c0d077c8129fb4a209"`,
    );
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "parent_id"`);
  }
}
