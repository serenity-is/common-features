namespace Serenity.Demo.Northwind {
    export namespace ProductLangService {
        export const baseUrl = 'Serenity.Demo.Northwind/ProductLang';

        export declare function Create(request: SaveRequest<ProductLangRow>, onSuccess?: (response: SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Update(request: SaveRequest<ProductLangRow>, onSuccess?: (response: SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<ProductLangRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<ProductLangRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            Create = "Serenity.Demo.Northwind/ProductLang/Create",
            Update = "Serenity.Demo.Northwind/ProductLang/Update",
            Delete = "Serenity.Demo.Northwind/ProductLang/Delete",
            Retrieve = "Serenity.Demo.Northwind/ProductLang/Retrieve",
            List = "Serenity.Demo.Northwind/ProductLang/List"
        }

        [
            'Create', 
            'Update', 
            'Delete', 
            'Retrieve', 
            'List'
        ].forEach(x => {
            (<any>ProductLangService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}
