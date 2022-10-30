import { Decorators } from "@serenity-is/corelib";
import { OrderGrid } from "@serenity-is/demo.northwind";
import { FilteredLookupInDetailDialog } from "./FilteredLookupInDetailDialog";

/**
 * Subclass of OrderGrid to override dialog type to FilteredLookupInDetailDialog
 */
@Decorators.registerClass('Serenity.Demo.BasicSamples.FilteredLookupInDetailGrid')
export class FilteredLookupInDetailGrid extends OrderGrid {

    protected getDialogType() { return FilteredLookupInDetailDialog; }

    constructor(container: JQuery) {
        super(container);
    }
}