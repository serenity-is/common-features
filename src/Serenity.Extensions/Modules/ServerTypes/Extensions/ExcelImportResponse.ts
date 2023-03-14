import { ServiceResponse } from "@serenity-is/corelib/q";

export interface ExcelImportResponse extends ServiceResponse {
    Inserted?: number;
    Updated?: number;
    ErrorList?: string[];
}