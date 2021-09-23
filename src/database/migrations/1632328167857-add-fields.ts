import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFields1632328167857 implements MigrationInterface {
  name = 'addFields1632328167857';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."product" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" DROP COLUMN "createdAt"`,
    );
  }
}
