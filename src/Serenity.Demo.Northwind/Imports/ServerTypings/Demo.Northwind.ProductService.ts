namespace Serenity.Demo.Northwind {
    export namespace ProductService {
        export const baseUrl = 'Serenity.Demo.Northwind/Product';

        export declare function Create(request: SaveRequest<ProductRow>, onSuccess?: (response: SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Update(request: SaveRequest<ProductRow>, onSuccess?: (response: SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<ProductRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<ProductRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            Create = "Serenity.Demo.Northwind/Product/Create",
            Update = "Serenity.Demo.Northwind/Product/Update",
            Delete = "Serenity.Demo.Northwind/Product/Delete",
            Retrieve = "Serenity.Demo.Northwind/Product/Retrieve",
            List = "Serenity.Demo.Northwind/Product/List"
        }

        [
            'Create', 
            'Update', 
            'Delete', 
            'Retrieve', 
            'List'
        ].forEach(x => {
            (<any>ProductService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}
