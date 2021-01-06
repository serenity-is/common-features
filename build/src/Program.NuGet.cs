using NuGet.Common;
using NuGet.Configuration;
using NuGet.Protocol;
using NuGet.Protocol.Core.Types;
using NuGet.Versioning;
using System;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;

namespace Build
{
    partial class Program
    {
        private static PackageSource GetLocalNugetFeed(bool create)
        {
            try
            {
                var settings = Settings.LoadDefaultSettings(null);
                var packageSourceProvider = new PackageSourceProvider(settings);
                var packageSources = packageSourceProvider.LoadPackageSources();
                var localFeed = packageSources.FirstOrDefault(x => x.IsLocal &&
                    LocalFeedNames.Contains(x.Name, StringComparer.OrdinalIgnoreCase));

                if (localFeed == null && create)
                {
                    var path = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
                        ".nuget", "my-packages");
                    var packageSource = new PackageSource(path, LocalFeedNames.First());
                    packageSourceProvider.AddPackageSource(packageSource);
                    localFeed = packageSource;
                }

                return localFeed;
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
            }

            return null;
        }

        private static void PushToNugetOrg(string nupkg)
        {
            if (StartProcess("dotnet", $"nuget push \"{nupkg}\"" +
                    " --source \"" + NugetOrgPushSource + "\"", Src) != 0)
            {
                Console.Error.WriteLine("Error while pushing " + Path.GetFileName(nupkg));
                Environment.Exit(1);
            }
        }

        private static void PushToLocalNugetFeed(PackageSource localFeed, string nupkg)
        {
            Directory.CreateDirectory(localFeed.Source);
            var filename = Path.ChangeExtension(Path.GetFileName(nupkg).ToLowerInvariant(), null);
            var match = Regex.Match(filename, @"(.+?)((\.[0-9]+)+)");
            if (match != null && match.Groups.Count >= 2)
            {
                var id = match.Groups[1].Value;
                var version = match.Groups[2].Value.Substring(1);
                var dir = Path.Combine(localFeed.Source, id, version);
                if (Directory.Exists(dir))
                    Directory.Delete(dir, true);

                var metadata = Path.Combine(dir, ".nupkg.metadata");

                if (StartProcess("dotnet", $"nuget push \"{nupkg}\"" +
                    " --source " + localFeed.Name, Src) != 0)
                    Console.Error.WriteLine("Error while pushing " + Path.GetFileName(nupkg) + 
                        " to local feed");
                else if (!File.Exists(metadata) && 
                    File.Exists(NugetExePath) &&
                    Environment.OSVersion.Platform == PlatformID.Win32NT)
                {
                    if (StartProcess(NugetExePath, "init . .", localFeed.Source) != 0)
                        Console.Error.WriteLine("Error while initializing " + localFeed.Source);
                    else if (File.Exists(metadata))
                        File.Delete(Path.Combine(localFeed.Source, Path.GetFileName(nupkg)));
                }
            }
        }

        private static NuGetVersion GetLatestVersionOf(string packageId)
        {
            var version = GetLatestVersionOf(NugetOrgReadSource, packageId);
            var localSource = GetLocalNugetFeed(create: false);
            if (localSource != null && Directory.Exists(localSource.Source))
            {
                var localVersion = GetLatestVersionOf(localSource.Source, packageId);
                if (localVersion != null && (version == null || localVersion > version))
                    return localVersion;
            }
            return version;
        }

        private static NuGetVersion GetLatestVersionOf(string packageSource, string packageId)
        {
            ILogger logger = NullLogger.Instance;
            CancellationToken cancellationToken = CancellationToken.None;

            var cache = new SourceCacheContext();
            var repository = Repository.Factory.GetCoreV3(packageSource);
            var resource = repository.GetResource<FindPackageByIdResource>();

            var versions = resource.GetAllVersionsAsync(packageId,
                cache,
                logger,
                cancellationToken).GetAwaiter().GetResult();

            return versions.Where(x => !x.IsPrerelease).Max(x => x);
        }
    }
}