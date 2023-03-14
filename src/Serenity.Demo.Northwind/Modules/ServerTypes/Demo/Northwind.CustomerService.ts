import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { CustomerRow } from "./Northwind.CustomerRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";
import { GetNextNumberRequest, GetNextNumberResponse } from "@serenity-is/extensions";

export namespace CustomerService {
    export const baseUrl = 'Serenity.Demo.Northwind/Customer';

    export declare function Create(request: SaveRequest<CustomerRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<CustomerRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function GetNextNumber(request: GetNextNumberRequest, onSuccess?: (response: GetNextNumberResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<CustomerRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<CustomerRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "Serenity.Demo.Northwind/Customer/Create",
        Update: "Serenity.Demo.Northwind/Customer/Update",
        Delete: "Serenity.Demo.Northwind/Customer/Delete",
        GetNextNumber: "Serenity.Demo.Northwind/Customer/GetNextNumber",
        Retrieve: "Serenity.Demo.Northwind/Customer/Retrieve",
        List: "Serenity.Demo.Northwind/Customer/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'GetNextNumber', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>CustomerService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}