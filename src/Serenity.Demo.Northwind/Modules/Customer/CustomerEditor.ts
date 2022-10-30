import { Decorators, LookupEditorBase, LookupEditorOptions } from "@serenity-is/corelib";
import { CustomerRow } from "../ServerTypes/Demo";

@Decorators.registerEditor('Serenity.Demo.Northwind.CustomerEditor')
export class CustomerEditor extends LookupEditorBase<LookupEditorOptions, CustomerRow> {

    constructor(hidden: JQuery, options: LookupEditorOptions) {
        super(hidden, options);
    }

    protected getLookupKey() {
        return 'Northwind.Customer';
    }

    protected getItemText(item, lookup) {
        return super.getItemText(item, lookup) + ' [' + item.CustomerID + ']';
    }
}
