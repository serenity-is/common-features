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
                Url = renderUrl.Url
            };

            if (renderUrl.GetTemporaryFolders().Any())
            {
                if (!options.CustomArgs.Contains("--disable-local-file-access"))
                    options.CustomArgs.Add("--disable-local-file-access");

                foreach (var tempFolder in renderUrl.GetTemporaryFolders())
                {
                    options.CustomArgs.Add("--allow");
                    options.CustomArgs.Add(tempFolder);
                }
            }

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

    /// <inheritdoc/>
    public virtual byte[] Render(IReport report, string reportKey, string reportParams)
    {
        var options = GetConverterOptions(report, reportKey, reportParams, out var renderUrl);
        try
        {
            return htmlToPdfConverter.Convert(options);
        }
        finally
        {
            renderUrl?.Dispose();
        }
    }
}