using Microsoft.AspNetCore.Mvc;
using Serenity.Extensions.Repositories;
using Serenity.Reporting;
using Serenity.Services;
using Serenity.Web;
using System;

namespace Serenity.Demo.Northwind
{
    [PageAuthorize(PermissionKeys.General)]
    public class ReportsController : Controller
    {
        protected IReportRegistry ReportRegistry { get; }
        protected IRequestContext Context { get; }

        public ReportsController(IReportRegistry reportRegistry, IRequestContext context)
        {
            ReportRegistry = reportRegistry ??
                throw new ArgumentNullException(nameof(reportRegistry));

            Context = context ??
                throw new ArgumentNullException(nameof(context));
        }

        [Route("Northwind/Reports")]
        public ActionResult Index()
        {
            return View(Extensions.MVC.Views.Reporting.ReportPage, 
                new ReportRepository(Context, ReportRegistry).GetReportTree("Northwind"));
        }
    }
}