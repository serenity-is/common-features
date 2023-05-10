#if IsFeatureBuild
using System.IO;

namespace Build;

public static partial class Shared
{
    public static string Src => Path.Combine(Root, "src");
    public static string PackageOutDir => Path.Combine(Root, "build", ".nupkg");
    public static string NugetExePath => Path.Combine(Root, "..", "Serenity", "build", "tools", "NuGet", "NuGet.exe");
    public static string SolutionFile => Path.Combine(Src, Path.GetFileName(Root) + ".sln");
    public static string PackageBuildProps => Path.Combine(Root, "build", "Package.Build.props");
    public static string DirectoryBuildProps => Path.Combine(Src, "Directory.Build.props");
    public static string SerenityVersion { get; set; }
    public const string SerenityNetWebPackage = "Serenity.Net.Web";
}
#endif