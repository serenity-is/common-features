using System.IO;

namespace Build
{
    partial class Program
    {
        static void Push()
        {
            Pack();

            foreach (var nupkg in Directory.GetFiles(PackageOutDir, "*.nupkg"))
                PushToNugetOrg(nupkg);
        }
    }
}