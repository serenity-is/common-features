import { ServiceRequest } from "@serenity-is/corelib/q";

export interface GetNextNumberRequest extends ServiceRequest {
    Prefix?: string;
    Length?: number;
}