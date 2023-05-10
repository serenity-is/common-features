using MyRequest = Serenity.Services.SaveRequest<Serenity.Demo.Northwind.OrderRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = Serenity.Demo.Northwind.OrderRow;

namespace Serenity.Demo.Northwind;

public interface IOrderSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class OrderSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IOrderSaveHandler
{
    public OrderSaveHandler(IRequestContext context)
         : base(context)
    {
    }
}