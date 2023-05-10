using Microsoft.AspNetCore.Mvc;

namespace Serenity.Demo.Northwind;

[PageAuthorize(typeof(SupplierRow))]
public class SupplierPage : Controller
{
    [Route("Northwind/Supplier")]
    public ActionResult Index()
    {
        return View(MVC.Views.Supplier.SupplierIndex);
    }
}
