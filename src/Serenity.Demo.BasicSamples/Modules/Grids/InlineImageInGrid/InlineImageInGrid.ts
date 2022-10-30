import { InlineImageInGridColumns } from "@/ServerTypes/Demo";
import { Decorators, EntityGrid } from "@serenity-is/corelib";
import { ProductRow, ProductDialog, ProductService } from "@serenity-is/demo.northwind";
import { GridOptions } from "@serenity-is/sleekgrid";

@Decorators.registerClass('Serenity.Demo.BasicSamples.InlineImageInGrid')
export class InlineImageInGrid extends EntityGrid<ProductRow, any> {

    protected getColumnsKey() { return InlineImageInGridColumns.columnsKey; }
    protected getDialogType() { return <any>ProductDialog; }
    protected getIdProperty() { return ProductRow.idProperty; }
    protected getLocalTextPrefix() { return ProductRow.localTextPrefix; }
    protected getService() { return ProductService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }

    protected getSlickOptions(): GridOptions {
        let opt = super.getSlickOptions();
        opt.rowHeight = 150;
        return opt;
    }
}