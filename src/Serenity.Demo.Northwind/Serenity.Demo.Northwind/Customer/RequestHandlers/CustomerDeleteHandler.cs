using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = Serenity.Demo.Northwind.Entities.CustomerRow;

namespace Serenity.Demo.Northwind
{
    public interface ICustomerDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse>
    {
    }

    public class CustomerDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, ICustomerDeleteHandler
    {
        public CustomerDeleteHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}