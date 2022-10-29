import { fieldsProxy } from "@serenity-is/corelib/q";

export interface OrderDetailRow {
    DetailID?: number;
    OrderID?: number;
    ProductID?: number;
    UnitPrice?: number;
    Quantity?: number;
    Discount?: number;
    OrderCustomerID?: string;
    OrderEmployeeID?: number;
    OrderDate?: string;
    OrderShippedDate?: string;
    OrderShipVia?: number;
    OrderShipCity?: string;
    OrderShipCountry?: string;
    ProductName?: string;
    ProductDiscontinued?: boolean;
    ProductSupplierID?: number;
    ProductQuantityPerUnit?: string;
    ProductUnitPrice?: number;
    LineTotal?: number;
}

export abstract class OrderDetailRow {
    static readonly idProperty = 'DetailID';
    static readonly localTextPrefix = 'Northwind.OrderDetail';
    static readonly deletePermission = 'Northwind:General';
    static readonly insertPermission = 'Northwind:General';
    static readonly readPermission = 'Northwind:General';
    static readonly updatePermission = 'Northwind:General';

    static readonly Fields = fieldsProxy<OrderDetailRow>();
}
