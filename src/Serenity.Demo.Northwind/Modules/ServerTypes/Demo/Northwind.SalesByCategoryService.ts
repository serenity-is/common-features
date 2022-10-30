import { ListRequest, ListResponse } from "@serenity-is/corelib";
import { SalesByCategoryRow } from "./Northwind.SalesByCategoryRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace SalesByCategoryService {
    export const baseUrl = 'Serenity.Demo.Northwind/SalesByCategory';

    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<SalesByCategoryRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export declare enum Methods {
        List = "Serenity.Demo.Northwind/SalesByCategory/List"
    }

    [
        'List'
    ].forEach(x => {
        (<any>SalesByCategoryService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}
