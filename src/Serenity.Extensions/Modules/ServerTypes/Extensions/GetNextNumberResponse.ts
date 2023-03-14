import { ServiceResponse } from "@serenity-is/corelib/q";

export interface GetNextNumberResponse extends ServiceResponse {
    Number?: number;
    Serial?: string;
}