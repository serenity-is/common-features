namespace Serenity.Demo.BasicSamples {
    export namespace BasicSamplesService {
        export const baseUrl = 'Serenity.Demo.BasicSamples';

        export declare function OrdersByShipper(request: OrdersByShipperRequest, onSuccess?: (response: OrdersByShipperResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            OrdersByShipper = "Serenity.Demo.BasicSamples/OrdersByShipper"
        }

        [
            'OrdersByShipper'
        ].forEach(x => {
            (<any>BasicSamplesService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}
