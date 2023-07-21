
import { Decorators, SubDialogHelper } from "@serenity-is/corelib";
import { Column } from "@serenity-is/sleekgrid";
import { OrderGrid } from "../Order/OrderGrid";
import { OrderRow } from "../ServerTypes/Demo";
import { CustomerOrderDialog } from "./CustomerOrderDialog";
import { tryFirst } from "@serenity-is/corelib/q";

const fld = OrderRow.Fields;

@Decorators.registerClass()
export class CustomerOrdersGrid extends OrderGrid {
    protected getDialogType() { return CustomerOrderDialog; }

    constructor(container: JQuery) {
        super(container);
    }

    protected getColumns(): Column[] {
        return super.getColumns().filter(x => x.field !== fld.CustomerCompanyName);
    }

    protected initEntityDialog(itemType, dialog) {
        super.initEntityDialog(itemType, dialog);
        SubDialogHelper.cascade(dialog, this.element.closest('.ui-dialog'));
    }

    protected override getButtons() {
        var buttons = super.getButtons();
        var addButton = tryFirst(buttons, x => x.action === 'add');
        if (addButton)
            addButton.disabled = () => !this.customerID;
        return buttons;
    }

    protected addButtonClick() {
        if (!this.customerID)
            return;
        this.editItem({ CustomerID: this.customerID });
    }

    protected getInitialTitle() {
        return null;
    }

    protected getGridCanLoad() {
        return super.getGridCanLoad() && !!this.customerID;
    }

    private _customerID: string;

    get customerID() {
        return this._customerID;
    }

    set customerID(value: string) {
        if (this._customerID !== value) {
            this._customerID = value;
            this.setEquality('CustomerID', value);
            this.refresh();
            this.updateInterface();
        }
    }
}
