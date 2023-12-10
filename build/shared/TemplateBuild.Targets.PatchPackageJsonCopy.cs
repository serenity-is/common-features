#if IsTemplateBuild
using Newtonsoft.Json.Linq;
using System;
using System.IO;

namespace Build;

public static partial class Shared
{
    public static partial class Targets
    {
        public static void PatchPackageJsonCopy()
        {
            Directory.CreateDirectory(PackagePatchFolder);

            var content = File.ReadAllText(PackageJsonFile);
            var root = JObject.Parse(content);
            var dependencies = (JObject)root["dependencies"];
            var devDependencies = (JObject)root["devDependencies"];

            static string patchVersion(string package, string dependency = null)
            {
                var json = JObject.Parse(File.ReadAllText(Path.Combine(Root, "Serenity", "packages", package, "package.json")));
                return (dependency == null ? json?["version"] : json["dependencies"]?[dependency])?.Value<string>();
            }

            devDependencies["@serenity-is/tsbuild"] = IsPatch ? patchVersion("tsbuild") : 
                GetLatestNpmPackageVersion("@serenity-is/tsbuild");

            dependencies["@serenity-is/sleekgrid"] = IsPatch ? patchVersion("corelib", "@serenity-is/sleekgrid") :
                GetLatestNpmPackageVersion("@serenity-is/sleekgrid");

            File.WriteAllText(PackageJsonFile, root.ToString().Replace("\r", ""));

            dependencies["@serenity-is/corelib"] = IsPatch ? patchVersion("corelib") :
                GetLatestNpmPackageVersion("@serenity-is/corelib");

            content = root.ToString().Replace("\r", "");
            File.WriteAllText(PackageJsonCopy, content);
        }
    }
}
#endif