import { Criteria, Decorators, EntityGrid, ListRequest } from "@serenity-is/corelib";
import { ProductRow, ProductColumns, ProductDialog, ProductService } from "@serenity-is/demo.northwind";

@Decorators.registerClass('Serenity.Demo.BasicSamples.GridFilteredByCriteria')
export class GridFilteredByCriteria extends EntityGrid<ProductRow, any> {

    protected getColumnsKey() { return ProductColumns.columnsKey; }
    protected getDialogType() { return ProductDialog; }
    protected getIdProperty() { return ProductRow.idProperty; }
    protected getLocalTextPrefix() { return ProductRow.localTextPrefix; }
    protected getService() { return ProductService.baseUrl; }

    protected onViewSubmit() {
        // only continue if base class returns true (didn't cancel request)
        if (!super.onViewSubmit()) {
            return false;
        }

        // view object is the data source for grid (SlickRemoteView)
        // this is an EntityGrid so its Params object is a ListRequest
        var request = this.view.params as ListRequest;

        // list request has a Criteria parameter
        // we AND criteria here to existing one because 
        // otherwise we might clear filter set by 
        // an edit filter dialog if any.

        request.Criteria = Criteria.and(request.Criteria,
            [['UnitsInStock'], '>', 10],
            [['CategoryName'], '!=', 'Condiments'],
            [['Discontinued'], '=', 0]);

        // TypeScript doesn't support operator overloading
        // so we had to use array syntax above to build criteria.

        // Make sure you write
        // [['Field'], '>', 10] (which means field A is greater than 10)
        // not 
        // ['A', '>', 10] (which means string 'A' is greater than 10

        return true;
    }
}