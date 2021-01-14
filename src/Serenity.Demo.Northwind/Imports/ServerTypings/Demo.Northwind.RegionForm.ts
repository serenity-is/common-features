namespace Serenity.Demo.Northwind {
    export interface RegionForm {
        RegionID: IntegerEditor;
        RegionDescription: StringEditor;
    }

    export class RegionForm extends Serenity.PrefixedContext {
        static formKey = 'Northwind.Region';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!RegionForm.init)  {
                RegionForm.init = true;

                var s = Serenity;
                var w0 = IntegerEditor;
                var w1 = StringEditor;

                Q.initFormType(RegionForm, [
                    'RegionID', w0,
                    'RegionDescription', w1
                ]);
            }
        }
    }
}
