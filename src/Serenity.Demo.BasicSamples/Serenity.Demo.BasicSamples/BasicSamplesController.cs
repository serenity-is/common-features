using Serenity.Web;
using Microsoft.AspNetCore.Mvc;

namespace Serenity.Demo.BasicSamples
{
    [PageAuthorize, Route("BasicSamples/[action]")]
    public partial class BasicSamplesController : Controller
    {
    }
}
