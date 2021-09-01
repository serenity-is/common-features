using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<Serenity.Demo.Northwind.NoteRow>;
using MyRow = Serenity.Demo.Northwind.NoteRow;

namespace Serenity.Demo.Northwind
{
    public interface INoteListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

    public class NoteListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, INoteListHandler
    {
        public NoteListHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}