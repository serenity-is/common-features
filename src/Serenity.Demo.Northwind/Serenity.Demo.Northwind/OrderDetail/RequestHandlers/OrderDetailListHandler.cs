using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<Serenity.Demo.Northwind.OrderDetailRow>;
using MyRow = Serenity.Demo.Northwind.OrderDetailRow;

namespace Serenity.Demo.Northwind
{
    public interface IOrderDetailListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

    public class OrderDetailListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IOrderDetailListHandler
    {
        public OrderDetailListHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}