import { Decorators, PropertyGrid, TabsExtensions, Toolbar } from "@serenity-is/corelib";
import { first, getForm, isEmptyOrNull, notifySuccess, reloadLookup, localText, validateOptions, initFullHeightGridPage } from "@serenity-is/corelib/q";
import { OrderDialog, CustomerForm, CustomerRow, CustomerService, OrderRow, OrderGrid } from "@serenity-is/demo.northwind";

export default function pageInit() {
    initFullHeightGridPage(new OtherFormInTabGrid($('#GridDiv')).element);
}

/**
 * Subclass of OrderGrid to override dialog type to OtherFormInTabDialog
 */
@Decorators.registerClass('Serenity.Demo.BasicSamples.OtherFormInTabGrid')
export class OtherFormInTabGrid extends OrderGrid {

    protected getDialogType() { return OtherFormInTabDialog; }

    constructor(container: JQuery) {
        super(container);
    }
}

/**
 * Our custom order dialog subclass that will have a tab to display and edit selected customer details.
 */
@Decorators.registerClass('Serenity.Demo.BasicSamples.OtherFormInTabDialog')
export class OtherFormInTabDialog extends OrderDialog {

    private customerFormEl: JQuery;
    private customerValidator: JQueryValidation.Validator;
    private customerPropertyGrid: PropertyGrid;
    private selfChange: number = 0;

    constructor() {
        super();

        // entity dialogs by default creates a property grid on element with ID "PropertyGrid".
        // here we explicitly create another, the customer property grid (vertical form) on this div element
        this.customerPropertyGrid = new PropertyGrid(this.customerFormEl.children(), {
            idPrefix: `${this.idPrefix}Customer_`,
            items: getForm(CustomerForm.formKey).filter(x => x.name != CustomerRow.Fields.CustomerID),
            useCategories: true
        });

        this.customerValidator = this.customerFormEl.validate(validateOptions({}));

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

        // unfortunately, CustomerID (a string) used in this form and the ID (auto increment ID) are different, so we need to 
        // find numeric ID from customer lookups. you'll probably won't need this step.
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

    private async createCustomerToolbar(el: JQuery) {
        new Toolbar(el, {
            buttons: [{
                cssClass: "apply-changes-button",
                title: localText("Controls.EntityDialog.SaveButton"),
                onClick: async () => {
                    var id = await this.getCustomerID();
                    if (!id)
                        return;

                    if (!this.customerValidator.form())
                        return;

                    // prepare an empty entity to serialize customer details into
                    var c: CustomerRow = {};
                    this.customerPropertyGrid.save(c);

                    CustomerService.Update({
                        EntityId: id,
                        Entity: c
                    }, () => {
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

                        notifySuccess("Saved customer details");
                    });
                }
            }]
        });
    }

    renderContents() {
        this.element.html('');
        const _ = this.idPrefix;
        this.element.append(
            <div id={`${_}Tabs`} class="s-DialogContent">
                <ul>
                    <li><a href={`#${_}TabOrder`}><span>Order</span></a></li>
                    <li><a href={`#${_}TabCustomer`}><span>Customer</span></a></li>
                </ul>
                <div id={`${_}TabOrder`} class="tab-pane">
                    <div id={`${_}Toolbar`} class="s-DialogToolbar"></div>
                    <div class="s-Form">
                        <form id={`${_}Form`} action="">
                            <div id={`${_}PropertyGrid`}></div>
                        </form>
                    </div>
                </div>
                <div id={`${_}TabCustomer`} class="tab-pane">
                    <div class="s-DialogToolbar" ref={(el: HTMLDivElement) => this.createCustomerToolbar($(el))}></div>
                    <div class="s-Form">
                        <form action="" ref={(el: HTMLFormElement) => this.customerFormEl = $(el)}>
                            <div></div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}