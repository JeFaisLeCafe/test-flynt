import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from "typeorm";

export class ingredientsAddTags1691491602032 implements MigrationInterface {
  name = "ingredientsAddTags1691491602032";
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the Tag table
    await queryRunner.query(
      `CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`
    );

    // Populate the Tag table with the specified tags
    await queryRunner.query(
      `INSERT INTO tag (name) VALUES ('légume'), ('protéine'), ('féculent')`
    );

    // Add the tagId column to the Ingredient table
    await queryRunner.addColumn(
      "ingredient",
      new TableColumn({
        name: "tagId",
        type: "int",
        isNullable: false
      })
    );

    // Create a foreign key constraint
    await queryRunner.createForeignKey(
      "ingredient",
      new TableForeignKey({
        columnNames: ["tagId"],
        referencedColumnNames: ["id"],
        referencedTableName: "tag",
        onDelete: "CASCADE"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the Tag table
    await queryRunner.dropTable("tag");

    // Get the foreign key from the Ingredient table
    const table = await queryRunner.getTable("ingredient");
    if (!table) return;
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("tagId") !== -1
    );

    // Drop the foreign key constraint
    if (!foreignKey) return;
    await queryRunner.dropForeignKey("ingredient", foreignKey);

    // Drop the tagId column from the Ingredient table
    await queryRunner.dropColumn("ingredient", "tagId");
  }
}
