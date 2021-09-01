using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<Serenity.Demo.Northwind.ShipperRow>;
using MyRow = Serenity.Demo.Northwind.ShipperRow;

namespace Serenity.Demo.Northwind
{
    public interface IShipperRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

    public class ShipperRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IShipperRetrieveHandler
    {
        public ShipperRetrieveHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}