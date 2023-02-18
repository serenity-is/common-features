using Microsoft.AspNetCore.Http;
using Serenity.Extensions;

namespace Serenity.Reporting;

/// <summary>
/// Default implementation for <see cref="IHtmlReportPdfRenderer"/>
/// </summary>
public class HtmlReportPdfRenderer : IHtmlReportPdfRenderer
{
    protected readonly EnvironmentSettings environmentSettings;
    protected readonly IHttpContextAccessor httpContextAccessor;
    protected readonly IHtmlToPdfConverter htmlToPdfConverter;
    protected readonly IHtmlReportRenderUrlBuilder renderUrlBuilder;
    protected readonly IWKHtmlToPdfConverter wkHtmlToPdfConverter;

    public HtmlReportPdfRenderer(
        IHtmlToPdfConverter htmlToPdfConverter,
        IHtmlReportRenderUrlBuilder renderUrlBuilder,
        IWKHtmlToPdfConverter wkHtmlToPdfConverter = null)
    {
        this.htmlToPdfConverter = htmlToPdfConverter ?? throw new ArgumentNullException(nameof(htmlToPdfConverter));
        this.renderUrlBuilder = renderUrlBuilder ?? throw new ArgumentNullException(nameof(renderUrlBuilder));
        this.wkHtmlToPdfConverter = wkHtmlToPdfConverter;
    }

    protected virtual void ForwardCookies(IReport report, string reportKey, IHtmlToPdfOptions options,
        HtmlReportRenderUrl renderUrl)
    {
        foreach (var cookie in renderUrl.CookiesToForward)
            options.Cookies[cookie.Name] = cookie.Value;
    }

    protected virtual IHtmlToPdfOptions GetConverterOptions(IReport report,
        string reportKey, string reportParams, out HtmlReportRenderUrl renderUrl)
    {
        renderUrl = renderUrlBuilder.GetRenderUrl(report, reportKey, reportParams);
        try
        {
            var options = new HtmlToPdfOptions
            {
                Url = renderUrl.Url,
                DisableLocalFileAccess = true
            };

            options.AllowedLocalPaths.AddRange(renderUrl.GetTemporaryFolders());

            ForwardCookies(report, reportKey, options, renderUrl);

            if (report is ICustomizeHtmlToPdf icustomize)
                icustomize.Customize(options);

            return options;
        }
        catch
        {
            renderUrl.Dispose();
            throw;
        }
    }

    protected virtual IHtmlToPdfConverter GetConverterFor(IReport report, string reportKey, string reportParams)
    {
        return wkHtmlToPdfConverter != null &&
            report?.GetType().GetCustomAttribute<UseWKHtmlToPdfAttribute>()?.Value == true ?
            wkHtmlToPdfConverter : htmlToPdfConverter;
    }

    /// <inheritdoc/>
    public virtual byte[] Render(IReport report, string reportKey, string reportParams)
    {
        var options = GetConverterOptions(report, reportKey, reportParams, out var renderUrl);
        try
        {
            var converter = GetConverterFor(report, reportKey, reportParams);
            return converter.Convert(options);
        }
        finally
        {
            renderUrl?.Dispose();
        }
    }
}