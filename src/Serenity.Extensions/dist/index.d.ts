/// <reference types="jquery" />
/// <reference types="jqueryui" />
/// <reference types="jquery.validation" />
import { DeleteResponse, Dictionary, ListRequest, ListResponse, PropertyItem, RetrieveResponse, SaveResponse, ServiceError, ServiceOptions, ServiceRequest, ServiceResponse } from "@serenity-is/corelib/q"
import { DataGrid, EntityDialog, EntityGrid, IGetEditValue, ISetEditValue, PropertyDialog, Select2AjaxEditor, SettingStorage, TemplatedDialog, ToolButton, Widget } from "@serenity-is/corelib"
import { Formatter, Grid, GridOptions } from "@serenity-is/sleekgrid"
import { FormatterContext } from "@serenity-is/corelib/slick"

interface ExcelImportRequest extends ServiceRequest {
    FileName?: string;
}
interface ExcelImportResponse extends ServiceResponse {
    Inserted?: number;
    Updated?: number;
    ErrorList?: string[];
}
interface GetNextNumberRequest extends ServiceRequest {
    Prefix?: string;
    Length?: number;
}
interface GetNextNumberResponse extends ServiceResponse {
    Number?: number;
    Serial?: string;
}
interface UserPreferenceRetrieveRequest extends ServiceRequest {
    PreferenceType?: string;
    Name?: string;
}
interface UserPreferenceRetrieveResponse extends ServiceResponse {
    Value?: string;
}
interface UserPreferenceRow {
    UserPreferenceId?: number;
    UserId?: number;
    PreferenceType?: string;
    Name?: string;
    Value?: string;
}
export namespace UserPreferenceRow {
    const idProperty = "UserPreferenceId";
    const nameProperty = "Name";
    const localTextPrefix = "Common.UserPreference";
    const deletePermission = "";
    const insertPermission = "";
    const readPermission = "";
    const updatePermission = "";

    const enum Fields {
        UserPreferenceId = "UserPreferenceId",
        UserId = "UserId",
        PreferenceType = "PreferenceType",
        Name = "Name",
        Value = "Value"
    }
}

