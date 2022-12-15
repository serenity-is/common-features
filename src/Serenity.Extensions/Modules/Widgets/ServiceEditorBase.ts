import { CascadedWidgetLink, Decorators, EditorUtils, Select2AjaxEditor, Widget } from "@serenity-is/corelib";
import { ColumnSelection, isEmptyOrNull, ListRequest, ListResponse, RetrieveColumnSelection, RetrieveRequest, RetrieveResponse, serviceCall, ServiceOptions } from "@serenity-is/corelib/q";

export interface ServiceEditorOptions {
    cascadeFrom?: string;
    cascadeField?: string;
    cascadeValue?: any;
}

@Decorators.registerClass("Serenity.Extensions.ServiceEditorBase")
export abstract class ServiceEditorBase<TOptions extends ServiceEditorOptions, TRow>
    extends Select2AjaxEditor<TOptions, TRow> {
    private cascadeLink: CascadedWidgetLink<Widget<any>>;

    constructor(hidden: JQuery, options: TOptions) {
        super(hidden, options);

        this.setCascadeFrom(this.options.cascadeFrom);
    }

    private setCascadeFrom(value: string): void {
        if (isEmptyOrNull(value)) {
            if (this.cascadeLink) {
                this.cascadeLink.set_parentID(null);
                this.cascadeLink = null;
            }

            this.options.cascadeFrom = null;
            return;
        }

        this.cascadeLink = new CascadedWidgetLink(Widget, this,
            p => this.cascadeValue = this.getCascadeFromValue(p));

        this.cascadeLink.set_parentID(value);
        this.options.cascadeFrom = value;
    }

    public get cascadeValue(): any {
        return this.options.cascadeValue;
    }

    public set cascadeValue(value: any) {
        if (value !== this.options.cascadeValue) {
            this.options.cascadeValue = value;
            this.value = null;
        }
    }

    public get cascadeField(): any {
        return this.options.cascadeField || this.options.cascadeFrom;
    }

    public set cascadeField(value: any) {
        this.options.cascadeField = value;
    }

    public get cascadeFrom(): any {
        return this.options.cascadeFrom;
    }

    public set cascadeFrom(value: any) {
        if (value !== this.options.cascadeFrom) {
            this.setCascadeFrom(value);
        }
    }

    private getCascadeFromValue(parent: Widget<any>) {
        return EditorUtils.getValue(parent);
    }

    protected getIncludeColumns(): string[] {
        return [];
    }

    protected getSort(): string[] {
        return [];
    }

    public getTypeDelay(): number {
        return 200;
    }

    private lastRequest: JQueryXHR;

    public executeQueryByKey(options: ServiceOptions<RetrieveResponse<TRow>>): void {
        var request = <RetrieveRequest>options.request;
        request.ColumnSelection = RetrieveColumnSelection.keyOnly;
        request.IncludeColumns = this.getIncludeColumns();
        super.executeQueryByKey(options);
    }

    public executeQuery(options: ServiceOptions<ListResponse<TRow>>): void {

        var request = <ListRequest>options.request;

        request.ColumnSelection = ColumnSelection.KeyOnly;
        request.IncludeColumns = this.getIncludeColumns();
        request.Sort = this.getSort();
        request.ExcludeTotalCount = true;

        if (this.cascadeField) {
            request.EqualityFilter = request.EqualityFilter || {};
            request.EqualityFilter[this.cascadeField] = this.cascadeValue;
        }

        options.blockUI = false;
        options.error = () => { };

        if (this.lastRequest != null && this.lastRequest.readyState != XMLHttpRequest.DONE)
            this.lastRequest.abort();

        this.lastRequest = serviceCall(options);
        this.lastRequest.then(() => this.lastRequest = null, () => this.lastRequest = null);
    }
}