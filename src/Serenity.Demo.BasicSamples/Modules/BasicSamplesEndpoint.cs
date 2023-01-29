using Microsoft.AspNetCore.Mvc;
using Serenity.Demo.Northwind;
using System.Data;

namespace Serenity.Demo.BasicSamples.Endpoints;

[ServiceAuthorize, Route("Services/Serenity.Demo.BasicSamples/[action]")]
[ConnectionKey(typeof(OrderRow))]
public class BasicSamplesController : ServiceEndpoint
{
#pragma warning disable IDE0060 // Remove unused parameter
    public OrdersByShipperResponse OrdersByShipper(IDbConnection connection, OrdersByShipperRequest request)
#pragma warning restore IDE0060 // Remove unused parameter
    {
        var fld = OrderRow.Fields;
        var year = DateTime.Today.Year;
        var startOfMonth = new DateTime(2016, 10, 1);
        var startingFrom = startOfMonth.AddMonths(-11);

        var response = new OrdersByShipperResponse();
        var shippers = connection.List<ShipperRow>(q => q.SelectTableFields().OrderBy(ShipperRow.Fields.CompanyName));
        response.ShipperKeys = shippers.Select(x => "s" + x.ShipperID.Value).ToList();
        response.ShipperLabels = shippers.Select(x => x.CompanyName).ToList();

        var monthExpr = "DATEPART(MONTH, " + fld.OrderDate.Expression + ")";

        var byMonth = connection.Query(
            new SqlQuery()
                .From(fld)
                .Select(monthExpr, "Month")
                .Select(Sql.Count(), "Count")
                .Select(fld.ShipVia, "ShipVia")
                .GroupBy(monthExpr)
                .GroupBy(fld.ShipVia)
                .Where(
                    fld.OrderDate.IsNotNull() &
                    fld.ShipVia.IsNotNull() &
                    fld.OrderDate < startOfMonth.AddMonths(1) &
                    fld.OrderDate >= startingFrom))
                .ToDictionary(x => new Tuple<int, int>((int)x.Month, (int)x.ShipVia), x => (int)x.Count);

        response.Values = new List<Dictionary<string, object>>();
        var month = startingFrom.Month;
        for (var i = 0; i < 12; i++)
        {
            var d = new Dictionary<string, object>
            {
                ["Month"] = new DateTime(1999, month, 1)
                .ToString("MMM", CultureInfo.CurrentCulture)
            };

            foreach (var p in shippers)
                d["s" + p.ShipperID] = byMonth.TryGetValue(
                    new Tuple<int, int>(month, p.ShipperID.Value), out int mc) ? mc : 0;

            response.Values.Add(d);

            if (++month > 12)
                month = 1;
        }

        return response;
    }
}
