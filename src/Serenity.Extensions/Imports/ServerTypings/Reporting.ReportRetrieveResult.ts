namespace Serenity.Reporting {
    export interface ReportRetrieveResult extends ServiceResponse {
        IsExternalReport?: boolean;
        ReportKey?: string;
        Title?: string;
        Properties?: PropertyItem[];
        InitialSettings?: any;
        IsDataOnlyReport?: boolean;
    }
}
