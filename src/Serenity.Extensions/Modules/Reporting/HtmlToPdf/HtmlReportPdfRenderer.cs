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
    private readonly IHtmlReportRenderUrlBuilder renderUrlBuilder;

    public HtmlReportPdfRenderer(
        IHtmlToPdfConverter htmlToPdfConverter,
        IHtmlReportRenderUrlBuilder renderUrlBuilder)
    {
        this.htmlToPdfConverter = htmlToPdfConverter ?? throw new ArgumentNullException(nameof(htmlToPdfConverter));
        this.renderUrlBuilder = renderUrlBuilder ?? throw new ArgumentNullException(nameof(renderUrlBuilder));
    }

    protected virtual void ForwardCookies(IReport report, string reportKey, IHtmlToPdfOptions options)
    {
        foreach (var cookie in renderUrlBuilder.GetCookiesToForward())
            options.Cookies[cookie.Name] = cookie.Value;
    }

    protected virtual IHtmlToPdfOptions GetConverterOptions(IReport report,
        string reportKey, string reportParams, out Action cleanup)
    {
        var url = renderUrlBuilder.GetRenderUrl(report, reportKey, reportParams, out cleanup);
        try
        {
            var options = new HtmlToPdfOptions
            {
                Url = url
            };

            if (url.StartsWith("file:///", StringComparison.OrdinalIgnoreCase))
            {
                var tempFolder = PathHelper.ToPath(url["file:///".Length..]);
                options.CustomArgs.Add("--disable-local-file-access");
                options.CustomArgs.Add("--allow");
                options.CustomArgs.Add(tempFolder);
            }

            ForwardCookies(report, reportKey, options);

            if (report is ICustomizeHtmlToPdf icustomize)
                icustomize.Customize(options);

            return options;
        }
        catch
        {
            cleanup?.Invoke();
            throw;
        }
    }

    /// <inheritdoc/>
    public virtual byte[] Render(IReport report, string reportKey, string reportParams)
    {
        var options = GetConverterOptions(report, reportKey, reportParams, out var cleanup);
        try
        {
            return htmlToPdfConverter.Convert(options);
        }
        finally
        {
            cleanup?.Invoke();
        }
    }
}