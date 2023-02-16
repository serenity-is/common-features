using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Serenity.Extensions;
using System.Net;

namespace Serenity.Reporting;

/// <summary>
/// Default implementation for <see cref="IHtmlReportRenderUrlBuilder"/>
/// </summary>
public class HtmlReportCallbackUrlBuilder : IHtmlReportCallbackUrlBuilder
{
    protected readonly EnvironmentSettings environmentSettings;
    protected readonly IOptionsMonitor<CookieAuthenticationOptions> cookieOptions;
    protected readonly IHttpContextAccessor httpContextAccessor;

    public HtmlReportCallbackUrlBuilder(
        IOptionsMonitor<CookieAuthenticationOptions> cookieOptions = null,
        IHttpContextAccessor httpContextAccessor = null,
        IOptions<EnvironmentSettings> environmentSettings = null)
    {
        this.environmentSettings = environmentSettings?.Value;
        this.cookieOptions = cookieOptions;
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

    public virtual string GetRenderUrl(IReport report, string reportKey, string reportParams)
    {
        if (string.IsNullOrEmpty(reportKey))
            reportKey = GetReportKey(report);

        var renderUrl = GetSiteExternalUrl();
        renderUrl = UriHelper.Combine(renderUrl, GetRenderAction(report) +
            "?key=" + Uri.EscapeDataString(reportKey));

        if (!string.IsNullOrEmpty(reportParams))
            renderUrl += "&opt=" + Uri.EscapeDataString(reportParams);

        renderUrl += "&print=1";

        return renderUrl;
    }

    protected virtual string GetAuthCookieName()
    {
        return cookieOptions?.Get(CookieAuthenticationDefaults.AuthenticationScheme)?.Cookie?.Name ?? ".AspNetAuth";
    }

    protected virtual string GetLanguageCookieName()
    {
        return "LanguagePreference";
    }

    public IEnumerable<Cookie> GetCookiesToForward()
    {
        var request = httpContextAccessor?.HttpContext?.Request;
        if (request is null)
            yield break;

        var authCookieName = GetAuthCookieName();

        if (!string.IsNullOrEmpty(authCookieName))
        {
            var authCookie = request?.Cookies[authCookieName];
            if (authCookie != null)
                yield return new Cookie(authCookieName, authCookie);
        }

        var languageCookieName = GetLanguageCookieName();
        if (!string.IsNullOrEmpty(languageCookieName))
        {
            var languageCookie = request?.Cookies[languageCookieName];
            if (languageCookie != null)
                yield return new Cookie(languageCookieName, languageCookie);
        }
    }
}