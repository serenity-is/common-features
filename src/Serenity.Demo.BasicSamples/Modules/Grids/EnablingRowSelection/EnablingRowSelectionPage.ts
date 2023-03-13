import { Decorators } from "@serenity-is/corelib";
import { initFullHeightGridPage } from "@serenity-is/corelib/q";
import { SupplierRow, SupplierColumns, SupplierDialog, SupplierService } from "@serenity-is/demo.northwind";
import { SelectableEntityGrid } from "@serenity-is/extensions";

export default function pageInit() {
    initFullHeightGridPage(new RowSelectionGrid($('#GridDiv')).element);
}

@Decorators.registerClass('Serenity.Demo.BasicSamples.RowSelectionGrid')
export class RowSelectionGrid extends SelectableEntityGrid<SupplierRow, any> {
    protected getColumnsKey() { return SupplierColumns.columnsKey; }
    protected getDialogType() { return <any>SupplierDialog; }
    protected getIdProperty() { return SupplierRow.idProperty; }
    protected getLocalTextPrefix() { return SupplierRow.localTextPrefix; }
    protected getService() { return SupplierService.baseUrl; }
}