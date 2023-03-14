import { ServiceRequest } from "@serenity-is/corelib/q";

export interface ExcelImportRequest extends ServiceRequest {
    FileName?: string;
}