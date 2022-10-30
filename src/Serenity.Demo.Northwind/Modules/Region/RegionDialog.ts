import { Decorators, EntityDialog } from "@serenity-is/corelib";
import { RegionForm, RegionRow, RegionService } from "../ServerTypes/Demo";

@Decorators.registerClass('Serenity.Demo.Northwind.RegionDialog')
export class RegionDialog extends EntityDialog<RegionRow, any> {
    protected getFormKey() { return RegionForm.formKey; }
    protected getIdProperty() { return RegionRow.idProperty; }
    protected getLocalTextPrefix() { return RegionRow.localTextPrefix; }
    protected getNameProperty() { return RegionRow.nameProperty; }
    protected getService() { return RegionService.baseUrl; }

    protected form = new RegionForm(this.idPrefix);
}
