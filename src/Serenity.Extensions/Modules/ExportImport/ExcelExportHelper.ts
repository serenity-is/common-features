import { DataGrid, ToolButton } from "@serenity-is/corelib";
import { coalesce, deepClone, ListRequest, postToService } from "@serenity-is/corelib/q";

export interface ExcelExportOptions {
    grid: DataGrid<any, any>;
    service: string;
    onViewSubmit: () => boolean;
    editRequest?: (request: ListRequest) => ListRequest;
    title?: string;
    hint?: string;
    separator?: boolean;
}

export namespace ExcelExportHelper {

    export function createToolButton(options: ExcelExportOptions): ToolButton {

        return {
            hint: coalesce(options.hint, 'Excel'),
            title: coalesce(options.title, ''),
            cssClass: 'export-xlsx-button',
            icon: 'fa-file-excel-o',
            onClick: function () {
                if (!options.onViewSubmit()) {
                    return;
                }

                let grid = options.grid;

                var request = deepClone(grid.getView().params) as ListRequest;
                request.Take = 0;
                request.Skip = 0;
                var sortBy = grid.getView().sortBy;
                if (sortBy) {
                    request.Sort = sortBy;
                }

                request.ExportColumns = [];
                let columns = grid.getGrid().getColumns();
                for (let column of columns) {
                    request.ExportColumns.push(column.id || column.field);
                }

                if (options.editRequest)
                    request = options.editRequest(request);

                postToService({ service: options.service, request: request, target: '_blank' });
            },
            separator: options.separator
        };
    }
}