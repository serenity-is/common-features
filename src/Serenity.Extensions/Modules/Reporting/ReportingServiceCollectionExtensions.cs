using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Serenity.Extensions.Repositories;
using Serenity.Reporting;

namespace Serenity.Extensions.DependencyInjection
{
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
    }
}