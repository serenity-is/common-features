namespace Serenity.Demo.Northwind {
    export namespace OrderDetailService {
        export const baseUrl = 'Serenity.Demo.Northwind/OrderDetail';

        export declare function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<OrderDetailRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<OrderDetailRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            Retrieve = "Serenity.Demo.Northwind/OrderDetail/Retrieve",
            List = "Serenity.Demo.Northwind/OrderDetail/List"
        }

        [
            'Retrieve', 
            'List'
        ].forEach(x => {
            (<any>OrderDetailService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}
