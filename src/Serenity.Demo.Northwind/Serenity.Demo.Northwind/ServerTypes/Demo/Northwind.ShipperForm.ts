import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { PhoneEditor } from "@/Shared/PhoneEditor";
import { initFormType } from "@serenity-is/corelib/q";

export interface ShipperForm {
    CompanyName: StringEditor;
    Phone: PhoneEditor;
}

export class ShipperForm extends PrefixedContext {
    static formKey = 'Northwind.Shipper';
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
