import { PopulateLinkedDataForm } from "@/ServerTypes/Demo";
import { Decorators, EntityDialog } from "@serenity-is/corelib";
import { first, initFullHeightGridPage, isEmptyOrNull } from "@serenity-is/corelib/q";
import { OrderRow, OrderService, CustomerRow, CustomerService, OrderGrid } from "@serenity-is/demo.northwind";

export default function pageInit() {
    initFullHeightGridPage(new PopulateLinkedDataGrid($('#GridDiv')).element);
}

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

@Decorators.registerClass('Serenity.Demo.BasicSamples.PopulateLinkedDataDialog')
export class PopulateLinkedDataDialog extends EntityDialog<OrderRow, any> {

    protected getFormKey() { return PopulateLinkedDataForm.formKey; }
    protected getIdProperty() { return OrderRow.idProperty; }
    protected getLocalTextPrefix() { return OrderRow.localTextPrefix; }
    protected getNameProperty() { return OrderRow.nameProperty; }
    protected getService() { return OrderService.baseUrl; }

    protected form = new PopulateLinkedDataForm(this.idPrefix);

    constructor() {
        super();

        // "changeSelect2" is only fired when user changes the selection
        // but "change" is fired when dialog sets customer on load too
        // so we prefer "changeSelect2", as initial customer details 
        // will get populated by initial load, we don't want extra call
        this.form.CustomerID.changeSelect2(e => {
            var customerID = this.form.CustomerID.value;
            if (isEmptyOrNull(customerID)) {
                this.setCustomerDetails({});
                return;
            }

            // in northwind CustomerID is a string like "ALFKI", 
            // while its actual integer ID value is 1.
            // so we need to convert customer ID to ID.
            // you won't have to do this conversion with your tables
            var id = first(CustomerRow.getLookup().items, x => x.CustomerID == customerID).ID;

            CustomerService.Retrieve({
                EntityId: id
            }, response => {
                this.setCustomerDetails(response.Entity);
            });
        });
    }

    private setCustomerDetails(details: CustomerRow) {
        this.form.CustomerCity.value = details.City;
        this.form.CustomerContactName.value = details.ContactName;
        this.form.CustomerContactTitle.value = details.ContactTitle;
        this.form.CustomerCountry.value = details.Country;
        this.form.CustomerFax.value = details.Fax;
        this.form.CustomerPhone.value = details.Phone;
        this.form.CustomerRegion.value = details.Region;
    }

    /**
     * This dialog will have CSS class "s-PopulateLinkedDataDialog"
     * We are changing it here to "s-OrderDialog", to make it use default OrderDialog styles
     * This has no effect other than looks on populate linked data demonstration
     */
    protected getCssClass() {
        return super.getCssClass() + " s-OrderDialog s-Demo-Northwind-OrderDialog";
    }
}