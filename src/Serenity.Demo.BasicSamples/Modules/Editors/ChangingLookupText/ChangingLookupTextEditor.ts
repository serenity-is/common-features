import { Decorators, LookupEditorBase, LookupEditorOptions } from "@serenity-is/corelib";
import { formatNumber, Lookup } from "@serenity-is/corelib/q";
import { ProductRow } from "@serenity-is/demo.northwind";

/**
 * Our custom product editor type
 */
@Decorators.registerEditor('Serenity.Demo.BasicSamples.ChangingLookupTextEditor')
export class ChangingLookupTextEditor extends LookupEditorBase<LookupEditorOptions, ProductRow> {

    constructor(container: JQuery, options: LookupEditorOptions) {
        super(container, options);
    }

    protected getLookupKey() {
        return ProductRow.lookupKey;
    }

    protected getItemText(item: ProductRow, lookup: Lookup<ProductRow>) {
        return super.getItemText(item, lookup) +
            ' (' +
            '$' + formatNumber(item.UnitPrice, '#,##0.00') +
            ', ' + (item.UnitsInStock > 0 ? (item.UnitsInStock + ' in stock') : 'out of stock') +
            ', ' + (item.SupplierCompanyName || 'Unknown') +
            ')';
    }
}