import { Decorators, EntityGrid } from "@serenity-is/corelib";
import { SupplierColumns, SupplierRow, SupplierService } from "../ServerTypes/Demo";
import { SupplierDialog } from "./SupplierDialog";

@Decorators.registerClass('Serenity.Demo.Northwind.SupplierGrid')
export class SupplierGrid extends EntityGrid<SupplierRow, any> {
    protected getColumnsKey() { return SupplierColumns.columnsKey; }
    protected getDialogType() { return <any>SupplierDialog; }
    protected getRowDefinition() { return SupplierRow; }
    protected getService() { return SupplierService.baseUrl; }
}
