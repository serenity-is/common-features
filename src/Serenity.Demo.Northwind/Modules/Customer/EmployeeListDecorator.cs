using Serenity.Reporting;

namespace Serenity.Demo.Northwind
{
    public class EmployeeListDecorator : BaseCellDecorator
    {
        public EmployeeListDecorator(ITwoLevelCache cache, ISqlConnections sqlConnections)
        {
            Cache = cache ?? throw new ArgumentNullException(nameof(cache));
            SqlConnections = sqlConnections ?? throw new ArgumentNullException(nameof(sqlConnections));
        }

        public ITwoLevelCache Cache { get; }
        public ISqlConnections SqlConnections { get; }

        public override void Decorate()
        {
            if (Value is not IEnumerable<int> idList || !idList.Any())
            {
                Value = "";
                return;
            }

            var byId = Cache.GetLocalStoreOnly("EmployeeListDecorator:EmployeeById", 
                TimeSpan.Zero, EmployeeRow.Fields.GenerationKey, () =>
                {
                    using var connection = SqlConnections.NewFor<EmployeeRow>();
                    var fld = EmployeeRow.Fields;
                    return connection.List<EmployeeRow>(q => q
                        .Select(fld.EmployeeID)
                        .Select(fld.FullName))
                        .ToDictionary(x => x.EmployeeID.Value);
                });

            Value = string.Join(", ", idList.Select(x =>
            {
                return byId.TryGetValue(x, out EmployeeRow e) ? e.FullName : x.ToString(CultureInfo.InvariantCulture);
            }));
        }
    }
}