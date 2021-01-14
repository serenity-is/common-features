namespace Serenity.Extensions.DialogUtils {
    export function pendingChangesConfirmation(element: JQuery, hasPendingChanges: () => boolean) {
        element.on('dialogbeforeclose panelbeforeclose', function (e) {
            if (!Serenity.WX.hasOriginalEvent(e) || !hasPendingChanges()) {
                return;
            }

            e.preventDefault();
            Q.confirm(Q.text('Site.Dialogs.PendingChangesConfirmation'),
                () => element.find('div.save-and-close-button').click(),
                {
                    onNo: function () {
                        if (element.hasClass('ui-dialog-content'))
                            element.dialog('close');
                        else if (element.hasClass('s-Panel'))
                            Serenity.TemplatedDialog.closePanel(element);
                    }
                });
        });
    }
}
