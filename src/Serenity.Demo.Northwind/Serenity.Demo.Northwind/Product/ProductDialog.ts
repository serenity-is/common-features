import { Decorators, EntityDialog } from "@serenity-is/corelib";
import { ProductForm, ProductRow, ProductService } from "../ServerTypes/Demo";

@Decorators.registerClass()
@Decorators.maximizable()
export class ProductDialog extends EntityDialog<ProductRow, any> {
    protected getFormKey() { return ProductForm.formKey; }
    protected getIdProperty() { return ProductRow.idProperty; }
    protected getLocalTextPrefix() { return ProductRow.localTextPrefix; }
    protected getNameProperty() { return ProductRow.nameProperty; }
    protected getService() { return ProductService.baseUrl; }

    protected form = new ProductForm(this.idPrefix);
}
