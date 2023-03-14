import { ServiceRequest } from "@serenity-is/corelib/q";

export interface UserPreferenceUpdateRequest extends ServiceRequest {
    PreferenceType?: string;
    Name?: string;
    Value?: string;
}