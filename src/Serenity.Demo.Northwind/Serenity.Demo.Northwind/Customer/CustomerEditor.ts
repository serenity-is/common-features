namespace Serenity.Demo.Northwind {

    @Serenity.Decorators.registerEditor()
    export class CustomerEditor extends Serenity.LookupEditorBase<Serenity.LookupEditorOptions, CustomerRow> {

        constructor(hidden: JQuery, options: Serenity.LookupEditorOptions) {
            super(hidden, options);
        }

        protected getLookupKey() {
            return 'Northwind.Customer';
        }

        protected getItemText(item, lookup) {
            return super.getItemText(item, lookup) + ' [' + item.CustomerID + ']';
        }
    }
}