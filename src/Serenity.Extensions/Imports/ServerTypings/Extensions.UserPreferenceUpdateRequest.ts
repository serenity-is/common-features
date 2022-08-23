namespace Serenity.Extensions {
    export interface UserPreferenceUpdateRequest extends ServiceRequest {
        PreferenceType?: string;
        Name?: string;
        Value?: string;
    }
}
