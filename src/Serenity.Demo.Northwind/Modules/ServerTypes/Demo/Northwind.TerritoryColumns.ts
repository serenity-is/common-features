import { ColumnsBase } from "@serenity-is/corelib";
import { fieldsProxy } from "@serenity-is/corelib/q";
import { Column } from "@serenity-is/sleekgrid";
import { TerritoryRow } from "./Northwind.TerritoryRow";

export interface TerritoryColumns {
    TerritoryID: Column<TerritoryRow>;
    TerritoryDescription: Column<TerritoryRow>;
    RegionDescription: Column<TerritoryRow>;
}

export class TerritoryColumns extends ColumnsBase<TerritoryRow> {
    static readonly columnsKey = 'Northwind.Territory';
    static readonly Fields = fieldsProxy<TerritoryColumns>();
}