import { Decorators, PropertyGrid, TabsExtensions } from "@serenity-is/corelib";
import { first, getForm, initFullHeightGridPage, isEmptyOrNull, reloadLookup, SaveResponse, validateOptions } from "@serenity-is/corelib/q";
import { OrderDialog, CustomerForm, CustomerService, CustomerRow, OrderRow, OrderGrid } from "@serenity-is/demo.northwind";

export default function pageInit() {
    initFullHeightGridPage(new OtherFormInTabOneBarGrid($('#GridDiv')).element);
}

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

/**
 * Our custom order dialog subclass that will have a tab to display and edit selected customer details.
 * With single toolbar for all forms
 */
@Decorators.registerClass('Serenity.Demo.BasicSamples.OtherFormOneBarDialog')
export class OtherFormOneBarDialog extends OrderDialog {

    private customerPropertyGrid: PropertyGrid;
    private customerForm: CustomerForm;
    private customerValidator: JQueryValidation.Validator;
    private selfChange = 0;

    constructor() {
        super();

        // entity dialogs by default creates a property grid on element with ID "PropertyGrid".
        // here we explicitly create another, the customer property grid (vertical form) on element with ID "CustomerPropertyGrid".
        this.customerPropertyGrid = new PropertyGrid(this.byId("CustomerPropertyGrid"), {
            items: getForm(CustomerForm.formKey).filter(x => x.name != 'CustomerID' && x.name != "NoteList"),
            idPrefix: this.idPrefix + "_Customer_",
            useCategories: true
        });

        // this is just a helper to access editors if needed
        this.customerForm = new CustomerForm(this.customerPropertyGrid.idPrefix);

        // initialize validator for customer form
        this.customerValidator = this.byId("CustomerForm").validate(validateOptions({}));

        this.form.CustomerID.change(e => {
            if (this.selfChange)
                return;

            (async () => {
                var customerID = await this.getCustomerID();

                TabsExtensions.setDisabled(this.tabs, 'Customer', !customerID);

                if (!customerID) {
                    // no customer is selected, just load an empty entity
                    this.customerPropertyGrid.load({});
                    return;
                }

                // load selected customer into customer form by calling CustomerService
                CustomerService.Retrieve({
                    EntityId: customerID
                }, response => {
                    this.customerPropertyGrid.load(response.Entity);
                });
            })();

        });
    }

    async getCustomerID() {
        var customerID = this.form.CustomerID.value;

        if (isEmptyOrNull(customerID))
            return null;

        // unfortunately, CustomerID (a string) used in this form and 
        // the ID (auto increment ID) are different, so we need to 
        // find numeric ID from customer lookups. 
        // you'll probably won't need this step.
        return first((await CustomerRow.getLookupAsync()).items,
            x => x.CustomerID == customerID).ID;
    }

    loadEntity(entity: OrderRow) {
        super.loadEntity(entity);

        (async () => {
            TabsExtensions.setDisabled(this.tabs, 'Customer',
                !(await this.getCustomerID()));
        })();
    }

    // Save the customer and the order 
    protected saveCustomer(callback: (response: SaveResponse) => void, onSuccess?: (response: SaveResponse) => void): boolean {
        var id = this.getCustomerID();
        if (!id) {
            // If id of Customer isn't present, we save only Order entity
            onSuccess(null);
        }
        else {
            // Get current tab
            var currTab = TabsExtensions.activeTabKey(this.tabs);

            // Select the correct tab and validate to see the error message in tab
            TabsExtensions.selectTab(this.tabs, "Customer")
            if (!this.customerValidator.form()) {
                return false;
            }

            // Re-select initial tab
            TabsExtensions.selectTab(this.tabs, currTab)

            // prepare an empty entity to serialize customer details into
            var c = <CustomerRow>{};
            this.customerPropertyGrid.save(c);

            CustomerService.Update({
                EntityId: id,
                Entity: c
            }, response => {
                // reload customer list just in case
                reloadLookup(CustomerRow.lookupKey);

                // set flag that we are triggering customer select change event
                // otherwise active tab will change to first one
                this.selfChange++;
                try {
                    // trigger change so that customer select updates its text
                    // in case if Company Name is changed
                    this.form.CustomerID.element.change();
                }
                finally {
                    this.selfChange--;
                }

                onSuccess(response);
            });
        }

        return true;
    }

    // Call super.save to save Order entity
    protected saveOrder(callback: (response: SaveResponse) => void) {
        super.save(callback);
    }

    protected saveAll(callback: (response: SaveResponse) => void) {
        this.saveCustomer(callback,
            // If customer success, save Order entity
            resp => this.saveOrder(callback)
        );
    }

    // This is called when save/update button is pressed
    protected save(callback: (response: SaveResponse) => void) {
        this.saveAll(callback);
    }

    protected getTemplate() {
        return `<div id="~_Toolbar" class="s-DialogToolbar">
</div>
<div id="~_Tabs" class="s-DialogContent">
    <ul>
        <li><a href="#~_TabOrder"><span>Order</span></a></li>
        <li><a href="#~_TabCustomer"><span>Customer</span></a></li>
    </ul>
    <div id="~_TabOrder" class="tab-pane s-TabOrder">
        <div class="s-Form">
            <form id="~_Form" action="">
                <div class="fieldset">
                    <div id="~_PropertyGrid"></div>
                    <div class="clear"></div>
                </div>
            </form>
        </div>
    </div>
    <div id="~_TabCustomer" class="tab-pane s-TabCustomer">
        <div class="s-Form">
            <form id="~_CustomerForm" action="">
                <div class="fieldset">
                    <div id="~_CustomerPropertyGrid"></div>
                    <div class="clear"></div>
                </div>
            </form>
        </div>
    </div>
</div>`;
    }

}