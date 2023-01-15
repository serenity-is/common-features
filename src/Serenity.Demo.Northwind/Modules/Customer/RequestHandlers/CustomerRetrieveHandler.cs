using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<Serenity.Demo.Northwind.CustomerRow>;
using MyRow = Serenity.Demo.Northwind.CustomerRow;

namespace Serenity.Demo.Northwind
{
    public interface ICustomerRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

    public class CustomerRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, ICustomerRetrieveHandler
    {
        public CustomerRetrieveHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}