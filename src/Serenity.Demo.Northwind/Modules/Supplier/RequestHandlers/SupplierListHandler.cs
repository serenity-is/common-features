using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<Serenity.Demo.Northwind.SupplierRow>;
using MyRow = Serenity.Demo.Northwind.SupplierRow;

namespace Serenity.Demo.Northwind
{
    public interface ISupplierListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

    public class SupplierListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, ISupplierListHandler
    {
        public SupplierListHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}