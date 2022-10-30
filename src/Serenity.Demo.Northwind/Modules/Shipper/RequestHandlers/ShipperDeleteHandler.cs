using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = Serenity.Demo.Northwind.ShipperRow;

namespace Serenity.Demo.Northwind
{
    public interface IShipperDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

    public class ShipperDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IShipperDeleteHandler
    {
        public ShipperDeleteHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}