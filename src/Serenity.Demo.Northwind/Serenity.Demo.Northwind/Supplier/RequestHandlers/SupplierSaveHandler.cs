using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<Serenity.Demo.Northwind.SupplierRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = Serenity.Demo.Northwind.SupplierRow;

namespace Serenity.Demo.Northwind
{
    public interface ISupplierSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

    public class SupplierSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, ISupplierSaveHandler
    {
        public SupplierSaveHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}