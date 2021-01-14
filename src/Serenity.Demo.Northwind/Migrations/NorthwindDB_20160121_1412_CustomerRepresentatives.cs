using FluentMigrator;
using Serenity.Extensions;

namespace Serenity.Demo.Northwind.Migrations
{
    [Migration(20160121_1412)]
    public class NorthwindDB_20160121_1412_CustomerRepresentatives : AutoReversingMigration
    {
        public override void Up()
        {
            IfDatabase(MigrationUtils.AllExceptOracle)
                .Create.Table("CustomerRepresentatives")
                    .WithColumn("RepresentativeID").AsInt32().PrimaryKey().Identity().NotNullable()
                    .WithColumn("CustomerID").AsInt32().NotNullable()
                    .WithColumn("EmployeeID").AsInt32().NotNullable();

            IfDatabase("Oracle")
                .Create.Table("CustomerRepresentatives")
                    .WithColumn("RepresentativeID").AsInt32().PrimaryKey().NotNullable()
                    .WithColumn("CustomerID").AsInt32().NotNullable()
                    .WithColumn("EmployeeID").AsInt32().NotNullable();

            MigrationUtils.AddOracleIdentity(this, "CustomerRepresentatives", "RepresentativeID");
        }
    }
}