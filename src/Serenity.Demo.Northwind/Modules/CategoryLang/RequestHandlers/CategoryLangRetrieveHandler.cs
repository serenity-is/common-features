using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<Serenity.Demo.Northwind.CategoryLangRow>;
using MyRow = Serenity.Demo.Northwind.CategoryLangRow;

namespace Serenity.Demo.Northwind;

public interface ICategoryLangRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class CategoryLangRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, ICategoryLangRetrieveHandler
{
    public CategoryLangRetrieveHandler(IRequestContext context)
         : base(context)
    {
    }
}