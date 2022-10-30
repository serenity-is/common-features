using Serenity.Web;
using Microsoft.AspNetCore.Mvc;

namespace Serenity.Demo.Northwind
{
    [PageAuthorize(typeof(CustomerRow))]
    public class CustomerController : Controller
    {
        [Route("Northwind/Customer")]
        public ActionResult Index()
        {
            return View(MVC.Views.Customer.CustomerIndex);
        }
    }
}
