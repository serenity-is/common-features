using Serenity.Web;
using Microsoft.AspNetCore.Mvc;

namespace Serenity.Demo.BasicSamples
{
    [PageAuthorize, Route("Serenity.Demo.BasicSamples/[action]")]
    public partial class BasicSamplesController : Controller
    {
    }
}
