import { Decorators } from "@serenity-is/corelib";
import { OrderDialog } from "@serenity-is/demo.northwind";

/**
 * A version of order dialog converted to a panel by adding Serenity.@Decorators.panel decorator.
 */
@Decorators.panel()
export class EntityDialogAsPanel extends OrderDialog {

    constructor() {
        super();
    }

    protected updateInterface() {
        super.updateInterface();

        this.deleteButton.hide();
        this.applyChangesButton.hide();
    }

    protected onSaveSuccess(response) {
        this.showSaveSuccessMessage(response);
    }
}