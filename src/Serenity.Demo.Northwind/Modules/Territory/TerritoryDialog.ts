import { Decorators, EntityDialog } from "@serenity-is/corelib";
import { TerritoryForm, TerritoryRow, TerritoryService } from "../ServerTypes/Demo";

@Decorators.registerClass('Serenity.Demo.Northwind.TerritoryDialog')
export class TerritoryDialog extends EntityDialog<TerritoryRow, any> {
    protected getFormKey() { return TerritoryForm.formKey; }
    protected getIdProperty() { return TerritoryRow.idProperty; }
    protected getLocalTextPrefix() { return TerritoryRow.localTextPrefix; }
    protected getNameProperty() { return TerritoryRow.nameProperty; }
    protected getService() { return TerritoryService.baseUrl; }

    protected form = new TerritoryForm(this.idPrefix);
}
