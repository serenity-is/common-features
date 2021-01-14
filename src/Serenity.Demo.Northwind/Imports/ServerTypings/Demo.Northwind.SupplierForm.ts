namespace Serenity.Demo.Northwind {
    export interface SupplierForm {
        CompanyName: StringEditor;
        ContactName: StringEditor;
        ContactTitle: StringEditor;
        Address: StringEditor;
        Region: StringEditor;
        PostalCode: StringEditor;
        Country: StringEditor;
        City: StringEditor;
        Phone: StringEditor;
        Fax: StringEditor;
        HomePage: StringEditor;
    }

    export class SupplierForm extends Serenity.PrefixedContext {
        static formKey = 'Northwind.Supplier';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!SupplierForm.init)  {
                SupplierForm.init = true;

                var s = Serenity;
                var w0 = StringEditor;

                Q.initFormType(SupplierForm, [
                    'CompanyName', w0,
                    'ContactName', w0,
                    'ContactTitle', w0,
                    'Address', w0,
                    'Region', w0,
                    'PostalCode', w0,
                    'Country', w0,
                    'City', w0,
                    'Phone', w0,
                    'Fax', w0,
                    'HomePage', w0
                ]);
            }
        }
    }
}
