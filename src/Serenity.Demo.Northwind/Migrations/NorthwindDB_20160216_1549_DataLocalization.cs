using FluentMigrator;
using Serenity.Extensions;

namespace Serenity.Demo.Northwind.Migrations;

[Migration(20160216_1549)]
public class NorthwindDB_20160216_1549_DataLocalization : AutoReversingMigration
{
    public override void Up()
    {
        IfDatabase(MigrationUtils.AllExceptOracle)
            .Create.Table("CategoryLang")
                .WithColumn("ID").AsInt32().PrimaryKey().Identity().NotNullable()
                .WithColumn("CategoryID").AsInt32().NotNullable()
                .WithColumn("LanguageID").AsInt32().NotNullable()
                .WithColumn("CategoryName").AsString(15).Nullable()
                .WithColumn("Description").AsString(int.MaxValue).Nullable();

        IfDatabase("Oracle")
            .Create.Table("CategoryLang")
                .WithColumn("ID").AsInt32().PrimaryKey().NotNullable()
                .WithColumn("CategoryID").AsInt32().NotNullable()
                .WithColumn("LanguageID").AsInt32().NotNullable()
                .WithColumn("CategoryName").AsString(15).Nullable()
                .WithColumn("Description").AsString(int.MaxValue).Nullable();

        MigrationUtils.AddOracleIdentity(this, "CategoryLang", "ID");

        IfDatabase(MigrationUtils.AllExceptOracle)
            .Create.Table("ProductLang")
                .WithColumn("ID").AsInt32().PrimaryKey().Identity().NotNullable()
                .WithColumn("ProductID").AsInt32().NotNullable()
                .WithColumn("LanguageID").AsInt32().NotNullable()
                .WithColumn("ProductName").AsString(40).Nullable();

        IfDatabase("Oracle")
            .Create.Table("ProductLang")
                .WithColumn("ID").AsInt32().PrimaryKey().NotNullable()
                .WithColumn("ProductID").AsInt32().NotNullable()
                .WithColumn("LanguageID").AsInt32().NotNullable()
                .WithColumn("ProductName").AsString(40).Nullable();

        MigrationUtils.AddOracleIdentity(this, "ProductLang", "ID");
    }
}