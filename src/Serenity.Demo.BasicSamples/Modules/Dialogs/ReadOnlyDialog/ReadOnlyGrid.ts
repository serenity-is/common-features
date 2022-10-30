import { Decorators, ToolButton } from "@serenity-is/corelib";
import { indexOf } from "@serenity-is/corelib/q";
import { SupplierGrid } from "@serenity-is/demo.northwind";
import { ReadOnlyDialog } from "./ReadOnlyDialog";

/**
 * A readonly grid that launches ReadOnlyDialog
 */
@Decorators.registerClass('Serenity.Demo.BasicSamples.ReadOnlyGrid')
export class ReadOnlyGrid extends SupplierGrid {

    protected getDialogType() { return ReadOnlyDialog; }

    constructor(container: JQuery) {
        super(container);
    }

    /**
     * Removing add button from grid using its css class
     */
    protected getButtons(): ToolButton[] {
        var buttons = super.getButtons();
        buttons.splice(indexOf(buttons, x => x.cssClass == "add-button"), 1);
        return buttons;
    }
}