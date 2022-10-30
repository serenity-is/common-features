import { Decorators } from "@serenity-is/corelib";
import { OrderGrid } from "@serenity-is/demo.northwind";
import { OtherFormOneBarDialog } from "./OtherFormOneBarDialog";

/**
 * Subclass of OrderGrid to override dialog type to OtherFormInTabOneBarDialog
 */
@Decorators.registerClass('Serenity.Demo.BasicSamples.OtherFormInTabOneBarGrid')
export class OtherFormInTabOneBarGrid extends OrderGrid {

    protected getDialogType() { return OtherFormOneBarDialog; }

    constructor(container: JQuery) {
        super(container);
    }
}