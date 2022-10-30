import { Decorators, EntityGrid } from "@serenity-is/corelib";
import { ProductRow, ProductColumns, ProductService } from "@serenity-is/demo.northwind";
import { CloneableEntityDialog } from "./CloneableEntityDialog";

/**
 * Subclass of ProductGrid to override dialog type to CloneableEntityDialog
 */
@Decorators.registerClass('Serenity.Demo.BasicSamples.CloneableEntityGrid')
export class CloneableEntityGrid extends EntityGrid<ProductRow, any> {

    protected getColumnsKey() { return ProductColumns.columnsKey; }
    protected getDialogType() { return CloneableEntityDialog; }
    protected getIdProperty() { return ProductRow.idProperty; }
    protected getLocalTextPrefix() { return ProductRow.localTextPrefix; }
    protected getService() { return ProductService.baseUrl; }
}
