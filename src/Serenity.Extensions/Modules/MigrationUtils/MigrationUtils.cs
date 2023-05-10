using FluentMigrator;
using FluentMigrator.Builders.Create.Table;

namespace Serenity.Extensions;

public static class MigrationUtils
{
    public static void CreateTableWithId32(
        this MigrationBase migration, string table, string idField,
        Action<ICreateTableColumnOptionOrWithColumnSyntax> addColumns, string schema = null, bool checkExists = false)
    {
        CreateTableWithId(migration, table, idField, addColumns, schema, 32, checkExists);
    }

    public static void CreateTableWithId64(
        this MigrationBase migration, string table, string idField,
        Action<ICreateTableColumnOptionOrWithColumnSyntax> addColumns, string schema = null, bool checkExists = false)
    {
        CreateTableWithId(migration, table, idField, addColumns, schema, 64, checkExists);
    }

    private static void CreateTableWithId(
        MigrationBase migration, string table, string idField,
        Action<ICreateTableColumnOptionOrWithColumnSyntax> addColumns, string schema, int size, bool checkExists = false)
    {
        ICreateTableColumnOptionOrWithColumnSyntax addAsType(ICreateTableColumnAsTypeSyntax col)
        {
            if (size == 64)
                return col.AsInt64();
            else if (size == 16)
                return col.AsInt16();
            else
                return col.AsInt32();
        }

        ICreateTableWithColumnSyntax addSchema(ICreateTableWithColumnOrSchemaOrDescriptionSyntax syntax)
        {
            if (schema != null)
                return syntax.InSchema(schema);
            else
                return syntax;
        }

        if (checkExists)
        {
            if (schema != null && migration.Schema.Schema(schema).Table(table).Exists())
                return;

            if (schema == null && migration.Schema.Table(table).Exists())
                return;
        }

        addColumns(
            addAsType(
                addSchema(migration.IfDatabase(MigrationUtils.AllExceptOracle)
                    .Create.Table(table))
                        .WithColumn(idField))
                        .Identity().PrimaryKey().NotNullable());

        addColumns(
            addAsType(
                addSchema(migration.IfDatabase("Oracle")
                    .Create.Table(table))
                        .WithColumn(idField))
                        .PrimaryKey().NotNullable());

        AddOracleIdentity(migration, table, idField);
    }

    public static readonly string[] AllExceptOracle =
    {
        "SqlServer",
        "SqlServer2000",
        "SqlServerCe",
        "Postgres",
        "MySql",
        "Firebird",
        "Jet",
        "Sqlite",
        "SAP HANA"
    };

    public static void AddOracleIdentity(MigrationBase migration,
        string table, string id)
    {
        if (table == null)
            throw new ArgumentNullException(nameof(table));

        if (migration == null)
            throw new ArgumentNullException(nameof(migration));

        var seq = table.Replace(" ", "_", StringComparison.Ordinal)
            .Replace("\"", "", StringComparison.Ordinal);
        seq = seq.Substring(0, Math.Min(20, seq.Length));
        seq += "_SEQ";

        migration.IfDatabase("Oracle")
            .Execute.Sql("CREATE SEQUENCE " + seq);

        migration.IfDatabase("Oracle")
            .Execute.Sql(string.Format(CultureInfo.InvariantCulture, @"
CREATE OR REPLACE TRIGGER {2}_TRG
BEFORE INSERT ON {0}
FOR EACH ROW
BEGIN
	IF :new.{1} IS NULL THEN
		SELECT {2}.nextval INTO :new.{1} FROM DUAL;
	END IF;
END;", table, id, seq));

        migration.IfDatabase("Oracle")
            .Execute.Sql(@"ALTER TRIGGER " + seq + "_TRG ENABLE");
    }
}
