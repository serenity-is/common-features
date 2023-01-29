using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<Serenity.Demo.Northwind.ShipperRow>;
using MyRow = Serenity.Demo.Northwind.ShipperRow;

namespace Serenity.Demo.Northwind;

public interface IShipperListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class ShipperListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IShipperListHandler
{
    public ShipperListHandler(IRequestContext context)
         : base(context)
    {
    }
}