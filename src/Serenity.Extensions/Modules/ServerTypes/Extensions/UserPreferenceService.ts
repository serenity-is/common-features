import { UserPreferenceUpdateRequest } from "./UserPreferenceUpdateRequest";
import { ServiceResponse, ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";
import { UserPreferenceRetrieveRequest } from "./UserPreferenceRetrieveRequest";
import { UserPreferenceRetrieveResponse } from "./UserPreferenceRetrieveResponse";

export namespace UserPreferenceService {
    export const baseUrl = 'Extensions/UserPreference';

    export declare function Update(request: UserPreferenceUpdateRequest, onSuccess?: (response: ServiceResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: UserPreferenceRetrieveRequest, onSuccess?: (response: UserPreferenceRetrieveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Update: "Extensions/UserPreference/Update",
        Retrieve: "Extensions/UserPreference/Retrieve"
    } as const;

    [
        'Update', 
        'Retrieve'
    ].forEach(x => {
        (<any>UserPreferenceService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}