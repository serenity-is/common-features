import { Decorators } from "@serenity-is/corelib";
import { CustomerGrid } from "@serenity-is/demo.northwind";
import { SerialAutoNumberDialog } from "./SerialAutoNumberDialog";

/**
 * Subclass of CustomerGrid to override dialog type to SerialAutoNumberDialog
 */
@Decorators.registerClass('Serenity.Demo.BasicSamples.SerialAutoNumberGrid')
export class SerialAutoNumberGrid extends CustomerGrid {

    protected getDialogType() { return SerialAutoNumberDialog; }

    constructor(container: JQuery) {
        super(container);
    }
}