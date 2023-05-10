using Serenity.Extensions;

namespace Serenity.Reporting;

public class DefaultReportTreeFactory : IReportTreeFactory
{
    private readonly IReportRegistry reportRegistry;
    private readonly ITextLocalizer localizer;

    public DefaultReportTreeFactory(IReportRegistry reportRegistry, ITextLocalizer localizer)
    {
        this.reportRegistry = reportRegistry ?? throw new ArgumentNullException(nameof(reportRegistry));
        this.localizer = localizer ?? throw new ArgumentNullException(nameof(localizer));
    }

    public ReportTree BuildReportTree(string category)
    {
        var reports = reportRegistry.GetAvailableReportsInCategory(category);
        return ReportTree.FromList(reports, localizer, category);
    }
}