using Serenity.Data;
using Serenity.Services;
using System.Data;
using Microsoft.AspNetCore.Mvc;
using MyRepository = Serenity.Demo.Northwind.Repositories.SalesByCategoryRepository;
using MyRow = Serenity.Demo.Northwind.Entities.SalesByCategoryRow;

namespace Serenity.Demo.Northwind.Endpoints
{
    [Route("Services/Serenity.Demo.Northwind/SalesByCategory/[action]")]
    [ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
    public class SalesByCategoryController : ServiceEndpoint
    {
        public ListResponse<MyRow> List(IDbConnection connection, ListRequest request)
        {
            return new MyRepository(Context).List(connection, request);
        }
    }
}
