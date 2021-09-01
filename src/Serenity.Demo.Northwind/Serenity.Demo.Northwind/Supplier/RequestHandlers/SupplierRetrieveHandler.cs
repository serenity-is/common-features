using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<Serenity.Demo.Northwind.SupplierRow>;
using MyRow = Serenity.Demo.Northwind.SupplierRow;

namespace Serenity.Demo.Northwind
{
    public interface ISupplierRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

    public class SupplierRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, ISupplierRetrieveHandler
    {
        public SupplierRetrieveHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}