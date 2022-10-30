import { Decorators } from "@serenity-is/corelib";
import { OrderGrid } from "@serenity-is/demo.northwind";
import { PopulateLinkedDataDialog } from "./PopulateLinkedDataDialog";

/**
 * A subclass of OrderGrid that launches PopulateLinkedDataDialog
 */
@Decorators.registerClass('Serenity.Demo.BasicSamples.PopulateLinkedDataGrid')
export class PopulateLinkedDataGrid extends OrderGrid {

    protected getDialogType() { return PopulateLinkedDataDialog; }

    constructor(container: JQuery) {
        super(container);
    }
}