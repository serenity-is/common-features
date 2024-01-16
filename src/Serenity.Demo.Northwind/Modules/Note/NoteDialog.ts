import { Decorators, DialogButton, HtmlContentEditor, HtmlNoteContentEditor, TemplatedDialog, WidgetProps, cancelDialogButton, okDialogButton } from "@serenity-is/corelib";

@Decorators.registerClass('Serenity.Demo.Northwind.NoteDialog')
export class NoteDialog<P = {}> extends TemplatedDialog<P> {

    private textEditor: HtmlContentEditor;

    constructor(props: WidgetProps<P>) {
        super(props);

        this.textEditor = new HtmlNoteContentEditor({ element: this.byId('Text')[0] });
    }

    protected getTemplate() {
        return (
            "<form id='~_Form' class='s-Form'>" +
            "<textarea id='~_Text' class='required'></textarea>" +
            "</form>");
    }

    protected getDialogButtons(): DialogButton[] {
        return [
            okDialogButton({
                click: (e: Event) => {
                    if (!this.validateForm()) {
                        e.preventDefault();
                        return;
                    }
                    this.okClick && this.okClick();
                }
            }),
            cancelDialogButton()
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
