import { OrdersByShipperRequest } from "./BasicSamples.OrdersByShipperRequest";
import { OrdersByShipperResponse } from "./BasicSamples.OrdersByShipperResponse";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace BasicSamplesService {
    export const baseUrl = 'Serenity.Demo.BasicSamples';

    export declare function OrdersByShipper(request: OrdersByShipperRequest, onSuccess?: (response: OrdersByShipperResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export declare enum Methods {
        OrdersByShipper = "Serenity.Demo.BasicSamples/OrdersByShipper"
    }

    [
        'OrdersByShipper'
    ].forEach(x => {
        (<any>BasicSamplesService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}
