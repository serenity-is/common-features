using Serenity.Data;
using Serenity.Services;
using MyRequest = Serenity.Demo.Northwind.OrderListRequest;
using MyResponse = Serenity.Services.ListResponse<Serenity.Demo.Northwind.OrderRow>;
using MyRow = Serenity.Demo.Northwind.OrderRow;

namespace Serenity.Demo.Northwind
{
    public interface IOrderListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

    public class OrderListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IOrderListHandler
    {
        public OrderListHandler(IRequestContext context)
             : base(context)
        {
        }

        protected override void ApplyFilters(SqlQuery query)
        {
            base.ApplyFilters(query);

            if (Request.ProductID != null)
            {
                var od = OrderDetailRow.Fields.As("od");

                query.Where(Criteria.Exists(
                    query.SubQuery()
                        .Select("1")
                        .From(od)
                        .Where(
                            od.OrderID == MyRow.Fields.OrderID &
                            od.ProductID == Request.ProductID.Value)
                        .ToString()));
            }
        }
    }
}