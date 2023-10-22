using FluentMigrator;

namespace Serenity.Extensions;

public class MigrationKeyAttribute : MigrationAttributeBase
{
    public MigrationKeyAttribute(long version, TransactionBehavior transactionBehavior = TransactionBehavior.Default, string description = null)
        : base(version, transactionBehavior, description)
    {
    }
}
