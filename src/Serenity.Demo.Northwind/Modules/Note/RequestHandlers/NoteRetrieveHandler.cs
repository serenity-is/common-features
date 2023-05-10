using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<Serenity.Demo.Northwind.NoteRow>;
using MyRow = Serenity.Demo.Northwind.NoteRow;

namespace Serenity.Demo.Northwind;

public interface INoteRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class NoteRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, INoteRetrieveHandler
{
    public NoteRetrieveHandler(IRequestContext context)
         : base(context)
    {
    }
}