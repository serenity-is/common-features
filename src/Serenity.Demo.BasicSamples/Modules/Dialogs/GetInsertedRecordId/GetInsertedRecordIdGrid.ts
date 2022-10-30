import { Decorators } from "@serenity-is/corelib";
import { CategoryGrid } from "@serenity-is/demo.northwind";
import { GetInsertedRecordIdDialog } from "./GetInsertedRecordIdDialog";

/**
 * Subclass of CategoryGrid to override dialog type to GetInsertedRecordIdDialog
 */
@Decorators.registerClass('Serenity.Demo.BasicSamples.GetInsertedRecordIdGrid')
export class GetInsertedRecordIdGrid extends CategoryGrid {

    protected getDialogType() { return GetInsertedRecordIdDialog; }

    constructor(container: JQuery) {
        super(container);
    }
}