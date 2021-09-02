using System;
using System.IO;

namespace Build
{
    partial class Program
    {
        static void Pack()
        {
            PatchPackageBuildProps();
            PatchDirectoryBuildProps();

            CleanDirectory(PackageOutDir, true);

            if (StartProcess("dotnet", "restore", Src) != 0)
                ExitWithError("Error while restoring " + SolutionFile);

            if (StartProcess("dotnet", "pack -v minimal " +
                $"-c Release -p:ContinuousIntegrationBuild=true -o \"{PackageOutDir}\"", Src) != 0)
                ExitWithError("Error while building solution!");

            try
            {
                var localFeed = GetLocalNugetFeed(create: true);
                if (localFeed != null)
                {
                    foreach (var nupkg in Directory.GetFiles(PackageOutDir, "*.nupkg"))
                        PushToLocalNugetFeed(localFeed, nupkg);
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
            }
        }
    }
}