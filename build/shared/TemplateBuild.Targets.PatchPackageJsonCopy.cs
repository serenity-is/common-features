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
            devDependencies["@serenity-is/tsbuild"] = GetLatestNpmPackageVersion("@serenity-is/tsbuild");
            dependencies["@serenity-is/sleekgrid"] = GetLatestNpmPackageVersion("@serenity-is/sleekgrid");
            File.WriteAllText(PackageJsonFile, root.ToString().Replace("\r", ""));

            dependencies["@serenity-is/corelib"] = GetLatestNpmPackageVersion("@serenity-is/corelib");
            content = root.ToString().Replace("\r", "");
            File.WriteAllText(PackageJsonCopy, content);

            if (File.Exists(PackageJsonCopyLock))
                File.Delete(PackageJsonCopyLock);

            if (StartProcess("cmd", "/c npm i --ignore-scripts", PackagePatchFolder) != 0)
            {
                Console.Error.WriteLine("Error while npm install at " + PackagePatchFolder);
                Environment.Exit(1);
            }

            Directory.Delete(Path.Combine(PackagePatchFolder, "node_modules"), recursive: true);
        }
    }
}
#endif