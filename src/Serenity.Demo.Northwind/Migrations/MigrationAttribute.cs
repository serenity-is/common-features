namespace Serenity.Demo.Northwind.Migrations;

public class MigrationAttribute : Extensions.MigrationAttributeBase
{
    public MigrationAttribute(long version) : base(version)
    {
    }
}