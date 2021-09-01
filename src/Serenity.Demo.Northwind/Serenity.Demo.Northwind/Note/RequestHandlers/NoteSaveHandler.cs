using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<Serenity.Demo.Northwind.NoteRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = Serenity.Demo.Northwind.NoteRow;

namespace Serenity.Demo.Northwind
{
    public interface INoteSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

    public class NoteSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, INoteSaveHandler
    {
        public NoteSaveHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}