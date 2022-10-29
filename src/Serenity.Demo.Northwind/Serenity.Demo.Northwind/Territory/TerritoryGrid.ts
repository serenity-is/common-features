import { Decorators, EntityGrid } from "@serenity-is/corelib";
import { TerritoryColumns, TerritoryRow, TerritoryService } from "../ServerTypes/Demo";
import { TerritoryDialog } from "./TerritoryDialog";

@Decorators.registerClass('Serenity.Demo.Northwind.TerritoryGrid')
export class TerritoryGrid extends EntityGrid<TerritoryRow, any> {
    protected getColumnsKey() { return TerritoryColumns.columnsKey; }
    protected getDialogType() { return <any>TerritoryDialog; }
    protected getIdProperty() { return TerritoryRow.idProperty; }
    protected getLocalTextPrefix() { return TerritoryRow.localTextPrefix; }
    protected getService() { return TerritoryService.baseUrl; }
}
