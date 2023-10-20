import { PhoneEditor } from "@/Shared/PhoneEditor";
import { StringEditor, PrefixedContext, initFormType } from "@serenity-is/corelib";

export interface ShipperForm {
    CompanyName: StringEditor;
    Phone: PhoneEditor;
}

export class ShipperForm extends PrefixedContext {
    static readonly formKey = 'Northwind.Shipper';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!ShipperForm.init)  {
            ShipperForm.init = true;

            var w0 = StringEditor;
            var w1 = PhoneEditor;

            initFormType(ShipperForm, [
                'CompanyName', w0,
                'Phone', w1
            ]);
        }
    }
}