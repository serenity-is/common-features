using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = Serenity.Demo.Northwind.SupplierRow;

namespace Serenity.Demo.Northwind;

public interface ISupplierDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class SupplierDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, ISupplierDeleteHandler
{
    public SupplierDeleteHandler(IRequestContext context)
         : base(context)
    {
    }
}