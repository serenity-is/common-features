namespace Serenity.Demo.BasicSamples {
    export interface OrdersByShipperResponse extends ServiceResponse {
        Values?: { [key: string]: any }[];
        ShipperKeys?: string[];
        ShipperLabels?: string[];
    }
}
