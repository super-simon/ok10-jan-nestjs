import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserEntity1724170613161 implements MigrationInterface {
  name = 'UpdateUserEntity1724170613161';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "isVerified" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isVerified"`);
  }
}
