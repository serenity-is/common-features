namespace Serenity.Demo.Northwind {
    export namespace CustomerService {
        export const baseUrl = 'Serenity.Demo.Northwind/Customer';

        export declare function Create(request: SaveRequest<CustomerRow>, onSuccess?: (response: SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Update(request: SaveRequest<CustomerRow>, onSuccess?: (response: SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function GetNextNumber(request: Extensions.GetNextNumberRequest, onSuccess?: (response: Extensions.GetNextNumberResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<CustomerRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<CustomerRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            Create = "Serenity.Demo.Northwind/Customer/Create",
            Update = "Serenity.Demo.Northwind/Customer/Update",
            Delete = "Serenity.Demo.Northwind/Customer/Delete",
            GetNextNumber = "Serenity.Demo.Northwind/Customer/GetNextNumber",
            Retrieve = "Serenity.Demo.Northwind/Customer/Retrieve",
            List = "Serenity.Demo.Northwind/Customer/List"
        }

        [
            'Create', 
            'Update', 
            'Delete', 
            'GetNextNumber', 
            'Retrieve', 
            'List'
        ].forEach(x => {
            (<any>CustomerService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}
