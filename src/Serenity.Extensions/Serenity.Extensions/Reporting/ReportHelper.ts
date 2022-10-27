import { ToolButton } from "@serenity-is/corelib";
import { coalesce, postToUrl } from "@serenity-is/corelib/q";

export interface ReportExecuteOptions {
    reportKey: string;
    download?: boolean;
    extension?: 'pdf' | 'htm' | 'html' | 'xlsx' | 'docx';
    getParams?: () => any;
    params?: { [key: string]: any }
    target?: string;
}

export interface ReportButtonOptions extends ReportExecuteOptions {
    title?: string;
    cssClass?: string;
    icon?: string;
}

export namespace ReportHelper {

    export function createToolButton(options: ReportButtonOptions): ToolButton {
        return {
            title: coalesce(options.title, 'Report'),
            cssClass: coalesce(options.cssClass, 'print-button'),
            icon: options.icon,
            onClick: () => {
                ReportHelper.execute(options);
            }
        };
    }

    export function execute(options: ReportExecuteOptions) {
        var opt = options.getParams ? options.getParams() : options.params;

        postToUrl({
            url: '~/Serenity.Extensions/Report/' + (options.download ? 'Download' : 'Render'),
            params: {
                key: options.reportKey,
                ext: coalesce(options.extension, 'pdf'),
                opt: opt ? $.toJSON(opt) : ''
            },
            target: coalesce(options.target, '_blank')
        });
    }
}