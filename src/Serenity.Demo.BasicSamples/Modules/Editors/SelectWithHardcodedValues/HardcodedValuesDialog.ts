import { HardcodedValuesForm } from "@/ServerTypes/Demo";
import { Decorators, PropertyDialog } from "@serenity-is/corelib";
import { notifySuccess } from "@serenity-is/corelib/q";

@Decorators.registerClass('Serenity.Demo.BasicSamples.HardcodedValuesDialog')
export class HardcodedValuesDialog extends PropertyDialog<any, any> {
    protected getFormKey() { return HardcodedValuesForm.formKey; }

    protected form = new HardcodedValuesForm(this.idPrefix);

    constructor() {
        super();

        this.dialogTitle = "Please select some value";

        this.form.SomeValue.changeSelect2(e => {
            notifySuccess("You selected item with key: " + this.form.SomeValue.value);
        });
    }
}