using FluentMigrator;
using Serenity.Data;
using Serenity.Demo.Northwind.Entities;
using System;

namespace Serenity.Demo.Northwind.Migrations
{
    [Migration(20161126_1417)]
    public class NorthwindDB_20161126_1417_ForwardDates : Migration
    {
        public override void Up()
        {
            var o = OrderRow.Fields;

            IfDatabase("SqlServer", "SqlServer2000", "SqlServerCe")
                .Execute.Sql(
                    new SqlUpdate(o.TableName)
                        .SetTo(o.OrderDate, "DATEADD(MONTH, 6, DATEADD(YEAR, 18, " + o.OrderDate.Name + "))")
                        .SetTo(o.RequiredDate, "DATEADD(MONTH, 6, DATEADD(YEAR, 18, " + o.RequiredDate.Name + "))")
                        .SetTo(o.ShippedDate, "DATEADD(MONTH, 6, DATEADD(YEAR, 18, " + o.ShippedDate.Name + "))")
                        .Where(o.OrderDate <= new DateTime(1999, 7, 1))
                        .DebugText);
        }

        public override void Down()
        {
        }
    }
}