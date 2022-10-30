using Microsoft.AspNetCore.Mvc;
using Serenity.Data;
using Serenity.Services;
using System.Data;
using MyRow = Serenity.Demo.Northwind.SalesByCategoryRow;

namespace Serenity.Demo.Northwind.Endpoints
{
    [Route("Services/Serenity.Demo.Northwind/SalesByCategory/[action]")]
    [ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
    public class SalesByCategoryController : ServiceEndpoint
    {
        public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
            [FromServices] ISalesByCategoryListHandler handler)
        {
            return handler.List(connection, request);
        }
    }
}
