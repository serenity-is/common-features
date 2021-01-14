namespace Serenity.Demo.BasicSamples {
    export interface ChangingLookupTextForm {
        ProductID: ChangingLookupTextEditor;
        UnitPrice: DecimalEditor;
        Quantity: IntegerEditor;
        Discount: DecimalEditor;
    }

    export class ChangingLookupTextForm extends Serenity.PrefixedContext {
        static formKey = 'BasicSamples.ChangingLookupText';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!ChangingLookupTextForm.init)  {
                ChangingLookupTextForm.init = true;

                var s = Serenity;
                var w0 = ChangingLookupTextEditor;
                var w1 = DecimalEditor;
                var w2 = IntegerEditor;

                Q.initFormType(ChangingLookupTextForm, [
                    'ProductID', w0,
                    'UnitPrice', w1,
                    'Quantity', w2,
                    'Discount', w1
                ]);
            }
        }
    }
}
