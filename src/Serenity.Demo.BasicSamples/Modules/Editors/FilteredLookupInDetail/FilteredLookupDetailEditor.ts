import { Decorators, Widget } from "@serenity-is/corelib";
import { OrderDetailsEditor } from "@serenity-is/demo.northwind";
import { FilteredLookupOrderDetailDialog } from "./FilteredLookupDetailDialog";

/**
 * Our subclass of Order Details editor with a CategoryID property
 */
@Decorators.registerEditor('Serenity.Demo.BasicSamples.FilteredLookupDetailEditor')
export class FilteredLookupDetailEditor extends OrderDetailsEditor {

    protected getDialogType() { return FilteredLookupOrderDetailDialog; }

    constructor(container: JQuery) {
        super(container);
    }

    public categoryID: number;

    /**
     * This method is called to initialize an edit dialog created by
     * grid editor when Add button or an edit link is clicked
     * We have an opportunity here to pass CategoryID to edit dialog
     */
    protected initEntityDialog(itemType: string, dialog: Widget<any>) {
        super.initEntityDialog(itemType, dialog);

        // passing category ID from grid editor to detail dialog
        (dialog as FilteredLookupOrderDetailDialog).categoryID = this.categoryID;
    }
}