import { Decorators, PropertyDialog } from "@serenity-is/corelib";
import { coalesce, isEmptyOrNull, localText } from "@serenity-is/corelib/q";

export interface PromptDialogOptions {
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

@Decorators.registerClass("Serenity.Extensions.PromptDialog")
export class PromptDialog extends PropertyDialog<any, PromptDialogOptions> {

    constructor(opt: PromptDialogOptions) {
        super(opt);

        if (!isEmptyOrNull(this.options.cssClass))
            this.element.addClass(this.options.cssClass);

        if (!isEmptyOrNull(this.options.message)) {
            var msg = $("<div/>").addClass("message")
                .insertBefore(this.byId("PropertyGrid"));
            this.options.isHtml ? msg.html(this.options.message) : msg.text(this.options.message);
        }

        this.dialogTitle = this.options.title || "Prompt";

    }

    protected getDialogButtons() {
        return [
            {
                text: localText("Dialogs.OkButton"),
                click: () => {
                    if (!this.validateForm())
                        return;

                    if (this.options.validateValue == null || this.options.validateValue(this.value))
                        this.dialogClose();
                },
            },
            {
                text: localText("Dialogs.CancelButton"),
                click: () => this.dialogClose()
            }
        ];
    }

    protected loadInitialEntity() {
        this.value = this.options.value;
    }

    protected getPropertyItems() {
        return [
            {
                name: "Value",
                editorType: this.options.editorType || "String",
                required: coalesce(this.options.required, true),
                editorParams: this.options.editorOptions
            }
        ]
    }

    public get value() {
        return (this.getSaveEntity() as any).Value;
    }

    public set value(v: any) {
        this.propertyGrid.load(
            {
                Value: v
            });
    }

    public static prompt(title: string, message: string, value: string, validateValue: (string) => boolean) {
        new PromptDialog({
            title: title,
            message: message,
            value: value,
            validateValue: v => validateValue(v)
        }).dialogOpen();
    }
}