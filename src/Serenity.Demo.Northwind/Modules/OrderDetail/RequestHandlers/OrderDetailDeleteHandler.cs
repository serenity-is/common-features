using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = Serenity.Demo.Northwind.OrderDetailRow;

namespace Serenity.Demo.Northwind;

public interface IOrderDetailDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class OrderDetailDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IOrderDetailDeleteHandler
{
    public OrderDetailDeleteHandler(IRequestContext context)
         : base(context)
    {
    }
}