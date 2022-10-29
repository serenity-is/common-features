import { RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { OrderDetailRow } from "./Northwind.OrderDetailRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace OrderDetailService {
    export const baseUrl = 'Serenity.Demo.Northwind/OrderDetail';

    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<OrderDetailRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<OrderDetailRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export declare enum Methods {
        Retrieve = "Serenity.Demo.Northwind/OrderDetail/Retrieve",
        List = "Serenity.Demo.Northwind/OrderDetail/List"
    }

    [
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>OrderDetailService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}
