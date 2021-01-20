namespace Serenity.Demo.BasicSamples {

    /**
     * Subclass of ProductGrid to override dialog type to CloneableEntityDialog
     */
    @Serenity.Decorators.registerClass()
    export class CloneableEntityGrid extends Serenity.EntityGrid<Northwind.ProductRow, any> {

        protected getColumnsKey() { return Northwind.ProductColumns.columnsKey; }
        protected getDialogType() { return CloneableEntityDialog; }
        protected getIdProperty() { return Northwind.ProductRow.idProperty; }
        protected getLocalTextPrefix() { return Northwind.ProductRow.localTextPrefix; }
        protected getService() { return Northwind.ProductService.baseUrl; }
    }
}