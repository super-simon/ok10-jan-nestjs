import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueLike1726597356498 implements MigrationInterface {
  name = 'UniqueLike1726597356498';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tags" ADD CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "unique_like" UNIQUE ("user_id", "article_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "unique_like"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tags" DROP CONSTRAINT "UQ_d90243459a697eadb8ad56e9092"`,
    );
  }
}
