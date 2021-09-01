using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<Serenity.Demo.Northwind.OrderRow>;
using MyRow = Serenity.Demo.Northwind.OrderRow;

namespace Serenity.Demo.Northwind
{
    public interface IOrderRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

    public class OrderRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IOrderRetrieveHandler
    {
        public OrderRetrieveHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}