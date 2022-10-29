import { Decorators, EntityDialog } from "@serenity-is/corelib";
import { SupplierForm, SupplierRow, SupplierService } from "../ServerTypes/Demo";

@Decorators.registerClass('Serenity.Demo.Northwind.SupplierDialog')
export class SupplierDialog extends EntityDialog<SupplierRow, any> {
    protected getFormKey() { return SupplierForm.formKey; }
    protected getIdProperty() { return SupplierRow.idProperty; }
    protected getLocalTextPrefix() { return SupplierRow.localTextPrefix; }
    protected getNameProperty() { return SupplierRow.nameProperty; }
    protected getService() { return SupplierService.baseUrl; }

    protected form = new SupplierForm(this.idPrefix);
}
