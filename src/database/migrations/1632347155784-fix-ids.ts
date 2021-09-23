import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixIds1632347155784 implements MigrationInterface {
  name = 'fixIds1632347155784';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "public"."product_id_seq" OWNED BY "public"."product"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ALTER COLUMN "id" SET DEFAULT nextval('"public"."product_id_seq"')`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "public"."user_id_seq" OWNED BY "public"."user"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" ALTER COLUMN "id" SET DEFAULT nextval('"public"."user_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" DROP CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce"`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "public"."customer_id_seq" OWNED BY "public"."customer"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" ALTER COLUMN "id" SET DEFAULT nextval('"public"."customer_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" ADD CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."user" DROP CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "public"."customer_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "public"."user" ADD CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "public"."user_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "public"."product" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "public"."product_id_seq"`);
  }
}
