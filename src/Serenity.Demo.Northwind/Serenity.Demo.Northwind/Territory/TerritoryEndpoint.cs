using Serenity.Data;
using Serenity.Services;
using System.Data;
using Microsoft.AspNetCore.Mvc;
using MyRepository = Serenity.Demo.Northwind.Repositories.TerritoryRepository;
using MyRow = Serenity.Demo.Northwind.Entities.TerritoryRow;

namespace Serenity.Demo.Northwind.Endpoints
{
    [Route("Services/Serenity.Demo.Northwind/Territory/[action]")]
    [ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
    public class TerritoryController : ServiceEndpoint
    {
        protected ISqlExceptionHumanizer SqlExceptionHumanizer { get; }

        public TerritoryController(ISqlExceptionHumanizer sqlExceptionHumanizer = null)
        {
            SqlExceptionHumanizer = sqlExceptionHumanizer;
        }

        protected MyRepository NewRepository()
        {
            return new MyRepository(Context, SqlExceptionHumanizer);
        }

        [HttpPost, AuthorizeCreate(typeof(MyRow))]
        public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request)
        {
            return NewRepository().Create(uow, request);
        }

        [HttpPost, AuthorizeUpdate(typeof(MyRow))]
        public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request)
        {
            return NewRepository().Update(uow, request);
        }

        [HttpPost, AuthorizeDelete(typeof(MyRow))]
        public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request)
        {
            return NewRepository().Delete(uow, request);
        }

        public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request)
        {
            return NewRepository().Retrieve(connection, request);
        }

        public ListResponse<MyRow> List(IDbConnection connection, ListRequest request)
        {
            return NewRepository().List(connection, request);
        }
    }
}
