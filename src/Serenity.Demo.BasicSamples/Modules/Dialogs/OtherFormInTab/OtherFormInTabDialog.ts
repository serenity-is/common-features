import { Decorators, PropertyGrid, TabsExtensions, Toolbar } from "@serenity-is/corelib";
import { first, getForm, isEmptyOrNull, notifySuccess, reloadLookup, text, validateOptions } from "@serenity-is/corelib/q";
import { OrderDialog, CustomerForm, CustomerRow, CustomerService, OrderRow } from "@serenity-is/demo.northwind";

/**
 * Our custom order dialog subclass that will have a tab to display and edit selected customer details.
 */
@Decorators.registerClass('Serenity.Demo.BasicSamples.OtherFormInTabDialog')
export class OtherFormInTabDialog extends OrderDialog {

    private customerPropertyGrid: PropertyGrid;
    private customerForm: CustomerForm;
    private customerValidator: JQueryValidation.Validator;

    constructor() {
        super();

        // entity dialogs by default creates a property grid on element with ID "PropertyGrid".
        // here we explicitly create another, the customer property grid (vertical form) on element with ID "CustomerPropertyGrid".
        this.customerPropertyGrid = new PropertyGrid(this.byId("CustomerPropertyGrid"), {
            idPrefix: this.idPrefix + "_Customer_",
            items: getForm(CustomerForm.formKey).filter(x => x.name != 'CustomerID'),
            useCategories: true
        });

        // this is just a helper to access editors if needed
        this.customerForm = new CustomerForm((this.customerPropertyGrid as any).idPrefix);

        // initialize validator for customer form
        this.customerValidator = this.byId("CustomerForm").validate(validateOptions({}));

        var selfChange = 0;

        // creating another toolbar for customer tab that will only save Customer
        new Toolbar(this.byId("CustomerToolbar"), {
            buttons: [{
                cssClass: "apply-changes-button",
                title: text("Controls.EntityDialog.SaveButton"),
                onClick: () => {
                    var id = this.getCustomerID();
                    if (!id)
                        return;

                    if (!this.customerValidator.form())
                        return;

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
                        selfChange++;
                        try {
                            // trigger change so that customer select updates its text
                            // in case if Company Name is changed
                            this.form.CustomerID.element.change();
                        }
                        finally {
                            selfChange--;
                        }

                        notifySuccess("Saved customer details");
                    });

                }
            }]
        });

        this.form.CustomerID.change(e => {
            if (selfChange)
                return;

            var customerID = this.getCustomerID();

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

        });
    }

    getCustomerID() {
        var customerID = this.form.CustomerID.value;

        if (isEmptyOrNull(customerID))
            return null;

        // unfortunately, CustomerID (a string) used in this form and 
        // the ID (auto increment ID) are different, so we need to 
        // find numeric ID from customer lookups. 
        // you'll probably won't need this step.
        return first(CustomerRow.getLookup().items,
            x => x.CustomerID == customerID).ID;
    }

    loadEntity(entity: OrderRow) {
        super.loadEntity(entity);

        TabsExtensions.setDisabled(this.tabs, 'Customer',
            !this.getCustomerID());
    }

    getTemplate() {
        return `<div id="~_Tabs" class="s-DialogContent">
    <ul>
        <li><a href="#~_TabOrder"><span>Order</span></a></li>
        <li><a href="#~_TabCustomer"><span>Customer</span></a></li>
    </ul>
    <div id="~_TabOrder" class="tab-pane s-TabOrder">
        <div id="~_Toolbar" class="s-DialogToolbar">
        </div>
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
        <div id="~_CustomerToolbar" class="s-DialogToolbar">
        </div>
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