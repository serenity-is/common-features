namespace Serenity.Demo.Northwind {
    export interface OrderListRequest extends Serenity.ListRequest {
        ProductID?: number;
    }
}
