using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = Serenity.Demo.Northwind.ProductRow;

namespace Serenity.Demo.Northwind;

public interface IProductDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class ProductDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IProductDeleteHandler
{
    public ProductDeleteHandler(IRequestContext context)
         : base(context)
    {
    }
}