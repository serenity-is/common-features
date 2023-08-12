import { ServiceResponse } from "@serenity-is/corelib/q";

export interface ResetPasswordResponse extends ServiceResponse {
    RedirectHome?: boolean;
}