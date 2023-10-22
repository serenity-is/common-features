using FluentMigrator;

namespace Serenity.Extensions;

public class TargetDBAttribute : TagsAttribute
{
    public TargetDBAttribute(string db)
        : base(db + "DB")
    {
    }
}