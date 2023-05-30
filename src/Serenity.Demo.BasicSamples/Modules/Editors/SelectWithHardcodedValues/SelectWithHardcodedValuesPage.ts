import { HardcodedValuesForm } from "@/ServerTypes/Demo";
import { Decorators, PropertyDialog, Select2Editor, Widget } from "@serenity-is/corelib";
import { notifySuccess } from "@serenity-is/corelib/q";

export default function pageInit() {
    var dlg = new HardcodedValuesDialog();
    dlg.dialogOpen();
    dlg.element.find('.field.SomeValue .editor').select2('open');

    // let's also create it in our page, for demonstration purposes
    // this time we use Serenity.Widget.create helper
    Widget.create({
        type: HardcodedValuesEditor,
        element: function (e) { e.insertAfter('#UsingWidgetCreate label') }
    });

    // here we directly create it on a hidden input element
    // for this to work, we should be aware of what kind of 
    // element our editor widget expects
    new HardcodedValuesEditor($('#CreatingOnInput input'));
}

/**
 * Our select editor with hardcoded values.
 * 
 * When you define a new editor type, make sure you build
 * and transform templates for it to be available 
 * in server side forms, e.g. [HardCodedValuesEditor]
 */
@Decorators.registerEditor('Serenity.Demo.BasicSamples.HardcodedValuesEditor')
export class HardcodedValuesEditor extends Select2Editor<any, any> {

    constructor(container: JQuery) {
        super(container, null);

        // add option accepts a key (id) value and display text value
        this.addOption("key1", "Text 1");
        this.addOption("key2", "Text 2");

        // you may also use addItem which accepts a Select2Item parameter
        this.addItem({
            id: "key3",
            text: "Text 3"
        });

        // don't let selecting this one (disabled)
        this.addItem({
            id: "key4",
            text: "Text 4",
            disabled: true
        });
    }
}

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

    protected getDialogOptions() {
        var opt = super.getDialogOptions();
        opt.modal = false;
        return;
    }
}