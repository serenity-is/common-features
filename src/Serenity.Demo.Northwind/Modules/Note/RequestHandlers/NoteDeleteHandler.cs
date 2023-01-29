using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = Serenity.Demo.Northwind.NoteRow;

namespace Serenity.Demo.Northwind;

public interface INoteDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class NoteDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, INoteDeleteHandler
{
    public NoteDeleteHandler(IRequestContext context)
         : base(context)
    {
    }
}