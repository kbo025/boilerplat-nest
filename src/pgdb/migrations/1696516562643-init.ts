import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1696516562643 implements MigrationInterface {
  name = 'Init1696516562643';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "active" boolean NOT NULL DEFAULT true, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "email" character varying NOT NULL, "hashPassword" character varying(255) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rbac-roles-permissions" ("id" SERIAL NOT NULL, "active" boolean NOT NULL DEFAULT true, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "type" integer NOT NULL, "name" character varying(128) NOT NULL, "description" character varying(256) NOT NULL, "slug" character varying(256) NOT NULL, CONSTRAINT "UQ_2db11e7b1e3cf890446d417bf80" UNIQUE ("slug"), CONSTRAINT "PK_a5df501ed96834654289a220ea3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rbac-assigments" ("id" SERIAL NOT NULL, "active" boolean NOT NULL DEFAULT true, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "rbac_id" integer, "user_id" integer, CONSTRAINT "PK_c69d288c6a48a57ce4daafa44e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rbac-links" ("id" SERIAL NOT NULL, "active" boolean NOT NULL DEFAULT true, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "parent_id" integer, "child_id" integer, CONSTRAINT "PK_ae10c7915063d515b0f3e2bb4a0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "active" boolean NOT NULL DEFAULT true, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying(128) NOT NULL, "description" character varying(256), "slug" character varying(256) NOT NULL, "order" integer, "parent_id" integer, CONSTRAINT "UQ_420d9f679d41281f282f5bc7d09" UNIQUE ("slug"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "rbac-assigments" ADD CONSTRAINT "FK_61835eb2c85acac0b5f20c6213d" FOREIGN KEY ("rbac_id") REFERENCES "rbac-roles-permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rbac-assigments" ADD CONSTRAINT "FK_6f802c5e7ea1aafab8a55aee2e3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rbac-links" ADD CONSTRAINT "FK_c77783adbd2e8ecc9cd02732fb4" FOREIGN KEY ("parent_id") REFERENCES "rbac-roles-permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rbac-links" ADD CONSTRAINT "FK_36d04a84ac9884748e8b8eee830" FOREIGN KEY ("child_id") REFERENCES "rbac-roles-permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_88cea2dc9c31951d06437879b40" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "FK_88cea2dc9c31951d06437879b40"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rbac-links" DROP CONSTRAINT "FK_36d04a84ac9884748e8b8eee830"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rbac-links" DROP CONSTRAINT "FK_c77783adbd2e8ecc9cd02732fb4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rbac-assigments" DROP CONSTRAINT "FK_6f802c5e7ea1aafab8a55aee2e3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rbac-assigments" DROP CONSTRAINT "FK_61835eb2c85acac0b5f20c6213d"`,
    );
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "rbac-links"`);
    await queryRunner.query(`DROP TABLE "rbac-assigments"`);
    await queryRunner.query(`DROP TABLE "rbac-roles-permissions"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
