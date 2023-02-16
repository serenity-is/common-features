using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Serenity.PropertyGrid;
using Serenity.Reporting;

namespace Serenity.Extensions.Pages;

[Route("Serenity.Extensions/Report/[action]")]
public class ReportController : Controller
{
    protected readonly IReportRegistry reportRegistry;
    protected readonly IRequestContext requestContext;
    protected readonly IDataReportExcelRenderer excelRenderer;
    protected readonly IHtmlReportPdfRenderer htmlReportPdfRenderer;
    protected readonly IWebHostEnvironment hostEnvironment;

    public ReportController(IReportRegistry reportRegistry,
        IRequestContext requestContext,
        IDataReportExcelRenderer excelRenderer,
        IHtmlReportPdfRenderer htmlReportPdfRenderer)
    {
        this.reportRegistry = reportRegistry ?? throw new ArgumentNullException(nameof(reportRegistry));
        this.requestContext = requestContext ?? throw new ArgumentNullException(nameof(requestContext));
        this.excelRenderer = excelRenderer ?? throw new ArgumentNullException(nameof(excelRenderer));
        this.htmlReportPdfRenderer = htmlReportPdfRenderer ?? throw new ArgumentNullException(nameof(htmlReportPdfRenderer));
    }

    public ActionResult Render(string key, string opt, string ext, int? print = 0)
    {
        return Execute(key, opt, ext, download: false, printing: print != 0);
    }

    public ActionResult Download(string key, string opt, string ext)
    {
        return Execute(key, opt, ext, download: true, printing: true);
    }

    private ActionResult Execute(string key, string opt, string ext, bool download, bool printing)
    {
        if (key.IsEmptyOrNull())
            throw new ArgumentNullException(nameof(key));

        var reportInfo = reportRegistry.GetReport(key);
        if (reportInfo == null)
            throw new ArgumentOutOfRangeException(nameof(key));

        if (reportInfo.Permission != null)
            requestContext.Permissions.ValidatePermission(reportInfo.Permission, requestContext.Localizer);

        var report = ActivatorUtilities.CreateInstance(HttpContext.RequestServices, reportInfo.Type) as IReport;
        var json = opt.TrimToNull();
        if (json != null)
            JsonConvert.PopulateObject(json, report);

        byte[] renderedBytes = null;

        if (report is IDataOnlyReport dataOnlyReport)
        {
            ext = "xlsx";
            renderedBytes = excelRenderer.Render(dataOnlyReport);
        }
        else if (report is IExternalReport)
        {
            var url = report.GetData() as string;
            if (string.IsNullOrEmpty(url))
                throw new InvalidProgramException("External reports must return a URL string from GetData() method!");

            return new RedirectResult(url);
        }
        else
        {
            ext = (ext ?? "html").ToLowerInvariant();

            if (ext == "htm" || ext == "html")
            {
                var result = RenderAsHtml(report, download, printing, ref renderedBytes);
                if (!download)
                    return result;
            }
            else if (ext == "pdf")
            {
                renderedBytes = RenderAsPdf(report, key, opt);
            }
            else
                throw new ArgumentOutOfRangeException(nameof(ext));
        }

        return PrepareFileResult(report, ext, download, renderedBytes, reportInfo);
    }

    private ActionResult PrepareFileResult(IReport report, string ext, bool download,
        byte[] renderedBytes, ReportRegistry.Report reportInfo)
    {
        string fileDownloadName;
        if (report is ICustomFileName customFileName)
            fileDownloadName = customFileName.GetFileName();
        else
            fileDownloadName = (reportInfo.Title ?? reportInfo.Key) + "_" +
                DateTime.Now.ToString("yyyyMMdd_HHss", CultureInfo.InvariantCulture);

        fileDownloadName += "." + ext;

        if (download)
        {
            return new FileContentResult(renderedBytes, "application/octet-stream")
            {
                FileDownloadName = fileDownloadName
            };
        }

        Response.Headers["Content-Disposition"] = "inline;filename=" + System.Net.WebUtility.UrlEncode(fileDownloadName);
        return File(renderedBytes, KnownMimeTypes.Get(fileDownloadName));
    }
    
    private byte[] RenderAsPdf(IReport report, string key, string opt)
    {
        return htmlReportPdfRenderer.Render(report, key, opt);
    }

    private ActionResult RenderAsHtml(IReport report, bool download, bool printing,
        ref byte[] renderedBytes)
    {
        var designAttr = report.GetType().GetCustomAttribute<ReportDesignAttribute>();
        if (designAttr is null)
            throw new InvalidOperationException(string.Format(CultureInfo.CurrentCulture,
                "Report design attribute for type '{0}' is not found!", report.GetType().FullName));

        var model = report.GetData();

        void setViewData(ViewDataDictionary viewData)
        {
            viewData["Printing"] = printing;
            viewData["AdditionalData"] = (report as IReportWithAdditionalData)?.GetAdditionalData() ??
                new Dictionary<string, object>();
        }

        if (!download)
        {
            setViewData(ViewData);
            return View(viewName: designAttr.Design, model: model);
        }

        var html = TemplateHelper.RenderViewToString(HttpContext.RequestServices, designAttr.Design, model: model,
            viewContext => setViewData(viewContext.ViewData));

        renderedBytes = Encoding.UTF8.GetBytes(html);
        return null;
    }

    [HttpPost, JsonRequest]
    public ActionResult Retrieve(ReportRetrieveRequest request,
        [FromServices] IPropertyItemProvider propertyItemProvider)
    {
        if (propertyItemProvider is null)
            throw new ArgumentNullException(nameof(propertyItemProvider));

        return this.ExecuteMethod(() => new Repositories.ReportRepository(requestContext, 
            reportRegistry).Retrieve(request, HttpContext.RequestServices, propertyItemProvider));
    }
}