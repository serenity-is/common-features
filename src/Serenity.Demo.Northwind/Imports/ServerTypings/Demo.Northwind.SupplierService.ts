namespace Serenity.Demo.Northwind {
    export namespace SupplierService {
        export const baseUrl = 'Serenity.Demo.Northwind/Supplier';

        export declare function Create(request: SaveRequest<SupplierRow>, onSuccess?: (response: SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Update(request: SaveRequest<SupplierRow>, onSuccess?: (response: SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<SupplierRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<SupplierRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            Create = "Serenity.Demo.Northwind/Supplier/Create",
            Update = "Serenity.Demo.Northwind/Supplier/Update",
            Delete = "Serenity.Demo.Northwind/Supplier/Delete",
            Retrieve = "Serenity.Demo.Northwind/Supplier/Retrieve",
            List = "Serenity.Demo.Northwind/Supplier/List"
        }

        [
            'Create', 
            'Update', 
            'Delete', 
            'Retrieve', 
            'List'
        ].forEach(x => {
            (<any>SupplierService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}
