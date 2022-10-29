import { StringEditor, LookupEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface TerritoryForm {
    TerritoryID: StringEditor;
    TerritoryDescription: StringEditor;
    RegionID: LookupEditor;
}

export class TerritoryForm extends PrefixedContext {
    static formKey = 'Northwind.Territory';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!TerritoryForm.init)  {
            TerritoryForm.init = true;

            var w0 = StringEditor;
            var w1 = LookupEditor;

            initFormType(TerritoryForm, [
                'TerritoryID', w0,
                'TerritoryDescription', w0,
                'RegionID', w1
            ]);
        }
    }
}
