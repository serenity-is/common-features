using Microsoft.AspNetCore.Mvc;

namespace Serenity.Demo.Northwind;

[PageAuthorize(typeof(CustomerRow))]
public class CustomerPage : Controller
{
    [Route("Northwind/Customer")]
    public ActionResult Index()
    {
        return this.GridPage(ESM.Modules.Customer.CustomerPage,
            CustomerRow.Fields.PageTitle());
    }
}

[Obsolete("Use CustomerPage")]
public abstract class CustomerController : CustomerPage
{
}
