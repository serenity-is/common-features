using FluentMigrator;
using FluentMigrator.Builders.Create.Table;

namespace Serenity.Demo.Northwind.Migrations;

[NorthwindDB, MigrationKey(20161118_1954)]
public class NorthwindDB_20161118_1954_DragDropSample : AutoReversingMigration
{
    public override void Up()
    {
        static void addColumns(ICreateTableWithColumnSyntax expr) => expr
            .WithColumn("ParentId").AsInt32().Nullable()
            .WithColumn("Title").AsString(100).NotNullable();

        addColumns(IfDatabase(MigrationUtils.AllExceptOracle)
            .Create.Table("DragDropSample")
            .WithColumn("Id").AsInt32().Identity().PrimaryKey().NotNullable());

        addColumns(IfDatabase("Oracle")
            .Create.Table("DragDropSample")
            .WithColumn("Id").AsInt32().PrimaryKey().NotNullable());

        MigrationUtils.AddOracleIdentity(this, "DragDropSample", "Id");
    }
}