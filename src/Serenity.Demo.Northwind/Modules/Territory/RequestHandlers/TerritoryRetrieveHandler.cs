using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<Serenity.Demo.Northwind.TerritoryRow>;
using MyRow = Serenity.Demo.Northwind.TerritoryRow;

namespace Serenity.Demo.Northwind;

public interface ITerritoryRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class TerritoryRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, ITerritoryRetrieveHandler
{
    public TerritoryRetrieveHandler(IRequestContext context)
         : base(context)
    {
    }
}