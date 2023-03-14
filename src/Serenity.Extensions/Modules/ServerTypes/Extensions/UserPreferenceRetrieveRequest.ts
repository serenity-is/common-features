import { ServiceRequest } from "@serenity-is/corelib/q";

export interface UserPreferenceRetrieveRequest extends ServiceRequest {
    PreferenceType?: string;
    Name?: string;
}