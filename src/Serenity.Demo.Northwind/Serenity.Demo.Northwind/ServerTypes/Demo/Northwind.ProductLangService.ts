import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { ProductLangRow } from "./Northwind.ProductLangRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace ProductLangService {
    export const baseUrl = 'Serenity.Demo.Northwind/ProductLang';

    export declare function Create(request: SaveRequest<ProductLangRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<ProductLangRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<ProductLangRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<ProductLangRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export declare enum Methods {
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
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}
