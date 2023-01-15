using MyRequest = Serenity.Services.SaveRequest<Serenity.Demo.Northwind.CategoryRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = Serenity.Demo.Northwind.CategoryRow;

namespace Serenity.Demo.Northwind
{
    public interface ICategorySaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

    public class CategorySaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, ICategorySaveHandler
    {
        public CategorySaveHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}