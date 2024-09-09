using Microsoft.AspNetCore.Mvc;

namespace Serenity.Demo.Northwind;

[PageAuthorize(typeof(ShipperRow))]
public class ShipperPage : Controller
{
    [Route("Northwind/Shipper")]
    public ActionResult Index()
    {
        return this.GridPage(ESM.Modules.Shipper.ShipperPage,
            ShipperRow.Fields.PageTitle());
    }
}
