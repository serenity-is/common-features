import { Decorators, EntityGrid } from "@serenity-is/corelib";
import { ShipperColumns, ShipperRow, ShipperService } from "../ServerTypes/Demo";
import { ShipperDialog } from "./ShipperDialog";

@Decorators.registerClass()
export class ShipperGrid extends EntityGrid<ShipperRow, any> {
    protected getColumnsKey() { return ShipperColumns.columnsKey; }
    protected getDialogType() { return <any>ShipperDialog; }
    protected getRowDefinition() { return ShipperRow; }
    protected getService() { return ShipperService.baseUrl; }
}
