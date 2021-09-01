using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<Serenity.Demo.Northwind.CategoryRow>;
using MyRow = Serenity.Demo.Northwind.CategoryRow;

namespace Serenity.Demo.Northwind
{
    public interface ICategoryRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

    public class CategoryRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, ICategoryRetrieveHandler
    {
        public CategoryRetrieveHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}