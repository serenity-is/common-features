import { ServiceResponse } from "@serenity-is/corelib/q";

export interface SendResetPasswordResponse extends ServiceResponse {
    DemoLink?: string;
}