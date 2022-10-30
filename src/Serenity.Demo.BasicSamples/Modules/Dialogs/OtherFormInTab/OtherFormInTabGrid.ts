import { Decorators } from "@serenity-is/corelib";
import { OrderGrid } from "@serenity-is/demo.northwind";
import { OtherFormInTabDialog } from "./OtherFormInTabDialog";

/**
 * Subclass of OrderGrid to override dialog type to OtherFormInTabDialog
 */
@Decorators.registerClass('Serenity.Demo.BasicSamples.OtherFormInTabGrid')
export class OtherFormInTabGrid extends OrderGrid {

    protected getDialogType() { return OtherFormInTabDialog; }

    constructor(container: JQuery) {
        super(container);
    }
}