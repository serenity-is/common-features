import { CustomerForm, CustomerRow, CustomerService } from "@/ServerTypes/Demo";
import { Decorators, EntityDialog, TabsExtensions, WidgetProps, htmlEncode, localText, reloadLookup } from "@serenity-is/corelib";
import { DialogUtils } from "@serenity-is/extensions";
import { CustomerOrdersGrid } from "./CustomerOrdersGrid";

@Decorators.registerClass('Serenity.Demo.Northwind.CustomerDialog')
@Decorators.panel()
export class CustomerDialog<P = {}> extends EntityDialog<CustomerRow, P> {
    protected getFormKey() { return CustomerForm.formKey; }
    protected getRowDefinition() { return CustomerRow; }
    protected getService() { return CustomerService.baseUrl; }

    protected form = new CustomerForm(this.idPrefix);

    private ordersGrid: CustomerOrdersGrid;
    private loadedState: string;

    constructor(props: WidgetProps<P>) {
        super(props);

        this.ordersGrid = new CustomerOrdersGrid({ element: this.byId('OrdersGrid') });
        // force order dialog to open in Dialog mode instead of Panel mode
        // which is set as default on OrderDialog with @panelAttribute
        this.ordersGrid.openDialogsAsPanel = false;

        this.byId('NoteList').closest('.field').hide().end().appendTo(this.byId('TabNotes'));
        DialogUtils.pendingChangesConfirmation(this.domNode, () => this.getSaveState() != this.loadedState);
    }

    getSaveState() {
        try {
            return $.toJSON(this.getSaveEntity());
        }
        catch (e) {
            return null;
        }
    }

    loadResponse(data: any) {
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
