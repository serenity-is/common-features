using Microsoft.Extensions.DependencyInjection;
using Serenity.PropertyGrid;
using Serenity.Reporting;

namespace Serenity.Extensions.Repositories;

[Obsolete("Inject and use IReportTreeFactory or IReportRetrieveHandler")]
public class ReportRepository : BaseRepository
{
    private readonly IReportRegistry reportRegistry;

    public ReportRepository(IRequestContext context, IReportRegistry reportRegistry)
         : base(context)
    {
        this.reportRegistry = reportRegistry ?? throw new ArgumentNullException(nameof(reportRegistry));
    }

    public ReportTree GetReportTree(string category)
    {
        var reports = reportRegistry.GetAvailableReportsInCategory(category);
        return ReportTree.FromList(reports, Localizer, category);
    }

    public ReportRetrieveResponse Retrieve(ReportRetrieveRequest request,
        IServiceProvider serviceProvider, IPropertyItemProvider propertyItemProvider)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        if (request.ReportKey.IsEmptyOrNull())
            throw new ArgumentNullException(nameof(request.ReportKey));
        
        if (propertyItemProvider is null)
            throw new ArgumentNullException(nameof(propertyItemProvider));

        var reportInfo = reportRegistry.GetReport(request.ReportKey, validatePermission: true);
        if (reportInfo == null)
            throw new ArgumentOutOfRangeException(nameof(request.ReportKey));

        var response = new ReportRetrieveResult
        {
            Properties = propertyItemProvider.GetPropertyItemsFor(reportInfo.Type).ToList(),
            ReportKey = reportInfo.Key,
            Title = reportInfo.Title
        };
        var reportInstance = ActivatorUtilities.CreateInstance(serviceProvider, reportInfo.Type);
        response.InitialSettings = reportInstance;
        response.IsDataOnlyReport = reportInstance is IDataOnlyReport;
        response.IsExternalReport = reportInstance is IExternalReport;

        return response;
    }
}