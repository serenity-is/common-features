using Serenity.Data;
using Serenity.Services;
using System;
using System.Data;
using MyRow = Serenity.Demo.Northwind.Entities.TerritoryRow;

namespace Serenity.Demo.Northwind.Repositories
{
    public class TerritoryRepository : BaseRepository
    {
        public TerritoryRepository(IRequestContext context,
            ISqlExceptionHumanizer sqlExceptionHumanizer = null)
             : base(context)
        {
            SqlExceptionHumanizer = sqlExceptionHumanizer;
        }

        protected ISqlExceptionHumanizer SqlExceptionHumanizer { get; }

        public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request)
        {
            return new MySaveHandler(Context).Process(uow, request, SaveRequestType.Create);
        }

        public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request)
        {
            return new MySaveHandler(Context).Process(uow, request, SaveRequestType.Update);
        }

        public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request)
        {
            return new MyDeleteHandler(Context).Process(uow, request);
        }

        public UndeleteResponse Undelete(IUnitOfWork uow, UndeleteRequest request)
        {
            return new MyUndeleteHandler(Context).Process(uow, request);
        }

        public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request)
        {
            return new MyRetrieveHandler(Context).Process(connection, request);
        }

        public ListResponse<MyRow> List(IDbConnection connection, ListRequest request)
        {
            return new MyListHandler(Context).Process(connection, request);
        }

        private class MySaveHandler : SaveRequestHandler<MyRow>
        {
            public MySaveHandler(IRequestContext context,
                ISqlExceptionHumanizer sqlExceptionHumanizer = null)
                 : base(context)
            {
                SqlExceptionHumanizer = sqlExceptionHumanizer;
            }

            protected ISqlExceptionHumanizer SqlExceptionHumanizer { get; }

            protected override void ExecuteSave()
            {
                try
                {
                    base.ExecuteSave();
                }
                catch (Exception e)
                {
                    SqlExceptionHumanizer?.Humanize(e, Row);
                    throw;
                }
            }
        }

        private class MyDeleteHandler : DeleteRequestHandler<MyRow>
        {
            public MyDeleteHandler(IRequestContext context,
                ISqlExceptionHumanizer sqlExceptionHumanizer = null)
                 : base(context)
            {
                SqlExceptionHumanizer = sqlExceptionHumanizer;
            }

            protected ISqlExceptionHumanizer SqlExceptionHumanizer { get; }

            protected override void ExecuteDelete()
            {
                try
                {
                    base.ExecuteDelete();
                }
                catch (Exception e)
                {
                    SqlExceptionHumanizer?.Humanize(e, Row);
                    throw;
                }
            }
        }

        private class MyUndeleteHandler : UndeleteRequestHandler<MyRow> 
        {
            public MyUndeleteHandler(IRequestContext context)
                : base(context)
            {
            }
        }

        private class MyRetrieveHandler : RetrieveRequestHandler<MyRow>
        {
            public MyRetrieveHandler(IRequestContext context)
                 : base(context)
            {
            }
        }

        private class MyListHandler : ListRequestHandler<MyRow>
        {
            public MyListHandler(IRequestContext context)
                 : base(context)
            {
            }
        }

    }
}