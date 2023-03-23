import { Decorators, EntityDialog } from "@serenity-is/corelib";
import { RegionForm, RegionRow, RegionService } from "../ServerTypes/Demo";

@Decorators.registerClass('Serenity.Demo.Northwind.RegionDialog')
export class RegionDialog extends EntityDialog<RegionRow, any> {
    protected getFormKey() { return RegionForm.formKey; }
    protected getRowDefinition() { return RegionRow; }
    protected getService() { return RegionService.baseUrl; }

    protected form = new RegionForm(this.idPrefix);
}
