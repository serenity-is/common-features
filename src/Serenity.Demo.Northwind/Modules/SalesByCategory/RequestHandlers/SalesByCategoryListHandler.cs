using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<Serenity.Demo.Northwind.SalesByCategoryRow>;
using MyRow = Serenity.Demo.Northwind.SalesByCategoryRow;

namespace Serenity.Demo.Northwind
{
    public interface ISalesByCategoryListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

    public class SalesByCategoryListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, ISalesByCategoryListHandler
    {
        public SalesByCategoryListHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}