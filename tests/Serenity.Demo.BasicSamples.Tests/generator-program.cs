using Serenity.Demo.Northwind;
using Serenity.PropertyGrid;
using Serenity.Reflection;
using System.IO;

namespace Serenity.Demo.BasicSamples.Tests;

static class DynamicDataGenerator
{
    public static void Run()
    {
        var collection = new ServiceCollection();
        collection.AddMemoryCache();
        collection.AddDistributedMemoryCache();
        collection.AddSingleton<IAnnotationTypeRegistry, AnnotationTypeRegistry>();
        collection.AddSingleton<IDynamicScriptManager, DynamicScriptManager>();
        collection.AddSingleton<ITypeSource>(new DefaultTypeSource([
            typeof(OrderPage).Assembly,
            typeof(BasicSamplesPage).Assembly
        ]));
        collection.AddSingleton<IPermissionService, NullPermissionService>();
        collection.AddSingleton<IPropertyItemProvider, DefaultPropertyItemProvider>();
        collection.AddSingleton<IRowTypeRegistry, DefaultRowTypeRegistry>();
        collection.AddSingleton<IRowFieldsProvider, DefaultRowFieldsProvider>();
        collection.AddSingleton<ITextLocalizer>(NullTextLocalizer.Instance);
        collection.AddSingleton<ITwoLevelCache, TwoLevelCache>();

        var services = collection.BuildServiceProvider();
        RowFieldsProvider.SetDefaultFrom(services);
        var scriptManager = services.GetRequiredService<IDynamicScriptManager>();
        var propertyProvider = services.GetRequiredService<IPropertyItemProvider>();
        var typeSource = services.GetRequiredService<ITypeSource>();
        ColumnsScriptRegistration.RegisterColumnsScripts(scriptManager, typeSource, propertyProvider, services);
        FormScriptRegistration.RegisterFormScripts(scriptManager, typeSource, propertyProvider, services);

        var testProjectRoot = Environment.CurrentDirectory;
        while (!string.IsNullOrEmpty(testProjectRoot) && Path.GetFileName(testProjectRoot) != "tests")
            testProjectRoot = Path.GetDirectoryName(testProjectRoot);
        testProjectRoot = Path.Combine(testProjectRoot, "Serenity.Demo.BasicSamples.Tests");

        var dynamicDataFolder = Path.Combine(testProjectRoot, "dynamic-data");
        Directory.CreateDirectory(dynamicDataFolder);
        foreach (var name in scriptManager.GetRegisteredScriptNames())
        {
            if (name == "ColumnsBundle" ||
                name == "FormBundle" ||
                name == "ColumnAndFormBundle" ||
                name == "RegisteredScripts")
                continue;

            var content = scriptManager.GetScriptText(name, json: true);
            if (name.StartsWith("Columns.") || name.StartsWith("Form."))
            {
                content = Newtonsoft.Json.JsonConvert.SerializeObject(
                    Newtonsoft.Json.JsonConvert.DeserializeObject<PropertyItemsData>(content),
                    Newtonsoft.Json.Formatting.Indented, JsonSettings.Tolerant);
            }
            else
            {
                content = Newtonsoft.Json.JsonConvert.SerializeObject(
                    Newtonsoft.Json.JsonConvert.DeserializeObject(content),
                    Newtonsoft.Json.Formatting.Indented);
            }
            var target = Path.Combine(dynamicDataFolder, name) + ".json";

            if (File.Exists(target))
            {
                var existing = File.ReadAllText(target);
                if (existing == content)
                    continue;
            }

            File.WriteAllText(target, content);
        }
    }
}

internal class NullPermissionService : IPermissionService
{
    public bool HasPermission(string permission)
    {
        return true;
    }
}

static class Program
{
    static void Main()
    {
        DynamicDataGenerator.Run();
    }
}