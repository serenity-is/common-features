import { Decorators, EntityDialog } from "@serenity-is/corelib";
import { CategoryForm, CategoryRow, CategoryService } from "../ServerTypes/Demo";

@Decorators.registerClass('Serenity.Demo.Northwind.CategoryDialog')
export class CategoryDialog extends EntityDialog<CategoryRow, any> {
    protected getFormKey() { return CategoryForm.formKey; }
    protected getIdProperty() { return CategoryRow.idProperty; }
    protected getLocalTextPrefix() { return CategoryRow.localTextPrefix; }
    protected getNameProperty() { return CategoryRow.nameProperty; }
    protected getService() { return CategoryService.baseUrl; }

    protected form = new CategoryForm(this.idPrefix);
}