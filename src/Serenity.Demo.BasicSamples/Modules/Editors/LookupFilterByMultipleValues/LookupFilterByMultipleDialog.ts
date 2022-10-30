import { LookupFilterByMultipleForm } from "@/ServerTypes/Demo";
import { Decorators } from "@serenity-is/corelib";
import { ProductDialog } from "@serenity-is/demo.northwind";

/**
 * This is our custom product dialog that uses a different product form
 * (LookupFilterByMultipleForm) with our special category editor.
 */
@Decorators.registerClass('Serenity.Demo.BasicSamples.LookupFilterByMultipleDialog')
export class LookupFilterByMultipleDialog extends ProductDialog {

    protected getFormKey() { return LookupFilterByMultipleForm.formKey; }
}