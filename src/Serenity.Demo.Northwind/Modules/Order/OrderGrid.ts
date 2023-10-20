import { Decorators, EntityGrid, EnumEditor, LookupEditor, ToolButton } from "@serenity-is/corelib";
import { toId } from "@serenity-is/corelib";
import { ExcelExportHelper, PdfExportHelper, ReportHelper } from "@serenity-is/extensions";
import { OrderColumns, OrderListRequest, OrderRow, OrderService, ProductRow } from "@/ServerTypes/Demo";
import { OrderDialog } from "./OrderDialog";

const fld = OrderRow.Fields;

@Decorators.registerClass('Serenity.Demo.Northwind.OrderGrid')
@Decorators.filterable()
export class OrderGrid extends EntityGrid<OrderRow, any> {
    protected getColumnsKey() { return OrderColumns.columnsKey; }
    protected getDialogType() { return <any>OrderDialog; }
    protected getRowDefinition() { return OrderRow; }
    protected getService() { return OrderService.baseUrl; }

    protected shippingStateFilter: EnumEditor;

    constructor(container: JQuery) {
        super(container);
    }

    protected getQuickFilters() {
        var filters = super.getQuickFilters();

        filters.push({
            type: LookupEditor,
            options: {
                lookupKey: ProductRow.lookupKey,
                async: true
            },
            field: 'ProductID',
            title: 'Contains Product in Details',
            handler: w => {
                (this.view.params as OrderListRequest).ProductID = toId(w.value);
            },
            cssClass: 'hidden-xs'
        });

        return filters;
    }

    protected createQuickFilters() {
        super.createQuickFilters();

        this.shippingStateFilter = this.findQuickFilter(EnumEditor, fld.ShippingState);
    }

    protected getButtons(): ToolButton[] {
        var buttons = super.getButtons();

        buttons.push(ExcelExportHelper.createToolButton({
            grid: this,
            service: OrderService.baseUrl + '/ListExcel',
            onViewSubmit: () => this.onViewSubmit(),
            separator: true
        }));

        buttons.push(PdfExportHelper.createToolButton({
            grid: this,
            onViewSubmit: () => this.onViewSubmit()
        }));

        return buttons;
    }

    protected getColumns() {
        var columns = super.getColumns();

        columns.splice(1, 0, {
            id: 'Print Invoice',
            field: null,
            name: '',
            cssClass: 'align-center',
            format: ctx => '<a class="inline-action print-invoice" title="invoice">' +
                '<i class="fa fa-file-pdf-o text-red"></i></a>',
            width: 36,
            minWidth: 36,
            maxWidth: 36
        });

        return columns;
    }

    protected onClick(e: JQueryEventObject, row: number, cell: number) {
        super.onClick(e, row, cell);

        if (e.isDefaultPrevented())
            return;

        var item = this.itemAt(row);
        var target = $(e.target);

        // if user clicks "i" element, e.g. icon
        if (target.parent().hasClass('inline-action'))
            target = target.parent();

        if (target.hasClass('inline-action')) {
            e.preventDefault();

            if (target.hasClass('print-invoice')) {
                ReportHelper.execute({
                    reportKey: 'Northwind.OrderDetail',
                    params: {
                        OrderID: item.OrderID
                    }
                });
            }
        }
    }

    public set_shippingState(value: number): void {
        this.shippingStateFilter.value = value == null ? '' : value.toString();
    }

    protected addButtonClick() {
        var eq = this.view.params.EqualityFilter;
        this.editItem(<OrderRow>{
            CustomerID: eq ? eq.CustomerID : null
        });
    }
}