export namespace UserPreferenceService {
    const baseUrl = "Extensions/UserPreference";
    function Update(request: UserPreferenceUpdateRequest, onSuccess?: (response: ServiceResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    function Retrieve(request: UserPreferenceRetrieveRequest, onSuccess?: (response: UserPreferenceRetrieveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    const enum Methods {
        Update = "Extensions/UserPreference/Update",
        Retrieve = "Extensions/UserPreference/Retrieve"
    }
}
interface UserPreferenceUpdateRequest extends ServiceRequest {
    PreferenceType?: string;
    Name?: string;
    Value?: string;
}
interface ReportRetrieveResult extends ServiceResponse {
    IsExternalReport?: boolean;
    ReportKey?: string;
    Title?: string;
    Properties?: PropertyItem[];
    InitialSettings?: any;
    IsDataOnlyReport?: boolean;
}
export class BasicProgressDialog extends TemplatedDialog<any> {
    constructor();
    cancelled: boolean;
    get max(): number;
    set max(value: number);
    get value(): number;
    set value(value: number);
    get title(): string;
    set title(value: string);
    cancelTitle: string;
    getDialogButtons(): {
        text: string;
        click: () => void;
    }[];
    getDialogOptions(): JQueryUI.DialogOptions;
    initDialog(): void;
    getTemplate(): string;
}
export class BulkServiceAction {
    protected keys: string[];
    protected queue: string[];
    protected queueIndex: number;
    protected progressDialog: BasicProgressDialog;
    protected pendingRequests: number;
    protected completedRequests: number;
    protected errorByKey: Dictionary<ServiceError>;
    private successCount;
    private errorCount;
    done: () => void;
    protected createProgressDialog(): void;
    protected getConfirmationFormat(): string;
    protected getConfirmationMessage(targetCount: any): string;
    protected confirm(targetCount: any, action: any): void;
    protected getNothingToProcessMessage(): string;
    protected nothingToProcess(): void;
    protected getParallelRequests(): number;
    protected getBatchSize(): number;
    protected startParallelExecution(): void;
    protected serviceCallCleanup(): void;
    protected executeForBatch(batch: string[]): void;
    protected executeNextBatch(): void;
    protected getAllHadErrorsFormat(): string;
    protected showAllHadErrors(): void;
    protected getSomeHadErrorsFormat(): string;
    protected showSomeHadErrors(): void;
    protected getAllSuccessFormat(): string;
    protected showAllSuccess(): void;
    protected showResults(): void;
    execute(keys: string[]): void;
    get_successCount(): any;
    set_successCount(value: number): void;
    get_errorCount(): any;
    set_errorCount(value: number): void;
}
interface ExcelExportOptions {
    grid: DataGrid<any, any>;
    service: string;
    onViewSubmit: () => boolean;
    editRequest?: (request: ListRequest) => ListRequest;
    title?: string;
    hint?: string;
    separator?: boolean;
}
export namespace ExcelExportHelper {
    function createToolButton(options: ExcelExportOptions): ToolButton;
}
declare var jsPDF: any;
declare interface jsPDF {
    autoTableEndPosY?: number;
    autoTableHtmlToJson(table: HTMLElement): any;
    autoTable(columns: string[] | jsPDF.AutoTableColumn[], data: any[], options: jsPDF.AutoTableOptions): any;
    autoTableText(text: string, x: number, y: number, styles: jsPDF.AutoTableStyles): any;
}
declare global {
    namespace jsPDF {
        interface AutoTableColumn {
            title?: string;
            dataKey?: string;
        }
        interface AutoTableOptions {
            tableWidth?: 'wrap';
            theme?: 'striped' | 'grid' | 'plain';
            startY?: number;
            styles?: AutoTableStyles;
            headerStyles?: AutoTableStyles;
            bodyStyles?: AutoTableStyles;
            columnStyles?: {
                [dataKey: string]: AutoTableStyles;
            };
            margin?: AutoTableMargin;
            didDrawCell?: (data: CellHookData) => void;
            didDrawPage?: (data: HookData) => void;
            head?: [AutoTableColumn[]];
            body?: {}[];
        }
        interface HookData {
            table?: any;
            pageNumber?: number;
            pageCount?: number;
            settings?: {};
            doc?: any;
            cursor?: {
                x?: number;
                y?: number;
            };
        }
        interface CellHookData extends HookData {
            cell?: {
                x?: number;
                y?: number;
            };
            row?: any;
            column?: AutoTableColumn;
            section?: 'head' | 'body' | 'foot';
        }
        interface AutoTableMargin {
            horizontal?: number;
            top?: number;
            left?: number;
            right?: number;
            bottom?: number;
        }
        interface AutoTableStyles {
            cellPadding?: number;
            fontSize?: number;
            font?: string;
            lineColor?: number | number[];
            lineWidth?: number;
            lineHeight?: number;
            fontStyle?: string;
            fillColor?: number | number[];
            textColor?: number | number[];
            halign?: 'left' | 'center' | 'right';
            valign?: 'top' | 'middle' | 'bottom';
            fillStyle?: 'S' | 'F' | 'DF';
            rowHeight?: number;
            columnWidth?: 'auto' | 'wrap' | number;
            overflow?: 'linebreak';
        }
    }
    var jspdf: any;
}

interface PdfExportOptions {
    grid: DataGrid<any, any>;
    onViewSubmit: () => boolean;
    title?: string;
    hint?: string;
    separator?: boolean;
    reportTitle?: string;
    titleTop?: number;
    titleFontSize?: number;
    fileName?: string;
    pageNumbers?: boolean;
    columnTitles?: {
        [key: string]: string;
    };
    tableOptions?: jsPDF.AutoTableOptions;
    output?: string;
    autoPrint?: boolean;
    printDateTimeHeader?: boolean;
}
export namespace PdfExportHelper {
    function exportToPdf(options: PdfExportOptions): void;
    function createToolButton(options: PdfExportOptions): ToolButton;
}
export class EnumSelectFormatter implements Formatter {
    constructor();
    format(ctx: FormatterContext): string;
    enumKey: string;
    allowClear: boolean;
    emptyItemText: string;
}
export class SingleLineTextFormatter implements Formatter {
    format(ctx: FormatterContext): string;
    static formatValue(value: string): string;
}
export class GridEditorBase<TEntity, TOptions = any> extends EntityGrid<TEntity, TOptions> implements IGetEditValue, ISetEditValue {
    protected getIdProperty(): string;
    protected nextId: number;
    constructor(container: JQuery, opt?: TOptions);
    protected id(entity: TEntity): any;
    protected getNextId(): string;
    protected setNewId(entity: TEntity): void;
    protected save(opt: ServiceOptions<any>, callback: (r: ServiceResponse) => void): void;
    protected deleteEntity(id: number): boolean;
    protected validateEntity(row: TEntity, id: number): boolean;
    protected setEntities(items: TEntity[]): void;
    protected getNewEntity(): TEntity;
    protected getButtons(): ToolButton[];
    protected editItem(entityOrId: any): void;
    getEditValue(property: any, target: any): void;
    setEditValue(source: any, property: any): void;
    get value(): TEntity[];
    set value(value: TEntity[]);
    protected getGridCanLoad(): boolean;
    protected usePager(): boolean;
    protected getInitialTitle(): any;
    protected createQuickSearchInput(): void;
}
export class GridEditorDialog<TEntity> extends EntityDialog<TEntity, any> {
    protected getIdProperty(): string;
    onSave: (options: ServiceOptions<SaveResponse>, callback: (response: SaveResponse) => void) => void;
    onDelete: (options: ServiceOptions<DeleteResponse>, callback: (response: DeleteResponse) => void) => void;
    destroy(): void;
    protected updateInterface(): void;
    protected saveHandler(options: ServiceOptions<SaveResponse>, callback: (response: SaveResponse) => void): void;
    protected deleteHandler(options: ServiceOptions<DeleteResponse>, callback: (response: DeleteResponse) => void): void;
}
export class ReportDialog extends TemplatedDialog<ReportDialogOptions> {
    private report;
    private propertyGrid;
    constructor(options: ReportDialogOptions);
    protected getDialogButtons(): any;
    protected createPropertyGrid(): void;
    protected loadReport(reportKey: string): void;
    protected updateInterface(): void;
    executeReport(target: string, ext: string, download: boolean): void;
    getToolbarButtons(): ({
        title: string;
        cssClass: string;
        onClick: () => void;
        icon?: undefined;
    } | {
        title: string;
        cssClass: string;
        icon: string;
        onClick: () => void;
    })[];
    getTemplate(): string;
}
interface ReportDialogOptions {
    reportKey: string;
}
interface ReportExecuteOptions {
    reportKey: string;
    download?: boolean;
    extension?: 'pdf' | 'htm' | 'html' | 'xlsx' | 'docx';
    getParams?: () => any;
    params?: {
        [key: string]: any;
    };
    target?: string;
}
interface ReportButtonOptions extends ReportExecuteOptions {
    title?: string;
    cssClass?: string;
    icon?: string;
}
namespace ReportHelper {
    function createToolButton(options: ReportButtonOptions): ToolButton;
    function execute(options: ReportExecuteOptions): void;
}
export class ReportPage extends Widget<any> {
    constructor(element: JQuery);
    protected updateMatchFlags(text: string): void;
    protected reportLinkClick(e: any): void;
}
export class UserPreferenceStorage implements SettingStorage {
    getItem(key: string): string;
    setItem(key: string, data: string): void;
}
export namespace DialogUtils {
    function pendingChangesConfirmation(element: JQuery, hasPendingChanges: () => boolean): void;
}
interface PromptDialogOptions {
    cssClass?: string;
    editorType?: string;
    editorOptions?: any;
    title?: string;
    message?: string;
    isHtml?: boolean;
    value?: any;
    required?: boolean;
    validateValue: (v: any) => boolean;
}
export class PromptDialog extends PropertyDialog<any, PromptDialogOptions> {
    constructor(opt: PromptDialogOptions);
    protected getDialogButtons(): {
        text: string;
        click: () => void;
    }[];
    protected loadInitialEntity(): void;
    protected getPropertyItems(): {
        name: string;
        editorType: string;
        required: any;
        editorParams: any;
    }[];
    get value(): any;
    set value(v: any);
    static prompt(title: string, message: string, value: string, validateValue: (string: any) => boolean): void;
}
export class SelectableEntityGrid<TItem, TOptions> extends EntityGrid<TItem, TOptions> {
    protected getSlickOptions(): GridOptions;
    protected createSlickGrid(): Grid;
}
interface ServiceEditorOptions {
    cascadeFrom?: string;
    cascadeField?: string;
    cascadeValue?: any;
}
export class ServiceEditorBase<TOptions extends ServiceEditorOptions, TRow> extends Select2AjaxEditor<TOptions, TRow> {
    private cascadeLink;
    constructor(hidden: JQuery, options: TOptions);
    private setCascadeFrom;
    get cascadeValue(): any;
    set cascadeValue(value: any);
    get cascadeField(): any;
    set cascadeField(value: any);
    get cascadeFrom(): any;
    set cascadeFrom(value: any);
    private getCascadeFromValue;
    protected getIncludeColumns(): string[];
    protected getSort(): string[];
    getTypeDelay(): number;
    private lastRequest;
    executeQueryByKey(options: ServiceOptions<RetrieveResponse<TRow>>): void;
    executeQuery(options: ServiceOptions<ListResponse<TRow>>): void;
}
/**
    * This is an editor widget but it only displays a text, not edits it.
    *
    */
export class StaticTextBlock extends Widget<StaticTextBlockOptions> implements ISetEditValue {
    private value;
    constructor(container: JQuery, options: StaticTextBlockOptions);
    private updateElementContent;
    /**
        * By implementing ISetEditValue interface, we allow this editor to display its field value.
        * But only do this when our text content is not explicitly set in options
        */
    setEditValue(source: any, property: PropertyItem): void;
}
export interface StaticTextBlockOptions {
    text: string;
    isHtml: boolean;
    isLocalText: boolean;
    hideLabel: boolean;
}