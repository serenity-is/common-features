import { Decorators, HtmlContentEditor, HtmlNoteContentEditor, TemplatedDialog } from "@serenity-is/corelib";
import { text } from "@serenity-is/corelib/q";

@Decorators.registerClass('Serenity.Demo.Northwind.NoteDialog')
export class NoteDialog extends TemplatedDialog<any> {

    private textEditor: HtmlContentEditor;

    constructor() {
        super();

        this.textEditor = new HtmlNoteContentEditor(this.byId('Text'));
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
                text: text('Dialogs.OkButton'),
                click: () => {
                    if (!this.validateForm()) {
                        return;
                    }

                    this.okClick && this.okClick();
                }
            },
            {
                text: text('Dialogs.CancelButton'),
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
