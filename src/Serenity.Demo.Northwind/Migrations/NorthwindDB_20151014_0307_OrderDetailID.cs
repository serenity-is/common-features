using FluentMigrator;
using Serenity.Extensions;

namespace Serenity.Demo.Northwind.Migrations;

[NorthwindDB, MigrationKey(20151014_0307)]
public class NorthwindDB_20151014_0307_OrderDetailID : AutoReversingMigration
{
    public override void Up()
    {
        IfDatabase("SqlServer", "SqlServer2000", "SqlServerCe", "Postgres")
            .Alter.Table("Order Details")
                .AddColumn("DetailID").AsInt32().Identity().NotNullable();

        IfDatabase("oracle")
            .Alter.Table("\"ORDER DETAILS\"")
                .AddColumn("DetailID").AsInt32().Nullable();

        MigrationUtils.AddOracleIdentity(this, "\"ORDER DETAILS\"", "DetailID");

        IfDatabase("Oracle")
            .Execute.Sql("UPDATE \"ORDER DETAILS\" SET DetailID = Order_Details_SEQ.nextval");

        IfDatabase("Oracle")
            .Alter.Column("DetailID").OnTable("\"ORDER DETAILS\"")
                .AsInt32().NotNullable();
    }
}