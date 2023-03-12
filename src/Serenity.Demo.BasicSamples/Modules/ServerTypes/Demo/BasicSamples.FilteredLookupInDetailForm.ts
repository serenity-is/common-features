import { CustomerEditor } from "@serenity-is/demo.northwind";
import { DateEditor, LookupEditor, PrefixedContext } from "@serenity-is/corelib";
import { FilteredLookupDetailEditor } from "@/Editors/FilteredLookupInDetail/FilteredLookupInDetailPage";
import { initFormType } from "@serenity-is/corelib/q";

export interface FilteredLookupInDetailForm {
    CustomerID: CustomerEditor;
    OrderDate: DateEditor;
    CategoryID: LookupEditor;
    DetailList: FilteredLookupDetailEditor;
}

export class FilteredLookupInDetailForm extends PrefixedContext {
    static formKey = 'BasicSamples.FilteredLookupInDetail';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!FilteredLookupInDetailForm.init)  {
            FilteredLookupInDetailForm.init = true;

            var w0 = CustomerEditor;
            var w1 = DateEditor;
            var w2 = LookupEditor;
            var w3 = FilteredLookupDetailEditor;

            initFormType(FilteredLookupInDetailForm, [
                'CustomerID', w0,
                'OrderDate', w1,
                'CategoryID', w2,
                'DetailList', w3
            ]);
        }
    }
}