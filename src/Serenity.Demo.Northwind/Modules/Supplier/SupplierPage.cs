using Microsoft.AspNetCore.Mvc;

namespace Serenity.Demo.Northwind;

[PageAuthorize(typeof(SupplierRow))]
public class SupplierPage : Controller
{
    [Route("Northwind/Supplier")]
    public ActionResult Index()
    {
        return this.GridPage(ESM.Modules.Supplier.SupplierPage,
            SupplierRow.Fields.PageTitle());
    }
}
