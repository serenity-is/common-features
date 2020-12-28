using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml.Linq;

namespace Build
{
    partial class Program
    {
        static string Root { get; set; }
        static string Src => Path.Combine(Root, "Src");
        static string PackageOutDir => Path.Combine(Root, "build", ".nupkg");
        const string NugetOrgReadSource = "https://api.nuget.org/v3/index.json";
        const string NugetOrgPushSource = "https://www.nuget.org/api/v2/package";
        static string SolutionFile => Path.Combine(Src, "common-features.sln");
        static string DirectoryBuildProps => Path.Combine(Src, "Directory.Build.props");
        static readonly string[] LocalFeedNames = new string[]
        {
            "MyPackages",
        };
        static string SerenityVersion { get; set; }
        static readonly UTF8Encoding UTF8Bom = new UTF8Encoding(true);

        const string SerenityNetWebPackage = "Serenity.Net.Web";

        static IEnumerable<string> SerenityPackagesToUpdate
        {
            get
            {
                yield return "Serenity.Assets";
                yield return "Serenity.Scripts";
                yield return "Serenity.Net.Core";
                yield return "Serenity.Net.Data";
                yield return "Serenity.Net.Entity";
                yield return "Serenity.Net.Services";
                yield return SerenityNetWebPackage;
            }
        }

        static void Main(string[] args)
        {
            var target = args != null && args.Length > 0 ? args[0] : "pack";

            DetermineRoot();
            Clean();

            if (target == "pack")
                Pack();
            else if (target == "push")
                Push();
        }

        static List<Tuple<string, string>> ParsePackages(string path)
        {
            var xml = XElement.Parse(File.ReadAllText(path));
            var pkg = new List<Tuple<string, string>>();
            foreach (var x in xml.Descendants("PackageReference"))
                pkg.Add(new Tuple<string, string>(x.Attribute("Include").Value, x.Attribute("Version").Value));
            return pkg;
        }

        static void DetermineRoot()
        {
            Root = Environment.CurrentDirectory;

            if (new[] { "debug", "release" }.Contains(
                    Path.GetFileName(Root).ToLowerInvariant()))
                Root = Path.GetDirectoryName(Root);

            if (Path.GetFileName(Root).ToLowerInvariant() == "bin")
                Root = Path.GetDirectoryName(Root);

            if (Path.GetFileName(Root).ToLowerInvariant() == "build")
                Root = Path.GetDirectoryName(Root);
        }

        static void CleanDirectory(string path, bool ensure = false)
        {
            path = Path.Combine(Root, path);
            if (!Directory.Exists(path))
            {
                if (ensure)
                    Directory.CreateDirectory(path);
                return;
            }

            foreach (var file in Directory.GetFiles(path, "*.*", SearchOption.AllDirectories))
            {
                try
                {
                    File.Delete(file);
                }
                catch
                {
                }
            }

            foreach (var dir in Directory.GetDirectories(path, "*.*", SearchOption.AllDirectories))
            {
                try
                {
                    Directory.Delete(dir);
                }
                catch
                {
                }
            }
        }

        static void Clean()
        {
        }

        static void ExitWithError(string error, int errorCode = 1)
        {
            Console.WriteLine(error);
            Environment.Exit(1);
        }

        static int StartProcess(string name, string arguments, string workingDirectory)
        {
            var info = new ProcessStartInfo(name)
            {
                WorkingDirectory = workingDirectory
            };
            if (arguments != null)
                info.Arguments = arguments;

            var process = Process.Start(info);
            process.WaitForExit();
            var exitCode = process.ExitCode;
            return exitCode;
        }
    }
}