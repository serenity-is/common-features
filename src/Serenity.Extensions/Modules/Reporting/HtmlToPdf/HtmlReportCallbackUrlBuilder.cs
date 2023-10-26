using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Http;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Text;
using System.Net;

namespace Serenity.Reporting;

/// <summary>
/// Default implementation for <see cref="IHtmlReportRenderUrlBuilder"/>
/// </summary>
public class HtmlReportCallbackUrlBuilder : IHtmlReportCallbackUrlBuilder
{
    protected readonly IOptionsMonitor<CookieAuthenticationOptions> cookieOptions;
    protected readonly IHttpContextAccessor httpContextAccessor;
    protected readonly ISiteAbsoluteUrl siteAbsoluteUrl;

    public HtmlReportCallbackUrlBuilder(
        ISiteAbsoluteUrl siteAbsoluteUrl,
        IOptionsMonitor<CookieAuthenticationOptions> cookieOptions = null,
        IHttpContextAccessor httpContextAccessor = null)
    {
        this.siteAbsoluteUrl = siteAbsoluteUrl ?? throw new ArgumentNullException(nameof(siteAbsoluteUrl));
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
        if (attr == null || string.IsNullOrEmpty(attr.ReportKey))
            return report.GetType().FullName;

        return attr.ReportKey;
    }

    protected virtual string GetSiteInternalUrl()
    {
        return siteAbsoluteUrl.GetInternalUrl();
    }

    protected virtual string GetAuthCookieName()
    {
        return cookieOptions?.Get(CookieAuthenticationDefaults.AuthenticationScheme)?.Cookie?.Name ?? ".AspNetAuth";
    }

    protected virtual string GetLanguageCookieName()
    {
        return "LanguagePreference";
    }

    private const string ChunkKeySuffix = "C";
    private const string ChunkCountPrefix = "chunks-";

    private static int ParseChunksCount(string value)
    {
        if (value != null && 
            value.StartsWith(ChunkCountPrefix, StringComparison.Ordinal) &&
            int.TryParse(value.AsSpan(ChunkCountPrefix.Length), NumberStyles.None, CultureInfo.InvariantCulture, out var chunksCount))
            return chunksCount;

        return 0;
    }

    protected virtual IEnumerable<Cookie> GetCookiesToForward()
    {
        var request = httpContextAccessor?.HttpContext?.Request;
        if (request is null)
            yield break;

        var authCookieName = GetAuthCookieName();

        if (!string.IsNullOrEmpty(authCookieName))
        {
            var authCookie = request?.Cookies[authCookieName];
            if (authCookie != null)
            {
                yield return new Cookie(authCookieName, authCookie);

                var chunksCount = ParseChunksCount(authCookie);
                if (chunksCount > 0)
                {
                    for (var chunkId = 1; chunkId <= chunksCount; chunkId++)
                    {
                        var chunkCookieName = authCookieName + ChunkKeySuffix + chunkId.ToString(CultureInfo.InvariantCulture);
                        var chunkCookie = request.Cookies[chunkCookieName];
                        if (string.IsNullOrEmpty(chunkCookie))
                            yield return new Cookie(chunkCookieName, chunkCookie);
                    }
                }
            }
        }

        var languageCookieName = GetLanguageCookieName();
        if (!string.IsNullOrEmpty(languageCookieName))
        {
            var languageCookie = request?.Cookies[languageCookieName];
            if (languageCookie != null)
                yield return new Cookie(languageCookieName, languageCookie);
        }
    }

    public virtual HtmlReportRenderUrl GetRenderUrl(IReport report, ReportRenderOptions options)
    {
        var response = new HtmlReportRenderUrl();

        string reportKey = options?.ReportKey;
        if (string.IsNullOrEmpty(options?.ReportKey))
            reportKey = GetReportKey(report);

        response.Url = GetSiteInternalUrl();
        response.Url = UriHelper.Combine(response.Url, GetRenderAction(report) +
            "?key=" + Uri.EscapeDataString(reportKey));

        var reportParams = options?.ReportParams ?? JSON.Stringify(report);

        if (!string.IsNullOrEmpty(reportParams))
            response.Url += "&opt=" + Uri.EscapeDataString(reportParams);

        response.Url += "&print=1";

        foreach (var cookie in GetCookiesToForward())
            response.CookiesToForward.Add(cookie);

        return response;
    }
}