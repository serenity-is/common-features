namespace Serenity.Demo.BasicSamples {
    export interface PopulateLinkedDataForm {
        CustomerID: Demo.Northwind.CustomerEditor;
        CustomerContactName: StringEditor;
        CustomerContactTitle: StringEditor;
        CustomerCity: StringEditor;
        CustomerRegion: StringEditor;
        CustomerCountry: StringEditor;
        CustomerPhone: StringEditor;
        CustomerFax: StringEditor;
        OrderDate: DateEditor;
        RequiredDate: DateEditor;
        EmployeeID: LookupEditor;
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
                var w0 = Demo.Northwind.CustomerEditor;
                var w1 = StringEditor;
                var w2 = DateEditor;
                var w3 = LookupEditor;
                var w4 = Demo.Northwind.OrderDetailsEditor;

                Q.initFormType(PopulateLinkedDataForm, [
                    'CustomerID', w0,
                    'CustomerContactName', w1,
                    'CustomerContactTitle', w1,
                    'CustomerCity', w1,
                    'CustomerRegion', w1,
                    'CustomerCountry', w1,
                    'CustomerPhone', w1,
                    'CustomerFax', w1,
                    'OrderDate', w2,
                    'RequiredDate', w2,
                    'EmployeeID', w3,
                    'DetailList', w4
                ]);
            }
        }
    }
}
