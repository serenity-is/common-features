import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface ProductRow {
    ProductID?: number;
    ProductName?: string;
    ProductImage?: string;
    Discontinued?: boolean;
    SupplierID?: number;
    CategoryID?: number;
    QuantityPerUnit?: string;
    UnitPrice?: number;
    UnitsInStock?: number;
    UnitsOnOrder?: number;
    ReorderLevel?: number;
    SupplierCompanyName?: string;
    SupplierContactName?: string;
    SupplierContactTitle?: string;
    SupplierAddress?: string;
    SupplierCity?: string;
    SupplierRegion?: string;
    SupplierPostalCode?: string;
    SupplierCountry?: string;
    SupplierPhone?: string;
    SupplierFax?: string;
    SupplierHomePage?: string;
    CategoryName?: string;
    CategoryDescription?: string;
    CategoryPicture?: number[];
}

export abstract class ProductRow {
    static readonly idProperty = 'ProductID';
    static readonly nameProperty = 'ProductName';
    static readonly localTextPrefix = 'Northwind.Product';
    static readonly lookupKey = 'Northwind.Product';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<ProductRow>('Northwind.Product') }
    static async getLookupAsync() { return getLookupAsync<ProductRow>('Northwind.Product') }

    static readonly deletePermission = 'Northwind:General';
    static readonly insertPermission = 'Northwind:General';
    static readonly readPermission = 'Northwind:General';
    static readonly updatePermission = 'Northwind:General';

    static readonly Fields = fieldsProxy<ProductRow>();
}
