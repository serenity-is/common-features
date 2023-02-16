using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Serenity.Reporting;

namespace Serenity.Extensions.DependencyInjection;

/// <summary>
/// Contains extensions to register reporting services in Extensions
/// </summary>
public static class ReportingServiceCollectionExtensions
{
    /// <summary>
    /// Adds excel exporter
    /// </summary>
    /// <param name="services">The service collection.</param>
    public static void AddExcelExporter(this IServiceCollection services)
    {
        if (services == null)
            throw new ArgumentNullException(nameof(services));

        services.TryAddSingleton<IDataReportExcelRenderer, DataReportExcelRenderer>();
        services.TryAddSingleton<IExcelExporter, ExcelExporter>();
    }

    public static void AddHtmlToPdf(this IServiceCollection services)
    {
        if (services == null)
            throw new ArgumentNullException(nameof(services));

        services.TryAddSingleton<IHtmlReportRenderUrlBuilder, HtmlReportCallbackUrlBuilder>();
        services.TryAddSingleton<IWKHtmlToPdfConverter, WKHtmlToPdfConverter>();
        services.TryAddSingleton<IHtmlToPdfConverter, WKHtmlToPdfConverter>();
        services.TryAddSingleton<IHtmlReportPdfRenderer, HtmlReportPdfRenderer>();
    }

    public static void AddReporting(this IServiceCollection services)
    {
        services.TryAddSingleton<IReportRegistry, ReportRegistry>();
        services.AddExcelExporter();
        services.AddHtmlToPdf();
    }
}