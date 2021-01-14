using Serenity.Web;
using Microsoft.AspNetCore.Mvc;

namespace Serenity.Demo.Northwind.Pages
{
    [PageAuthorize(typeof(Entities.ProductRow))]
    public class ProductController : Controller
    {
        [Route("Serenity.Demo.Northwind/Product")]
        public ActionResult Index()
        {
            return View(MVC.Views.Product.ProductIndex);
        }
    }
}
