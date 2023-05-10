using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = Serenity.Demo.Northwind.ProductLangRow;

namespace Serenity.Demo.Northwind;

public interface IProductLangDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class ProductLangDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IProductLangDeleteHandler
{
    public ProductLangDeleteHandler(IRequestContext context)
         : base(context)
    {
    }
}