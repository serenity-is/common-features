import { ChangingLookupTextForm } from "@/ServerTypes/Demo";
import { Decorators } from "@serenity-is/corelib";
import { toId } from "@serenity-is/corelib/q";
import { OrderDetailRow, ProductRow } from "@serenity-is/demo.northwind";
import { GridEditorDialog } from "@serenity-is/extensions";

@Decorators.registerClass('Serenity.Demo.BasicSamples.ChangingLookupTextDialog')
export class ChangingLookupTextDialog extends GridEditorDialog<OrderDetailRow> {
    protected getFormKey() { return ChangingLookupTextForm.formKey; }
    protected getLocalTextPrefix() { return OrderDetailRow.localTextPrefix; }

    protected form: ChangingLookupTextForm;

    constructor() {
        super();

        this.form = new ChangingLookupTextForm(this.idPrefix);

        this.form.ProductID.changeSelect2(e => {
            var productID = toId(this.form.ProductID.value);
            if (productID != null) {
                this.form.UnitPrice.value = ProductRow.getLookup().itemById[productID].UnitPrice;
            }
        });

        this.form.Discount.addValidationRule(this.uniqueName, e => {
            var price = this.form.UnitPrice.value;
            var quantity = this.form.Quantity.value;
            var discount = this.form.Discount.value;
            if (price != null && quantity != null && discount != null &&
                discount > 0 && discount >= price * quantity) {
                return "Discount can't be higher than total price!";
            }
        });
    }

    protected updateInterface() {
        super.updateInterface();
        this.toolbar.findButton('apply-changes-button').hide();
        this.toolbar.findButton('save-and-close-button').hide();
    }
}