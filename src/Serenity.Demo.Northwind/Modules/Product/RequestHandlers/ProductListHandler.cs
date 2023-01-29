using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<Serenity.Demo.Northwind.ProductRow>;
using MyRow = Serenity.Demo.Northwind.ProductRow;

namespace Serenity.Demo.Northwind;

public interface IProductListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class ProductListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IProductListHandler
{
    public ProductListHandler(IRequestContext context)
         : base(context)
    {
    }
}