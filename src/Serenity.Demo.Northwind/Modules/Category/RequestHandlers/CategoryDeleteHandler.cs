using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = Serenity.Demo.Northwind.CategoryRow;

namespace Serenity.Demo.Northwind;

public interface ICategoryDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class CategoryDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, ICategoryDeleteHandler
{
    public CategoryDeleteHandler(IRequestContext context)
         : base(context)
    {
    }
}