using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<Serenity.Demo.Northwind.ProductLangRow>;
using MyRow = Serenity.Demo.Northwind.ProductLangRow;

namespace Serenity.Demo.Northwind;

public interface IProductLangListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class ProductLangListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IProductLangListHandler
{
    public ProductLangListHandler(IRequestContext context)
         : base(context)
    {
    }
}