import { Decorators } from "@serenity-is/corelib";
import { alertDialog, toId, tryFirst } from "@serenity-is/corelib/q";
import { GridEditorBase } from "@serenity-is/extensions";
import { OrderDetailColumns, OrderDetailRow, ProductRow } from "../ServerTypes/Demo";
import { OrderDetailDialog } from "./OrderDetailDialog";

@Decorators.registerEditor('Serenity.Demo.Northwind.OrderDetailsEditor')
export class OrderDetailsEditor extends GridEditorBase<OrderDetailRow> {
    protected getColumnsKey() { return OrderDetailColumns.columnsKey; }
    protected getDialogType() { return OrderDetailDialog; }
    protected getLocalTextPrefix() { return OrderDetailRow.localTextPrefix; }

    constructor(container: JQuery) {
        super(container);
    }

    validateEntity(row, id) {
        row.ProductID = toId(row.ProductID);

        var sameProduct = tryFirst(this.view.getItems(), x => x.ProductID === row.ProductID);
        if (sameProduct && this.id(sameProduct) !== id) {
            alertDialog('This product is already in order details!');
            return false;
        }

        row.ProductName = ProductRow.getLookup().itemById[row.ProductID].ProductName;
        row.LineTotal = (row.Quantity || 0) * (row.UnitPrice || 0) - (row.Discount || 0);
        return true;
    }
}
