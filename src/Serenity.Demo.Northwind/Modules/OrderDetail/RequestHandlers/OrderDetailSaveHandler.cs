using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<Serenity.Demo.Northwind.OrderDetailRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = Serenity.Demo.Northwind.OrderDetailRow;

namespace Serenity.Demo.Northwind
{
    public interface IOrderDetailSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

    public class OrderDetailSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IOrderDetailSaveHandler
    {
        public OrderDetailSaveHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}