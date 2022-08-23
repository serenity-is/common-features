namespace Serenity.Extensions {
    export interface UserPreferenceRetrieveRequest extends ServiceRequest {
        PreferenceType?: string;
        Name?: string;
    }
}
