import { Decorators, EntityGrid } from "@serenity-is/corelib";
import { coalesce, first, formatNumber, initFullHeightGridPage } from "@serenity-is/corelib/q";
import { ProductRow, ProductColumns, ProductService, ProductDialog } from "@serenity-is/demo.northwind";
import { Aggregators } from "@serenity-is/corelib/slick";
import { GroupItemMetadataProvider } from "@serenity-is/sleekgrid";

export default function pageInit() {
    initFullHeightGridPage(new GroupingAndSummariesInGrid($('#GridDiv')).element);
}

@Decorators.registerClass('Serenity.Demo.BasicSamples.GroupingAndSummariesInGrid')
export class GroupingAndSummariesInGrid extends EntityGrid<ProductRow, any> {

    protected getColumnsKey() { return ProductColumns.columnsKey; }
    protected getDialogType() { return ProductDialog; }
    protected getRowDefinition() { return ProductRow; }
    protected getService() { return ProductService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }

    protected createSlickGrid() {
        var grid = super.createSlickGrid();

        // need to register this plugin for grouping or you'll have errors
        grid.registerPlugin(new GroupItemMetadataProvider());

        this.view.setSummaryOptions({
            aggregators: [
                new Aggregators.Avg('UnitPrice'),
                new Aggregators.Sum('UnitsInStock'),
                new Aggregators.Max('UnitsOnOrder'),
                new Aggregators.Avg('ReorderLevel')
            ]
        });

        return grid;
    }

    protected getColumns() {
        var columns = super.getColumns();

        first(columns, x => x.field === 'UnitsOnOrder')
            .groupTotalsFormatter = (totals, col) =>
                (totals.max ? ('max: ' + coalesce(totals.max[col.field], '')) : '');

        first(columns, x => x.field === 'ReorderLevel')
            .groupTotalsFormatter = (totals, col) =>
                (totals.avg ? ('avg: ' + coalesce(formatNumber(totals.avg[col.field], '0.'), '')) : '');

        return columns;
    }

    protected getSlickOptions() {
        var opt = super.getSlickOptions();
        opt.showFooterRow = true;
        return opt;
    }

    protected usePager() {
        return false;
    }

    protected getButtons() {
        return [{
            title: 'Group By Category',
            separator: true,
            cssClass: 'expand-all-button',
            onClick: () => this.view.setGrouping(
                [{
                    getter: 'CategoryName'
                }])
        },
        {
            title: 'Group By Category and Supplier',
            separator: true,
            cssClass: 'expand-all-button',
            onClick: () => this.view.setGrouping(
                [{
                    formatter: x => 'Category: ' + x.value + ' (' + x.count + ' items)',
                    getter: 'CategoryName'
                }, {
                    formatter: x => 'Supplier: ' + x.value + ' (' + x.count + ' items)',
                    getter: 'SupplierCompanyName'
                }])
        }, {
            title: 'No Grouping',
            separator: true,
            cssClass: 'collapse-all-button',
            onClick: () => this.view.setGrouping([])
        }];
    }
}