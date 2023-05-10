using Microsoft.AspNetCore.Mvc;
using Serenity.Reporting;

namespace Serenity.Demo.Northwind;

[PageAuthorize(PermissionKeys.General)]
public class ReportsPage : Controller
{
    protected IReportRegistry ReportRegistry { get; }
    protected IRequestContext Context { get; }

    public ReportsPage(IReportRegistry reportRegistry, IRequestContext context)
    {
        ReportRegistry = reportRegistry ??
            throw new ArgumentNullException(nameof(reportRegistry));

        Context = context ??
            throw new ArgumentNullException(nameof(context));
    }

    [Route("Northwind/Reports")]
    public ActionResult Index([FromServices] IReportTreeFactory reportTreeFactory)
    {
        return View(Extensions.MVC.Views.Reporting.ReportPage,
            reportTreeFactory.BuildReportTree("Northwind"));
    }
}