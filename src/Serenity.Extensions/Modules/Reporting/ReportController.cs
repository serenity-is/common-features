using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using Serenity.Reporting;
using System.Net;

namespace Serenity.Extensions.Pages;

[Route("Serenity.Extensions/Report/[action]")]
public class ReportController : Controller
{
    protected readonly IReportFactory reportFactory;
    private readonly IReportRenderer reportRenderer;

    public ReportController(IReportFactory reportFactory,
        IReportRenderer reportRenderer)
    {
        this.reportFactory = reportFactory ?? throw new ArgumentNullException(nameof(reportFactory));
        this.reportRenderer = reportRenderer ?? throw new ArgumentNullException(nameof(reportRenderer));
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
        var report = reportFactory.Create(key, opt, validatePermission: true);
        var result = reportRenderer.Render(report, new ReportRenderOptions
        {
            ExportFormat = ext,
            PreviewMode = !download && !printing,
            ReportKey = key,
            ReportParams = opt,
        });

        if (!string.IsNullOrEmpty(result.RedirectUri))
            return Redirect(result.RedirectUri);

        if (!string.IsNullOrEmpty(result.ViewName))
        {
            foreach (var pair in result.ViewData)
                ViewData[pair.Key] = pair.Value;
            return View(viewName: result.ViewName, model: result.Model);
        }

        if (download)
        {
            var downloadName = GetDownloadNameFor(report, result.FileExtension);
            Response.Headers[HeaderNames.ContentDisposition] = "inline;filename=" +
                WebUtility.UrlEncode(downloadName);
        }

        return File(result.ContentBytes, result.MimeType ??
            KnownMimeTypes.Get("_" + result.FileExtension));
    }

    protected string GetDownloadNameFor(IReport report, string extension)
    {
        if (report is ICustomFileName customFileName)
            return customFileName.GetFileName() + extension;
        else
        {
            var filePrefix = report.GetType().GetAttribute<DisplayNameAttribute>()?.DisplayName ??
                report.GetType().GetAttribute<ReportAttribute>()?.ReportKey ??
                report.GetType().Name;

            return filePrefix + "_" +
                DateTime.Now.ToString("yyyyMMdd_HHss", CultureInfo.InvariantCulture) + extension;
        }
    }

    [HttpPost, JsonRequest]
    public ActionResult Retrieve(ReportRetrieveRequest request,
        [FromServices] IReportRetrieveHandler handler)
    {
        return this.ExecuteMethod(() => handler.Retrieve(request));
    }
}