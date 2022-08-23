namespace Serenity.Demo.Northwind {
    export namespace OrderDetailService {
        export const baseUrl = 'Serenity.Demo.Northwind/OrderDetail';

        export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<OrderDetailRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<OrderDetailRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

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
