namespace Serenity.Demo.BasicSamples {
    export interface FilteredLookupInDetailForm {
        CustomerID: Demo.Northwind.CustomerEditor;
        OrderDate: DateEditor;
        CategoryID: LookupEditor;
        DetailList: FilteredLookupDetailEditor;
    }

    export class FilteredLookupInDetailForm extends Serenity.PrefixedContext {
        static formKey = 'BasicSamples.FilteredLookupInDetail';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!FilteredLookupInDetailForm.init)  {
                FilteredLookupInDetailForm.init = true;

                var s = Serenity;
                var w0 = Demo.Northwind.CustomerEditor;
                var w1 = DateEditor;
                var w2 = LookupEditor;
                var w3 = FilteredLookupDetailEditor;

                Q.initFormType(FilteredLookupInDetailForm, [
                    'CustomerID', w0,
                    'OrderDate', w1,
                    'CategoryID', w2,
                    'DetailList', w3
                ]);
            }
        }
    }
}
