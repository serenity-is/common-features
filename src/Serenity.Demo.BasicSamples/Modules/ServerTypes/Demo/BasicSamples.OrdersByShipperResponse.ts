import { ServiceResponse } from "@serenity-is/corelib/q";

export interface OrdersByShipperResponse extends ServiceResponse {
    Values?: { [key: string]: any }[];
    ShipperKeys?: string[];
    ShipperLabels?: string[];
}