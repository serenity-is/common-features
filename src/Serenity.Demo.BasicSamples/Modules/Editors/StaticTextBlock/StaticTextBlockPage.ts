import { StaticTextBlockForm } from "@/ServerTypes/Demo";
import { Decorators, PropertyDialog } from "@serenity-is/corelib";

export default function () {
    var dlg = new StaticTextBlockDialog();
    dlg.dialogOpen();
}

@Decorators.registerClass('Serenity.Demo.BasicSamples.StaticTextBlockDialog')
export class StaticTextBlockDialog extends PropertyDialog<any, any> {
    protected getFormKey() { return StaticTextBlockForm.formKey; }

    protected form = new StaticTextBlockForm(this.idPrefix);

    constructor() {
        super();

        this.dialogTitle = "A form with static text blocks";
    }

    /**
     * Here we override loadInitialEntity method to set value for "DisplayFieldValue" field.
     * If this was an EntityDialog, your field value would be originating from server side entity.
     */
    protected loadInitialEntity() {
        this.propertyGrid.load({
            DisplayFieldValue: 'This content comes from <b>the value</b> of <em>DisplayFieldValue</em> field.'
        });
    }

    protected getDialogOptions() {
        var opt = super.getDialogOptions();
        opt.width = 650;
        opt.modal = false;
        return opt;
    }
}