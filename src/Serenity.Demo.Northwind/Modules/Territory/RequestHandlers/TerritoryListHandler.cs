using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<Serenity.Demo.Northwind.TerritoryRow>;
using MyRow = Serenity.Demo.Northwind.TerritoryRow;

namespace Serenity.Demo.Northwind;

public interface ITerritoryListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class TerritoryListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, ITerritoryListHandler
{
    public TerritoryListHandler(IRequestContext context)
         : base(context)
    {
    }
}