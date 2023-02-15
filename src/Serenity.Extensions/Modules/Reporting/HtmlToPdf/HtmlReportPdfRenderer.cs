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

    public HtmlReportPdfRenderer(
        IHtmlToPdfConverter htmlToPdfConverter,
        IHttpContextAccessor httpContextAccessor = null,
        IOptions<EnvironmentSettings> environmentSettings = null)
    {
        this.htmlToPdfConverter = htmlToPdfConverter ?? throw new ArgumentNullException(nameof(htmlToPdfConverter));
        this.environmentSettings = environmentSettings?.Value;
        this.httpContextAccessor = httpContextAccessor;
    }

    protected virtual string GetRenderAction(IReport report)
    {
        return "Serenity.Extensions/Report/Render";
    }

    protected virtual string GetReportKey(IReport report)
    {
        if (report is null)
            throw new ArgumentNullException(nameof(report));

        var attr = report.GetType().GetCustomAttribute<ReportAttribute>(false);
        if (attr == null || attr.ReportKey.IsNullOrEmpty())
            return report.GetType().FullName;

        return attr.ReportKey;
    }

    protected virtual string GetSiteExternalUrl()
    {
        var externalUrl = environmentSettings?.SiteExternalUrl.TrimToNull() ??
            httpContextAccessor?.HttpContext?.Request?.GetBaseUri().ToString();

        if (string.IsNullOrEmpty(externalUrl))
            throw new ValidationError("Can't determine the callback URL for report rendering. " +
                "Please set EnvironmentSettings:SiteExternalUrl in appsettings.json!");

        return externalUrl;
    }

    protected virtual string GetRenderUrl(IReport report, string key, string opt)
    {
        if (string.IsNullOrEmpty(key))
            key = GetReportKey(report);

        var renderUrl = GetSiteExternalUrl();
        renderUrl = UriHelper.Combine(renderUrl, GetRenderAction(report) +
            "?key=" + Uri.EscapeDataString(key));

        if (!string.IsNullOrEmpty(opt))
            renderUrl += "&opt=" + Uri.EscapeDataString(opt);

        renderUrl += "&print=1";

        return renderUrl;
    }

    protected virtual string GetAuthCookieName()
    {
        return ".AspNetAuth";
    }

    protected virtual string GetLanguageCookieName()
    {
        return "LanguagePreference";
    }

    protected virtual void PassCookies(IHtmlToPdfOptions options)
    {
        var request = httpContextAccessor?.HttpContext?.Request;
        if (request is null)
            return;

        var authCookieName = GetAuthCookieName();

        if (!string.IsNullOrEmpty(authCookieName))
        {
            var authCookie = request?.Cookies[authCookieName];
            if (authCookie != null)
                options.Cookies[authCookieName] = authCookie;
        }

        var languageCookieName = GetLanguageCookieName();
        if (!string.IsNullOrEmpty(languageCookieName))
        {
            var languageCookie = request?.Cookies[languageCookieName];
            if (languageCookie != null)
                options.Cookies[languageCookieName] = languageCookie;
        }
    }

    protected virtual IHtmlToPdfOptions GetConverterOptions(IReport report, string key, string opt)
    {
        var options = new HtmlToPdfOptions
        {
            Url = GetRenderUrl(report, key, opt)
        };

        PassCookies(options);

        if (report is ICustomizeHtmlToPdf icustomize)
            icustomize.Customize(options);

        return options;
    }

    public virtual byte[] Render(IReport report, string key, string opt)
    {
        var options = GetConverterOptions(report, key, opt);
        return htmlToPdfConverter.Convert(options);
    }
}