namespace Serenity.Extensions {
    export interface ExcelImportResponse extends ServiceResponse {
        Inserted?: number;
        Updated?: number;
        ErrorList?: string[];
    }
}
