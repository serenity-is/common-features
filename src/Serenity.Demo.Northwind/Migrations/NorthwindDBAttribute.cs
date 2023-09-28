namespace Serenity.Demo.Northwind.Migrations;

public class NorthwindDBAttribute : FluentMigrator.TagsAttribute
{
    public NorthwindDBAttribute()
        : base("NorthwindDB")
    {
    }
}
