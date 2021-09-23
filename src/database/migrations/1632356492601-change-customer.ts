import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeCustomer1632356492601 implements MigrationInterface {
  name = 'changeCustomer1632356492601';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."customer" RENAME COLUMN "lastName" TO "last_name"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."customer" RENAME COLUMN "last_name" TO "lastName"`,
    );
  }
}
