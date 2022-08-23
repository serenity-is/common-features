namespace Serenity.Extensions {
    export interface GetNextNumberRequest extends ServiceRequest {
        Prefix?: string;
        Length?: number;
    }
}
