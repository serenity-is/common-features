using Microsoft.AspNetCore.Mvc;

namespace Serenity.Demo.Northwind;

[PageAuthorize(typeof(CustomerRow))]
public class CustomerPage : Controller
{
    [Route("Northwind/Customer")]
    public ActionResult Index()
    {
        return View(MVC.Views.Customer.CustomerIndex);
    }
}

[Obsolete("Use CustomerPage")]
public abstract class CustomerController : CustomerPage
{
}
