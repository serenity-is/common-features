import { Decorators, DialogTexts, HtmlContentEditor, HtmlNoteContentEditor, TemplatedDialog } from "@serenity-is/corelib";

@Decorators.registerClass('Serenity.Demo.Northwind.NoteDialog')
export class NoteDialog extends TemplatedDialog<any> {

    private textEditor: HtmlContentEditor;

    constructor() {
        super();

        this.textEditor = new HtmlNoteContentEditor({ element: this.byId('Text')[0] });
    }

    protected getTemplate() {
        return (
            "<form id='~_Form' class='s-Form'>" +
            "<textarea id='~_Text' class='required'></textarea>" +
            "</form>");
    }

    protected getDialogButtons() {
        return [
            {
                text: DialogTexts.OkButton,
                click: () => {
                    if (!this.validateForm()) {
                        return;
                    }

                    this.okClick && this.okClick();
                }
            },
            {
                text: DialogTexts.CancelButton,
                click: () => this.dialogClose()
            }
        ];
    }

    get text(): string {
        return this.textEditor.value;
    }

    set text(value: string) {
        this.textEditor.value = value;
    }

    public okClick: () => void;
}
