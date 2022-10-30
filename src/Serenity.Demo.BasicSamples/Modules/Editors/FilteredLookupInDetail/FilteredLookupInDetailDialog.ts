import { FilteredLookupInDetailForm } from "@/ServerTypes/Demo";
import { Decorators, EntityDialog } from "@serenity-is/corelib";
import { toId } from "@serenity-is/corelib/q";
import { OrderRow, OrderService } from "@serenity-is/demo.northwind";

/**
 * Basic order dialog with a category selection
 */
@Decorators.registerClass('Serenity.Demo.BasicSamples.FilteredLookupInDetailDialog')
export class FilteredLookupInDetailDialog extends EntityDialog<OrderRow, any> {

    protected getFormKey() { return FilteredLookupInDetailForm.formKey; }
    protected getIdProperty() { return OrderRow.idProperty; }
    protected getLocalTextPrefix() { return OrderRow.localTextPrefix; }
    protected getNameProperty() { return OrderRow.nameProperty; }
    protected getService() { return OrderService.baseUrl; }

    private form: FilteredLookupInDetailForm;

    constructor() {
        super();

        this.form = new FilteredLookupInDetailForm(this.idPrefix);
        this.form.CategoryID.change(e => {
            this.form.DetailList.categoryID = toId(this.form.CategoryID.value);
        });
    }
}