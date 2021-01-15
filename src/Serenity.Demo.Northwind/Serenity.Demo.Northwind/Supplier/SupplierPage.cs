using Serenity.Web;
using Microsoft.AspNetCore.Mvc;

namespace Serenity.Demo.Northwind
{
    [PageAuthorize(typeof(Entities.SupplierRow))]
    public class SupplierController : Controller
    {
        [Route("Serenity.Demo.Northwind/Supplier")]
        public ActionResult Index()
        {
            return View(MVC.Views.Supplier.SupplierIndex);
        }
    }
}
