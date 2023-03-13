import { Decorators, EntityGrid } from "@serenity-is/corelib";
import { endsWith, initFullHeightGridPage } from "@serenity-is/corelib/q";
import { ProductColumns, ProductDialog, ProductRow, ProductService } from "@serenity-is/demo.northwind"

export default function pageInit() {
    initFullHeightGridPage(new CloneableEntityGrid($('#GridDiv'), {}).element);
}

/**
 * Subclass of ProductGrid to override dialog type to CloneableEntityDialog
 */
export class CloneableEntityGrid extends EntityGrid<ProductRow, any> {

    protected getColumnsKey() { return ProductColumns.columnsKey; }
    protected getDialogType() { return CloneableEntityDialog; }
    protected getIdProperty() { return ProductRow.idProperty; }
    protected getLocalTextPrefix() { return ProductRow.localTextPrefix; }
    protected getService() { return ProductService.baseUrl; }
}

@Decorators.registerClass('Serenity.Demo.BasicSamples.CloneableEntityDialog')
@Decorators.maximizable()
export class CloneableEntityDialog extends ProductDialog {
    protected updateInterface() {

        // by default cloneButton is hidden in base UpdateInterface method
        super.updateInterface();

        // here we show it if it is edit mode (not new)
        this.cloneButton.toggle(this.isEditMode());
    }

    /**
        * Overriding this method is optional to customize cloned entity
        */
    protected getCloningEntity() {
        var clone = super.getCloningEntity();

        // add (Clone) suffix if it's not already added
        var suffix = ' (Clone)';
        if (!endsWith(clone.ProductName || '', suffix)) {
            clone.ProductName = (clone.ProductName || '') + suffix;
        }

        // it's better to clear image for this sample
        // otherwise we would have to create a temporary copy of it
        // and upload
        clone.ProductImage = null;

        // let's clear fields not logical to be cloned
        clone.UnitsInStock = 0;
        clone.UnitsOnOrder = 0;
        return clone;
    }
}