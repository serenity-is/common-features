namespace Serenity.Demo.BasicSamples {
    export interface PopulateLinkedDataForm {
        CustomerID: StringEditor;
        CustomerContactName: StringEditor;
        CustomerContactTitle: StringEditor;
        CustomerCity: StringEditor;
        CustomerRegion: StringEditor;
        CustomerCountry: StringEditor;
        CustomerPhone: StringEditor;
        CustomerFax: StringEditor;
        OrderDate: DateEditor;
        RequiredDate: DateEditor;
        EmployeeID: IntegerEditor;
        DetailList: Demo.Northwind.OrderDetailsEditor;
    }

    export class PopulateLinkedDataForm extends Serenity.PrefixedContext {
        static formKey = 'BasicSamples.PopulateLinkedData';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!PopulateLinkedDataForm.init)  {
                PopulateLinkedDataForm.init = true;

                var s = Serenity;
                var w0 = StringEditor;
                var w1 = DateEditor;
                var w2 = IntegerEditor;
                var w3 = Demo.Northwind.OrderDetailsEditor;

                Q.initFormType(PopulateLinkedDataForm, [
                    'CustomerID', w0,
                    'CustomerContactName', w0,
                    'CustomerContactTitle', w0,
                    'CustomerCity', w0,
                    'CustomerRegion', w0,
                    'CustomerCountry', w0,
                    'CustomerPhone', w0,
                    'CustomerFax', w0,
                    'OrderDate', w1,
                    'RequiredDate', w1,
                    'EmployeeID', w2,
                    'DetailList', w3
                ]);
            }
        }
    }
}
