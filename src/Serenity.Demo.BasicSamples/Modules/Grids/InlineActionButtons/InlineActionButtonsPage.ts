import { Decorators } from "@serenity-is/corelib";
import { confirmDialog, initFullHeightGridPage } from "@serenity-is/corelib";
import { CustomerGrid, CustomerService, OrderDialog, OrderRow } from "@serenity-is/demo.northwind";

export default function pageInit() {
    initFullHeightGridPage(new InlineActionGrid($('#GridDiv')).element);
}

@Decorators.registerClass('Serenity.Demo.BasicSamples.InlineActionGrid')
export class InlineActionGrid extends CustomerGrid {

    constructor(container: JQuery) {
        super(container);
    }

    protected getColumns() {
        var columns = super.getColumns();

        columns.unshift({
            field: 'Delete Row',
            name: '',
            format: ctx => '<a class="inline-action delete-row" title="delete">' +
                '<i class="fa fa-trash-o text-red"></i></a>',
            width: 24,
            minWidth: 24,
            maxWidth: 24
        });

        columns.splice(1, 0, {
            field: 'View Details',
            name: '',
            format: ctx => `<a class="inline-action view-details" title="view details">
                    <i class="fa fa-search"></i></a>`,
            width: 24,
            minWidth: 24,
            maxWidth: 24
        });

        columns.splice(2, 0, {
            field: 'New Order',
            name: '',
            format: ctx => `<a class="inline-action new-order text-purple" title="new order">
                    <i class="fa fa-cart-plus"></i></a>`,
            width: 24,
            minWidth: 24,
            maxWidth: 24
        });

        return columns;
    }

    protected onClick(e: Event, row: number, cell: number) {
        super.onClick(e, row, cell);

        if ((e as any).isDefaultPrevented?.() || e.defaultPrevented)
            return;

        var item = this.itemAt(row);
        var target = $(e.target);

        // if user clicks "i" element, e.g. icon
        if (target.parent().hasClass('inline-action'))
            target = target.parent();

        if (target.hasClass('inline-action')) {
            e.preventDefault();

            if (target.hasClass('delete-row')) {
                confirmDialog('Delete record?', () => {
                    CustomerService.Delete({
                        EntityId: item.ID,
                    }, response => {
                        this.refresh();
                    });
                });
            }
            else if (target.hasClass('view-details')) {
                this.editItem(item.ID);
            }
            else if (target.hasClass('new-order')) {
                var dlg = new OrderDialog();
                this.initDialog(dlg);
                dlg.loadEntityAndOpenDialog(<OrderRow>{
                    CustomerID: item.CustomerID
                });
            }
        }
    }
}