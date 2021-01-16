using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Serenity.PropertyGrid;
using Serenity.Reporting;
using Serenity.Services;
using Serenity.Web;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;

namespace Serenity.Extensions.Pages
{
    [Route("Serenity.Extensions/Report/[action]")]
    public class ReportController : Controller
    {
        protected EnvironmentSettings EnvironmentSettings { get; }
        protected IReportRegistry ReportRegistry { get; }
        protected IRequestContext Context { get; }
        protected IWebHostEnvironment HostEnvironment { get; }

        public ReportController(IReportRegistry reportRegistry, IRequestContext context, 
            IWebHostEnvironment hostEnvironment, IOptions<EnvironmentSettings> environmentSettings = null)
        {
            ReportRegistry = reportRegistry ??
                throw new ArgumentNullException(nameof(reportRegistry));
            
            Context = context ??
                throw new ArgumentNullException(nameof(context));

            HostEnvironment = hostEnvironment ??
                throw new ArgumentNullException(nameof(hostEnvironment));

            EnvironmentSettings = environmentSettings?.Value;
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

            var reportInfo = ReportRegistry.GetReport(key);
            if (reportInfo == null)
                throw new ArgumentOutOfRangeException(nameof(key));

            if (reportInfo.Permission != null)
                Context.Permissions.ValidatePermission(reportInfo.Permission, Context.Localizer);

            var report = ActivatorUtilities.CreateInstance(HttpContext.RequestServices, reportInfo.Type) as IReport;
            var json = opt.TrimToNull();
            if (json != null)
                JsonConvert.PopulateObject(json, report);

            byte[] renderedBytes = null;

            if (report is IDataOnlyReport dataOnlyReport)
            {
                ext = "xlsx";
                renderedBytes = Repositories.ReportRepository.Render(dataOnlyReport);
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

        static string GetWKHtmlToPdfPath(string contentRootPath)
        {
            var assemblyPath = System.IO.Path.GetDirectoryName(typeof(ReportController).Assembly.Location);

            string[] wkhtmlFileNames = Environment.OSVersion.Platform == PlatformID.Win32NT ?
                            new[] { "wkhtmltopdf.exe", "wkhtmltopdf.cmd", "wkhtmltopdf.bat" } :
                            new[] { "wkhtmltopdf", "wkhtmltopdf.sh" };

            IEnumerable<string> paths = new[] { assemblyPath };
            if (!string.IsNullOrEmpty(contentRootPath))
                paths = paths.Concat(new[] {
                    System.IO.Path.Combine(contentRootPath),
                    System.IO.Path.Combine(contentRootPath, "App_Data", "Reporting"),
                    System.IO.Path.Combine(contentRootPath, "App_Data", "reporting"),
                    System.IO.Path.Combine(contentRootPath, "bin")
                });

            paths = paths.Concat((Environment.GetEnvironmentVariable("PATH") ?? "").Split(';'));

            return paths.SelectMany(path =>
                wkhtmlFileNames.Select(f => System.IO.Path.Combine(path, f)))
                .FirstOrDefault(System.IO.File.Exists);
        }

        private byte[] RenderAsPdf(IReport report, string key, string opt)
        {
            var externalUrl = EnvironmentSettings?.SiteExternalUrl ??
                Request.GetBaseUri().ToString();

            var renderUrl = UriHelper.Combine(externalUrl, "Serenity.Extensions/Report/Render?" +
                "key=" + Uri.EscapeDataString(key));

            if (!string.IsNullOrEmpty(opt))
                renderUrl += "&opt=" + Uri.EscapeDataString(opt);

            renderUrl += "&print=1";

            var converter = new HtmlToPdfConverter();

            var wkhtmlPath = GetWKHtmlToPdfPath(HostEnvironment?.ContentRootPath);
            if (!string.IsNullOrEmpty(wkhtmlPath))
                converter.UtilityExePath = wkhtmlPath;
            else
                throw new ValidationError("Can't locate wkhtmltopdf.exe (or wkhtmltopdf in Linux) " +
                    "that is required for report generation in PATH or folder " +
                    System.IO.Path.GetDirectoryName(typeof(ReportController).Assembly.Location) + 
                    ". Please download and install the version suitable for your system from " +
                    "https://wkhtmltopdf.org/downloads.html");
            
            converter.Url = renderUrl;
            var formsCookieName = ".AspNetAuth";
            var formsCookie = Request.Cookies[formsCookieName];
            if (formsCookie != null)
                converter.Cookies[formsCookieName] = formsCookie;

            var languageCookieName = "LanguagePreference";
            var languageCookie = Request.Cookies[languageCookieName];
            if (languageCookie != null)
                converter.Cookies[languageCookieName] = languageCookie;

            if (report is ICustomizeHtmlToPdf icustomize)
                icustomize.Customize(converter);

            return converter.Execute();
        }

        private ActionResult RenderAsHtml(IReport report, bool download, bool printing,
            ref byte[] renderedBytes)
        {
            var designAttr = report.GetType().GetCustomAttribute<ReportDesignAttribute>();

            if (designAttr == null)
                throw new InvalidOperationException(string.Format(CultureInfo.CurrentCulture, "Report design attribute for type '{0}' is not found!",
                    report.GetType().FullName));

            var data = report.GetData();
            var viewData = download ? new ViewDataDictionary(this.ViewData) { Model = data } : ViewData;

            if (report is not IReportWithAdditionalData iadditional)
                viewData["AdditionalData"] = new Dictionary<string, object>();
            else
                viewData["AdditionalData"] = iadditional.GetAdditionalData();

            viewData["Printing"] = printing;

            if (!download)
                return View(viewName: designAttr.Design, model: data);

            var html = TemplateHelper.RenderViewToString(HttpContext.RequestServices, designAttr.Design, viewData);
            renderedBytes = System.Text.Encoding.UTF8.GetBytes(html);
            return null;
        }

        [HttpPost, JsonFilter]
        public ActionResult Retrieve(ReportRetrieveRequest request,
            [FromServices] IPropertyItemProvider propertyItemProvider)
        {
            if (propertyItemProvider is null)
                throw new ArgumentNullException(nameof(propertyItemProvider));

            return this.ExecuteMethod(() => new Repositories.ReportRepository(Context, 
                ReportRegistry).Retrieve(request, HttpContext.RequestServices, propertyItemProvider));
        }
    }
}