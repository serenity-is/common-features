#if IsTemplateBuild
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using System.Xml.Linq;

namespace Build;

public static partial class Shared
{
    private static bool PatchPackageVersion(string packageId, string version)
    {
        var projectContent = File.ReadAllText(ProjectFile);

        var replacedContent = Regex.Replace(projectContent,
            @"(PackageReference\s*Include=\""" + packageId.Replace(".", @"\.") + 
                @"\""\s*Version\s*\=\s*\"")([0-9.]*)(\"")",
            "${1}" + version + "$3");

        if (replacedContent != projectContent)
        {
            File.WriteAllText(ProjectFile, replacedContent);
            return true;
        }

        return false;
    }

    static IEnumerable<string> SerenityPackagesWithSameVersion
    {
        get
        {
            yield return "Serenity.Scripts";
            yield return "Serenity.Net.Web";
        }
    }

    static IEnumerable<string> SerenityPackagesWithUniqueVersion
    {
        get
        {
            yield return "Serenity.Assets";
        }
    }

    static void UpdateSerenityPackages()
    {
        var serenityWebVersion = GetLatestVersionOf("Serenity.Net.Web");
        if (serenityWebVersion != null)
        {
            foreach (var package in SerenityPackagesWithSameVersion)
                PatchPackageVersion(package, serenityWebVersion.ToString());
        }

        foreach (var package in SerenityPackagesWithUniqueVersion)
        {
            var pkgVer = GetLatestVersionOf(package);
            if (pkgVer != null)
                PatchPackageVersion(package, pkgVer.ToString());
        }
    }

    static bool IsCommonPackage(string packageId)
    {
        return packageId.StartsWith("Serenity.", StringComparison.OrdinalIgnoreCase) &&
            !IsProPackage(packageId) &&
            (string.Equals(packageId, "Serenity.Extensions", StringComparison.OrdinalIgnoreCase) ||
             packageId.StartsWith("Serenity.Common", StringComparison.OrdinalIgnoreCase) ||
             packageId.StartsWith("Serenity.Demo", StringComparison.OrdinalIgnoreCase));
    }

    static void UpdateCommonAndProPackages()
    {
        var packages = ParsePackages(ProjectFile);
        foreach (var package in packages)
        {
            if (IsCommonPackage(package.Item1))
            {
                var cmnVer = GetLatestVersionOf(package.Item1);
                if (cmnVer != null)
                    PatchPackageVersion(package.Item1, cmnVer.ToString());
            }
            else if (IsProPackage(package.Item1))
            {
                var proVer = GetLatestVersionOf(package.Item1);
                if (proVer != null)
                    PatchPackageVersion(package.Item1, proVer.ToString());
            }
        }
    }

    static List<Tuple<string, string>> ParsePackages(string path)
    {
        var xml = XElement.Parse(File.ReadAllText(path));
        var pkg = new List<Tuple<string, string>>();
        foreach (var x in xml.Descendants("PackageReference"))
            pkg.Add(new Tuple<string, string>(x.Attribute("Include").Value, x.Attribute("Version").Value));
        return pkg;
    }
}
#endif