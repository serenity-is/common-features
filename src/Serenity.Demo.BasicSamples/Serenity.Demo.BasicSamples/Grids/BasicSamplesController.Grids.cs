using Microsoft.AspNetCore.Mvc;
using Views = Serenity.Demo.BasicSamples.MVC.Views.Grids;

namespace Serenity.Demo.BasicSamples
{
    public partial class BasicSamplesController : Controller
    {
        public ActionResult CustomLinksInGrid()
        {
            return View(Views.CustomLinksInGrid.Index);
        }

        public ActionResult EnablingRowSelection()
        {
            return View(Views.EnablingRowSelection.Index);
        }

        public ActionResult GridFilteredByCriteria()
        {
            return View(Views.GridFilteredByCriteria.Index);
        }

        public ActionResult GroupingAndSummariesInGrid()
        {
            return View(Views.GroupingAndSummariesInGrid.Index);
        }

        public ActionResult InitialValuesForQuickFilters()
        {
            return View(Views.InitialValuesForQuickFilters.Index);
        }

        public ActionResult InlineActionButtons()
        {
            return View(Views.InlineActionButtons.Index);
        }

        public ActionResult InlineImageInGrid()
        {
            return View(Views.InlineImageInGrid.Index);
        }

        public ActionResult RemovingAddButton()
        {
            return View(Views.RemovingAddButton.Index);
        }

        public ActionResult ViewWithoutID()
        {
            return View(Views.ViewWithoutID.Index);
        }

        public ActionResult WrappedHeaders()
        {
            return View(Views.WrappedHeaders.Index);
        }
    }
}