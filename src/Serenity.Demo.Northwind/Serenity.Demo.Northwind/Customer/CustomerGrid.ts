import { Decorators, EntityGrid } from "@serenity-is/corelib";
import { CustomerColumns, CustomerRow, CustomerService } from "../ServerTypes/Demo";
import { CustomerDialog } from "./CustomerDialog";

@Decorators.registerClass('Serenity.Demo.Norhtwind.CustomerGrid')
@Decorators.filterable()
export class CustomerGrid extends EntityGrid<CustomerRow, any> {
    protected getColumnsKey() { return CustomerColumns.columnsKey; }
    protected getDialogType() { return <any>CustomerDialog; }
    protected getIdProperty() { return CustomerRow.idProperty; }
    protected getLocalTextPrefix() { return CustomerRow.localTextPrefix; }
    protected getService() { return CustomerService.baseUrl; }
}
