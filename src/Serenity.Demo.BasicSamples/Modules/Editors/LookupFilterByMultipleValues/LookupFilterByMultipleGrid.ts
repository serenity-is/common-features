import { Criteria, Decorators, EntityGrid, ListRequest } from "@serenity-is/corelib";
import { ProductRow, ProductColumns, ProductService } from "@serenity-is/demo.northwind";
import { LookupFilterByMultipleDialog } from "./LookupFilterByMultipleDialog";

/**
 * Subclass of ProductGrid to override dialog type to CloneableEntityDialog
 */
@Decorators.registerClass('Serenity.Demo.BasicSamples.LookupFilterByMultipleGrid')
export class LookupFilterByMultipleGrid extends EntityGrid<ProductRow, any> {

    protected getColumnsKey() { return ProductColumns.columnsKey; }
    protected getDialogType() { return LookupFilterByMultipleDialog; }
    protected getIdProperty() { return ProductRow.idProperty; }
    protected getLocalTextPrefix() { return ProductRow.localTextPrefix; }
    protected getService() { return ProductService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }

    /**
     * This method is called just before List request is sent to service.
     * You have an opportunity here to cancel request or modify it.
     * Here we'll add a custom criteria to list request.
     */
    protected onViewSubmit() {
        if (!super.onViewSubmit()) {
            return false;
        }

        // this has no relation to our lookup editor but as we'll allow picking only 
        // categories of Produce and Seafood in product dialog, it's better to show
        // only products from these categories in grid too
        let request = this.view.params as ListRequest;
        request.Criteria = Criteria.and(request.Criteria,
            Criteria(ProductRow.Fields.CategoryName).in(['Produce', 'Seafood']));

        return true;
    }
}