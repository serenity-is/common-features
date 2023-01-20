import { Decorators, EntityDialog, TabsExtensions } from "@serenity-is/corelib";
import { htmlEncode, reloadLookup, localText } from "@serenity-is/corelib/q";
import { DialogUtils } from "@serenity-is/extensions";
import { CustomerForm, CustomerRow, CustomerService } from "../ServerTypes/Demo";
import { CustomerOrdersGrid } from "./CustomerOrdersGrid";

@Decorators.registerClass('Serenity.Demo.Northwind.CustomerDialog')
@Decorators.panel()
export class CustomerDialog extends EntityDialog<CustomerRow, any> {
    protected getFormKey() { return CustomerForm.formKey; }
    protected getIdProperty() { return CustomerRow.idProperty; }
    protected getLocalTextPrefix() { return CustomerRow.localTextPrefix; }
    protected getNameProperty() { return CustomerRow.nameProperty; }
    protected getService() { return CustomerService.baseUrl; }

    protected form = new CustomerForm(this.idPrefix);

    private ordersGrid: CustomerOrdersGrid;
    private loadedState: string;

    constructor() {
        super();

        this.ordersGrid = new CustomerOrdersGrid(this.byId('OrdersGrid'));
        // force order dialog to open in Dialog mode instead of Panel mode
        // which is set as default on OrderDialog with @panelAttribute
        this.ordersGrid.openDialogsAsPanel = false;

        this.byId('NoteList').closest('.field').hide().end().appendTo(this.byId('TabNotes'));
        DialogUtils.pendingChangesConfirmation(this.element, () => this.getSaveState() != this.loadedState);
    }

    getSaveState() {
        try {
            return $.toJSON(this.getSaveEntity());
        }
        catch (e) {
            return null;
        }
    }

    loadResponse(data) {
        super.loadResponse(data);
        this.loadedState = this.getSaveState();
    }

    loadEntity(entity: CustomerRow) {
        super.loadEntity(entity);

        TabsExtensions.setDisabled(this.tabs, 'Orders', this.isNewOrDeleted());

        this.ordersGrid.customerID = entity.CustomerID;
    }

    onSaveSuccess(response) {
        super.onSaveSuccess(response);

        reloadLookup('Northwind.Customer');
    }

    getTemplate() {
        return `<div id="~_Tabs" class="s-DialogContent">
    <ul>
        <li><a href="#~_TabInfo"><span>${htmlEncode(localText("Db.Northwind.Customer.EntitySingular"))}</span></a></li>
        <li><a href="#~_TabNotes"><span>${htmlEncode(localText("Db.Northwind.Note.EntityPlural"))}</span></a></li>
        <li><a href="#~_TabOrders"><span>${htmlEncode(localText("Db.Northwind.Order.EntityPlural"))}</span></a></li>
    </ul>
    <div id="~_TabInfo" class="tab-pane s-TabInfo">
        <div id="~_Toolbar" class="s-DialogToolbar">
        </div>
        <div class="s-Form">
            <form id="~_Form" action="">
                <div class="fieldset ui-widget ui-widget-content ui-corner-all">
                    <div id="~_PropertyGrid"></div>
                    <div class="clear"></div>
                </div>
            </form>
        </div>
    </div>
    <div id="~_TabNotes" class="tab-pane s-TabNotes">
    </div>
    <div id="~_TabOrders" class="tab-pane s-TabOrders">
        <div id="~_OrdersGrid">
        </div>
    </div>
</div>`;
    }
}
