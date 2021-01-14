namespace Serenity.Demo.Northwind {
    export interface CustomerForm {
        CustomerID: StringEditor;
        CompanyName: StringEditor;
        ContactName: StringEditor;
        ContactTitle: StringEditor;
        Representatives: LookupEditor;
        Address: StringEditor;
        Country: LookupEditor;
        City: LookupEditor;
        Region: StringEditor;
        PostalCode: StringEditor;
        Phone: StringEditor;
        Fax: StringEditor;
        NoteList: NotesEditor;
        LastContactDate: DateEditor;
        LastContactedBy: LookupEditor;
        Email: EmailEditor;
        SendBulletin: BooleanEditor;
    }

    export class CustomerForm extends Serenity.PrefixedContext {
        static formKey = 'Northwind.Customer';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!CustomerForm.init)  {
                CustomerForm.init = true;

                var s = Serenity;
                var w0 = StringEditor;
                var w1 = LookupEditor;
                var w2 = NotesEditor;
                var w3 = DateEditor;
                var w4 = EmailEditor;
                var w5 = BooleanEditor;

                Q.initFormType(CustomerForm, [
                    'CustomerID', w0,
                    'CompanyName', w0,
                    'ContactName', w0,
                    'ContactTitle', w0,
                    'Representatives', w1,
                    'Address', w0,
                    'Country', w1,
                    'City', w1,
                    'Region', w0,
                    'PostalCode', w0,
                    'Phone', w0,
                    'Fax', w0,
                    'NoteList', w2,
                    'LastContactDate', w3,
                    'LastContactedBy', w1,
                    'Email', w4,
                    'SendBulletin', w5
                ]);
            }
        }
    }
}
