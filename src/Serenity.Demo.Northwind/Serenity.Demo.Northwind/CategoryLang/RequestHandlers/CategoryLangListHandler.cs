using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<Serenity.Demo.Northwind.CategoryLangRow>;
using MyRow = Serenity.Demo.Northwind.CategoryLangRow;

namespace Serenity.Demo.Northwind
{
    public interface ICategoryLangListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

    public class CategoryLangListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, ICategoryLangListHandler
    {
        public CategoryLangListHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}