using FluentMigrator;
using FluentMigrator.Builders.Create.Table;
using System.Data.Common;
using System.IO;

namespace Serenity.Extensions;

public static class MigrationUtils
{
    public static void CreateTableWithId32(
        this MigrationBase migration, string table, string idField,
        Action<ICreateTableColumnOptionOrWithColumnSyntax> addColumns, string schema = null, bool checkExists = false, bool primaryKey = true)
    {
        CreateTableWithId(migration, table, idField, addColumns, schema, 32, checkExists, primaryKey);
    }

    public static void CreateTableWithId64(
        this MigrationBase migration, string table, string idField,
        Action<ICreateTableColumnOptionOrWithColumnSyntax> addColumns, string schema = null, bool checkExists = false, bool primaryKey = true)
    {
        CreateTableWithId(migration, table, idField, addColumns, schema, 64, checkExists, primaryKey);
    }

    private static void CreateTableWithId(
        MigrationBase migration, string table, string idField,
        Action<ICreateTableColumnOptionOrWithColumnSyntax> addColumns, string schema, int size, bool checkExists = false, bool primaryKey = true)
    {
        ICreateTableColumnOptionOrWithColumnSyntax addAsType(ICreateTableColumnAsTypeSyntax col)
        {
            var result = size switch
            {
                64 => col.AsInt64(),
                16 => col.AsInt16(),
                _ => col.AsInt32()
            };

            if (primaryKey)
                return result.PrimaryKey();

            return result;
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
                        .Identity().NotNullable());

        addColumns(
            addAsType(
                addSchema(migration.IfDatabase("Oracle")
                    .Create.Table(table))
                        .WithColumn(idField))
                        .NotNullable());

        AddOracleIdentity(migration, table, idField);
    }

    public static readonly string[] AllExceptOracle =
    [
        "SqlServer",
        "SqlServer2000",
        "SqlServerCe",
        "Postgres",
        "MySql",
        "Firebird",
        "Jet",
        "Sqlite",
        "SAP HANA"
    ];

    public static void AddOracleIdentity(MigrationBase migration,
        string table, string id)
    {
        ArgumentNullException.ThrowIfNull(table);

        ArgumentNullException.ThrowIfNull(migration);

        var seq = table.Replace(" ", "_", StringComparison.Ordinal)
            .Replace("\"", "", StringComparison.Ordinal);
        seq = seq[..Math.Min(20, seq.Length)];
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

    public static void EnsureDatabase(string databaseKey, string contentRoot, ISqlConnections sqlConnections)
    {
        var cs = sqlConnections.TryGetConnectionString(databaseKey)
            ?? throw new ArgumentNullException(nameof(databaseKey));
        var serverType = cs.Dialect.ServerType;
        bool isSql = serverType.StartsWith("SqlServer", StringComparison.OrdinalIgnoreCase);
        bool isPostgres = serverType.StartsWith("Postgres", StringComparison.OrdinalIgnoreCase);
        bool isMySql = serverType.StartsWith("MySql", StringComparison.OrdinalIgnoreCase);
        bool isSqlite = serverType.StartsWith("Sqlite", StringComparison.OrdinalIgnoreCase);
        bool isFirebird = serverType.StartsWith("Firebird", StringComparison.OrdinalIgnoreCase);

        if (isSqlite)
        {
            Directory.CreateDirectory(Path.Combine(contentRoot, "App_Data"));
            return;
        }

        var cb = DbProviderFactories.GetFactory(cs.ProviderName).CreateConnectionStringBuilder();
        cb.ConnectionString = cs.ConnectionString;

        if (isFirebird)
        {
            if (cb.ConnectionString.IndexOf(@"localhost", StringComparison.Ordinal) < 0 &&
                cb.ConnectionString.IndexOf(@"127.0.0.1", StringComparison.Ordinal) < 0)
                return;

            var database = cb["Database"] as string;
            if (string.IsNullOrEmpty(database))
                return;

            database = Path.GetFullPath(database);
            if (File.Exists(database))
                return;
            Directory.CreateDirectory(Path.GetDirectoryName(database));

            using var fbConnection = sqlConnections.New(cb.ConnectionString,
                cs.ProviderName, cs.Dialect);
            ((WrappedConnection)fbConnection).ActualConnection.GetType()
                .GetMethod("CreateDatabase", new Type[] { typeof(string), typeof(bool) })
                .Invoke(null, new object[] { fbConnection.ConnectionString, false });

            return;
        }

        if (!isSql && !isPostgres && !isMySql)
            return;

        string catalogKey = "?";

        foreach (var ck in new[] { "Initial Catalog", "Database", "AttachDBFilename" })
            if (cb.ContainsKey(ck))
            {
                catalogKey = ck;
                break;
            }

        var catalog = cb[catalogKey] as string;
        cb[catalogKey] = isPostgres ? "postgres" : null;

        using var serverConnection = sqlConnections.New(cb.ConnectionString,
            cs.ProviderName, cs.Dialect);
        serverConnection.Open();

        string databasesQuery = "SELECT * FROM sys.databases WHERE NAME = @name";
        string createDatabaseQuery = @"CREATE DATABASE [{0}]";

        if (isPostgres)
        {
            databasesQuery = "select datname from postgres.pg_catalog.pg_database where datname = @name";
            createDatabaseQuery = "CREATE DATABASE \"{0}\"";
        }
        else if (isMySql)
        {
            databasesQuery = "SELECT * FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = @name";
            createDatabaseQuery = "CREATE DATABASE `{0}`";
        }

        if (serverConnection.Query(databasesQuery, new { name = catalog }).Any())
            return;

        var isLocalServer = isSql && (
            serverConnection.ConnectionString.Contains(@"(localdb)\", StringComparison.OrdinalIgnoreCase) ||
            serverConnection.ConnectionString.Contains(@".\", StringComparison.OrdinalIgnoreCase) ||
            serverConnection.ConnectionString.Contains(@"localhost", StringComparison.OrdinalIgnoreCase) ||
            serverConnection.ConnectionString.Contains(@"127.0.0.1", StringComparison.OrdinalIgnoreCase));

        string command;
        if (isLocalServer)
        {
            string baseDirectory = contentRoot;

            var filename = Path.Combine(Path.Combine(baseDirectory, "App_Data"), catalog);
            Directory.CreateDirectory(Path.GetDirectoryName(filename));

            command = string.Format(CultureInfo.InvariantCulture, @"CREATE DATABASE [{0}] ON PRIMARY (Name = N'{0}', FILENAME = '{1}.mdf') " +
                "LOG ON (NAME = N'{0}_log', FILENAME = '{1}.ldf')",
                catalog, filename);

            if (File.Exists(filename + ".mdf"))
                command += " FOR ATTACH";
        }
        else
        {
            command = string.Format(CultureInfo.InvariantCulture, createDatabaseQuery, catalog);
        }

        serverConnection.Execute(command);
    }
}
