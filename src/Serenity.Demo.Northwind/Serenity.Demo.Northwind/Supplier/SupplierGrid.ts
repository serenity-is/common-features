namespace Serenity.Demo.Northwind {

    @Serenity.Decorators.registerClass()
    export class SupplierGrid extends Serenity.EntityGrid<SupplierRow, any> {
        protected getColumnsKey() { return SupplierColumns.columnsKey; }
        protected getDialogType() { return <any>SupplierDialog; }
        protected getIdProperty() { return SupplierRow.idProperty; }
        protected getLocalTextPrefix() { return SupplierRow.localTextPrefix; }
        protected getService() { return SupplierService.baseUrl; }

        constructor(container: JQuery) {
            super(container);
        }
    }
}