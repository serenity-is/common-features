using System.IO;
using System.Linq;
using System.Xml.Linq;

namespace Build
{
    partial class Program
    {
        static void PatchPackageBuildProps()
        {
            var serVersion = GetLatestVersionOf(SerenityNetWebPackage);

            SerenityVersion = serVersion?.ToString();
            if (SerenityVersion == null)
                return;

            var xe = XElement.Parse(File.ReadAllText(PackageBuildProps));
            
            var xeSerenityVer = xe.Descendants("SerenityVersion").FirstOrDefault();
            var changed = false;
            if (xeSerenityVer != null && xeSerenityVer.Value != SerenityVersion.ToString())
            {
                xeSerenityVer.SetValue(SerenityVersion.ToString());
                changed = true;
            }

            var xeVersion = xe.Descendants("Version").FirstOrDefault();
            if (xeVersion != null)
            {
                var value = (xeVersion.Value ?? "").Trim();
                if (value != SerenityVersion)
                {
                    changed = true;
                    if (value.Length > 0)
                    {
                        var projVersion = NuGet.Versioning.NuGetVersion.Parse(value);
                        if (projVersion < serVersion)
                            xeVersion.Value = serVersion.ToString();
                        else if (projVersion.Major == serVersion.Major &&
                            projVersion.Minor == serVersion.Minor &&
                            projVersion.Patch == serVersion.Patch)
                        {
                            xeVersion.Value = new NuGet.Versioning.NuGetVersion(projVersion.Major,
                                projVersion.Minor, projVersion.Patch, projVersion.Revision + 1).ToString();
                        }
                        else
                            xeVersion.Value = serVersion.ToString();
                    }
                    else
                        xeVersion.Value = serVersion.ToString();
                }
                else
                {
                    xeVersion.Value = new NuGet.Versioning.NuGetVersion(serVersion.Major,
                        serVersion.Minor, serVersion.Patch, 1).ToString();
                    changed = true;
                }
            }

            if (changed)
                File.WriteAllText(PackageBuildProps, xe.ToString(SaveOptions.OmitDuplicateNamespaces));
        }

        static void PatchDirectoryBuildProps()
        {
            var xe = XElement.Parse(File.ReadAllText(DirectoryBuildProps));

            var xeSerenityVer = xe.Descendants("SerenityVersion").FirstOrDefault();
            var changed = false;
            if (xeSerenityVer != null && xeSerenityVer.Value != SerenityVersion.ToString())
            {
                xeSerenityVer.SetValue(SerenityVersion.ToString());
                changed = true;
            }

            if (changed)
                File.WriteAllText(DirectoryBuildProps, xe.ToString(SaveOptions.OmitDuplicateNamespaces));
        }
    }
}