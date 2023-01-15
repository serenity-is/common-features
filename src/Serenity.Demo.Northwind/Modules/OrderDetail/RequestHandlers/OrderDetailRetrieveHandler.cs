using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<Serenity.Demo.Northwind.OrderDetailRow>;
using MyRow = Serenity.Demo.Northwind.OrderDetailRow;

namespace Serenity.Demo.Northwind
{
    public interface IOrderDetailRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

    public class OrderDetailRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IOrderDetailRetrieveHandler
    {
        public OrderDetailRetrieveHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}