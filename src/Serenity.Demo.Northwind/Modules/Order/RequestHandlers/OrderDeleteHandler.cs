using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = Serenity.Demo.Northwind.OrderRow;

namespace Serenity.Demo.Northwind
{
    public interface IOrderDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

    public class OrderDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IOrderDeleteHandler
    {
        public OrderDeleteHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}