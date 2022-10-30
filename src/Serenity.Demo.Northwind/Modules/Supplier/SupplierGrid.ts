import { Decorators, EntityGrid } from "@serenity-is/corelib";
import { SupplierColumns, SupplierRow, SupplierService } from "../ServerTypes/Demo";
import { SupplierDialog } from "./SupplierDialog";

@Decorators.registerClass('Serenity.Demo.Northwind.SupplierGrid')
export class SupplierGrid extends EntityGrid<SupplierRow, any> {
    protected getColumnsKey() { return SupplierColumns.columnsKey; }
    protected getDialogType() { return <any>SupplierDialog; }
    protected getIdProperty() { return SupplierRow.idProperty; }
    protected getLocalTextPrefix() { return SupplierRow.localTextPrefix; }
    protected getService() { return SupplierService.baseUrl; }
}
