import { ListRequest, ListResponse, ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";
import { SalesByCategoryRow } from "./Northwind.SalesByCategoryRow";

export namespace SalesByCategoryService {
    export const baseUrl = 'Serenity.Demo.Northwind/SalesByCategory';

    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<SalesByCategoryRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        List: "Serenity.Demo.Northwind/SalesByCategory/List"
    } as const;

    [
        'List'
    ].forEach(x => {
        (<any>SalesByCategoryService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}