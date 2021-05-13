using Serenity.Web;
using Microsoft.AspNetCore.Mvc;

namespace Serenity.Demo.Northwind
{
    [PageAuthorize(typeof(Entities.CategoryRow))]
    public class CategoryController : Controller
    {
        [Route("Northwind/Category")]
        public ActionResult Index()
        {
            return View(MVC.Views.Category.CategoryIndex);
        }
    }
}
