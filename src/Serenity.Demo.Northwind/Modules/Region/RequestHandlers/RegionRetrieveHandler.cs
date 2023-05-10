using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<Serenity.Demo.Northwind.RegionRow>;
using MyRow = Serenity.Demo.Northwind.RegionRow;

namespace Serenity.Demo.Northwind;

public interface IRegionRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class RegionRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IRegionRetrieveHandler
{
    public RegionRetrieveHandler(IRequestContext context)
         : base(context)
    {
    }
}