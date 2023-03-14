import { ListRequest } from "@serenity-is/corelib/q";

export interface OrderListRequest extends ListRequest {
    ProductID?: number;
}