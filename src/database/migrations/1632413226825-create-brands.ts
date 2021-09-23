import { MigrationInterface, QueryRunner } from 'typeorm';

export class createBrands1632413226825 implements MigrationInterface {
  name = 'createBrands1632413226825';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "brand" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "image" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_5f468ae5696f07da025138e38f7" UNIQUE ("name"), CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD "brandId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."product" DROP CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" DROP COLUMN "brandId"`,
    );
    await queryRunner.query(`DROP TABLE "brand"`);
  }
}
