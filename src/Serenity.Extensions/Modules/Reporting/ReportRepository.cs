using Microsoft.Extensions.DependencyInjection;
using Serenity.PropertyGrid;
using Serenity.Reporting;

namespace Serenity.Extensions.Repositories;

public class ReportRepository : BaseRepository
{
    public IReportRegistry ReportRegistry { get; }

    public ReportRepository(IRequestContext context, IReportRegistry reportRegistry)
         : base(context)
    {
        ReportRegistry = reportRegistry ?? 
            throw new ArgumentNullException(nameof(reportRegistry));
    }

    public ReportTree GetReportTree(string category)
    {
        var reports = ReportRegistry.GetAvailableReportsInCategory(category);
        return ReportTree.FromList(reports, Localizer, category);
    }

    public ReportRetrieveResult Retrieve(ReportRetrieveRequest request,
        IServiceProvider serviceProvider, IPropertyItemProvider propertyItemProvider)
    {
        if (request is null)
            throw new ArgumentNullException(nameof(request));

        if (request.ReportKey.IsEmptyOrNull())
            throw new ArgumentNullException(nameof(request.ReportKey));

        if (propertyItemProvider is null)
            throw new ArgumentNullException(nameof(propertyItemProvider));

        var reportInfo = ReportRegistry.GetReport(request.ReportKey);
        if (reportInfo == null)
            throw new ArgumentOutOfRangeException(nameof(request.ReportKey));

        if (reportInfo.Permission != null)
            Permissions.ValidatePermission(reportInfo.Permission, Localizer);

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