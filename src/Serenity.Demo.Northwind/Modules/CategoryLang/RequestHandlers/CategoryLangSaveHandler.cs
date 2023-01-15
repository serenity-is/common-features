using MyRequest = Serenity.Services.SaveRequest<Serenity.Demo.Northwind.CategoryLangRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = Serenity.Demo.Northwind.CategoryLangRow;

namespace Serenity.Demo.Northwind
{
    public interface ICategoryLangSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

    public class CategoryLangSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, ICategoryLangSaveHandler
    {
        public CategoryLangSaveHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}