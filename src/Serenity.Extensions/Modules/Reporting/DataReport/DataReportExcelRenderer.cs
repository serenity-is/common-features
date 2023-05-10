using System.Collections;

namespace Serenity.Reporting;

public class DataReportExcelRenderer : IDataReportExcelRenderer
{
    public byte[] Render(IDataOnlyReport report)
    {
        if (report is null)
            throw new ArgumentNullException(nameof(report));

        var columns = report.GetColumnList();

        var data = new List<object>();
        var input = report.GetData();
        var list = (input as IEnumerable) ?? new List<object> { input };
        foreach (var item in list)
            data.Add(item);

        return ExcelReportGenerator.GeneratePackageBytes(columns, data);
    }
}