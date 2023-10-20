import { ColumnsBase } from "@serenity-is/corelib";
import { fieldsProxy } from "@serenity-is/corelib/q";
import { Column } from "@serenity-is/sleekgrid";
import { RegionRow } from "./Northwind.RegionRow";

export interface RegionColumns {
    RegionID: Column<RegionRow>;
    RegionDescription: Column<RegionRow>;
}

export class RegionColumns extends ColumnsBase<RegionRow> {
    static readonly columnsKey = 'Northwind.Region';
    static readonly Fields = fieldsProxy<RegionColumns>();
}