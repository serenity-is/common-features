using MyRequest = Serenity.Services.SaveRequest<Serenity.Demo.Northwind.TerritoryRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = Serenity.Demo.Northwind.TerritoryRow;

namespace Serenity.Demo.Northwind
{
    public interface ITerritorySaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

    public class TerritorySaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, ITerritorySaveHandler
    {
        public TerritorySaveHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}