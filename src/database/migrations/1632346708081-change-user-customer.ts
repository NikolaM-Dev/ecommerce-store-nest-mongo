import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeUserCustomer1632346708081 implements MigrationInterface {
  name = 'changeUserCustomer1632346708081';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."product" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."customer" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }
}
