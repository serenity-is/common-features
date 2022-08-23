namespace Serenity.Extensions {
    export namespace UserPreferenceService {
        export const baseUrl = 'Extensions/UserPreference';

        export declare function Update(request: UserPreferenceUpdateRequest, onSuccess?: (response: ServiceResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Retrieve(request: UserPreferenceRetrieveRequest, onSuccess?: (response: UserPreferenceRetrieveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            Update = "Extensions/UserPreference/Update",
            Retrieve = "Extensions/UserPreference/Retrieve"
        }

        [
            'Update', 
            'Retrieve'
        ].forEach(x => {
            (<any>UserPreferenceService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}
