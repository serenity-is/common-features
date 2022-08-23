namespace Serenity.Demo.Northwind {
    export namespace TerritoryService {
        export const baseUrl = 'Serenity.Demo.Northwind/Territory';

        export declare function Create(request: SaveRequest<TerritoryRow>, onSuccess?: (response: SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Update(request: SaveRequest<TerritoryRow>, onSuccess?: (response: SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<TerritoryRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<TerritoryRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            Create = "Serenity.Demo.Northwind/Territory/Create",
            Update = "Serenity.Demo.Northwind/Territory/Update",
            Delete = "Serenity.Demo.Northwind/Territory/Delete",
            Retrieve = "Serenity.Demo.Northwind/Territory/Retrieve",
            List = "Serenity.Demo.Northwind/Territory/List"
        }

        [
            'Create', 
            'Update', 
            'Delete', 
            'Retrieve', 
            'List'
        ].forEach(x => {
            (<any>TerritoryService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}
