namespace Serenity.Demo.Northwind {
    export interface TerritoryForm {
        TerritoryID: StringEditor;
        TerritoryDescription: StringEditor;
        RegionID: LookupEditor;
    }

    export class TerritoryForm extends Serenity.PrefixedContext {
        static formKey = 'Northwind.Territory';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!TerritoryForm.init)  {
                TerritoryForm.init = true;

                var s = Serenity;
                var w0 = StringEditor;
                var w1 = LookupEditor;

                Q.initFormType(TerritoryForm, [
                    'TerritoryID', w0,
                    'TerritoryDescription', w0,
                    'RegionID', w1
                ]);
            }
        }
    }
}
