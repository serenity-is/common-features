namespace Serenity.Extensions {

    export class BasicProgressDialog extends Serenity.TemplatedDialog<any> {

        constructor() {
            super();

            this.byId('ProgressBar').progressbar({
                max: 100,
                value: 0,
                change: (e, v) => {
                    this.byId('ProgressLabel').text(this.value + ' / ' + this.max);
                }
            });

            this.dialogTitle = Q.text('Site.BasicProgressDialog.PleaseWait');
        }

        public cancelled: boolean;

        public get max(): number {
            return this.byId('ProgressBar').progressbar().progressbar('option', 'max');
        }

        public set max(value: number) {
            this.byId('ProgressBar').progressbar().progressbar('option', 'max', value);
        }

        public get value(): number {
            return this.byId('ProgressBar').progressbar('value');
        }

        public set value(value: number) {
            this.byId('ProgressBar').progressbar().progressbar('value', value);
        }

        public get title(): string {
            return this.dialogTitle;
        }

        public set title(value: string) {
            this.dialogTitle = value;
        }

        public cancelTitle: string;

        getDialogButtons() {
            return [{
                text: Q.text('Dialogs.CancelButton'),
                click: () => {
                    this.cancelled = true;
                    this.element.closest('.ui-dialog')
                        .find('.ui-dialog-buttonpane .ui-button')
                        .attr('disabled', 'disabled')
                        .css('opacity', '0.5');

                    this.element.dialog('option', 'title', Q.trimToNull(this.cancelTitle) ||
                        Q.text('Site.BasicProgressDialog.CancelTitle'));
                }
            }];
        }

        getDialogOptions() {
            var opt = super.getDialogOptions();
            opt.width = 600;
            return opt;
        }

        initDialog() {
            super.initDialog();
            this.element.closest('.ui-dialog').find('.ui-dialog-titlebar-close').hide();
        }

        getTemplate() {
            return (
                "<div class='s-DialogContent s-BasicProgressDialogContent'>" +
                    "<div id='~_StatusText' class='status-text' ></div>" +
                    "<div id='~_ProgressBar' class='progress-bar'>" +
                        "<div id='~_ProgressLabel' class='progress-label' ></div>" +
                    "</div>" +
                "</div>");
        }
    }
}