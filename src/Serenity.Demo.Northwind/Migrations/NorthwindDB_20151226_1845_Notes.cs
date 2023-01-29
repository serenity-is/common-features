using FluentMigrator;
using FluentMigrator.Builders.Create.Table;
using Serenity.Extensions;

namespace Serenity.Demo.Northwind.Migrations;

[Migration(20151226_1845)]
public class NorthwindDB_20151226_1845_Notes : AutoReversingMigration
{
    public override void Up()
    {
        static void addCols(ICreateTableWithColumnSyntax expr) => expr
            .WithColumn("EntityType").AsString(100).NotNullable()
            .WithColumn("EntityID").AsInt64().NotNullable()
            .WithColumn("Text").AsString(int.MaxValue).NotNullable()
            .WithColumn("InsertUserId").AsInt32().NotNullable()
            .WithColumn("InsertDate").AsDateTime().NotNullable();

        addCols(IfDatabase(MigrationUtils.AllExceptOracle)
            .Create.Table("Notes")
                .WithColumn("NoteID").AsInt64().PrimaryKey().Identity().NotNullable());

        addCols(IfDatabase("Oracle")
            .Create.Table("Notes")
                .WithColumn("NoteID").AsInt64().PrimaryKey().NotNullable());

        MigrationUtils.AddOracleIdentity(this, "Notes", "NoteID");
    }
}