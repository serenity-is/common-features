import { TemplatedDialog, WX } from "@serenity-is/corelib";
import { confirmDialog, localText } from "@serenity-is/corelib";

export namespace DialogUtils {
    export function pendingChangesConfirmation(element: ArrayLike<HTMLElement> | HTMLElement, hasPendingChanges: () => boolean) {
        $(element).on('dialogbeforeclose panelbeforeclose', function (e) {
            if (!WX.hasOriginalEvent(e) || !hasPendingChanges()) {
                return;
            }

            e.preventDefault();
            confirmDialog(localText('Site.Dialogs.PendingChangesConfirmation'),
                () => $(element).find('div.save-and-close-button').click(),
                {
                    onNo: function () {
                        if ($(element).hasClass('ui-dialog-content'))
                            ($(element) as any).dialog('close');
                        else if ($(element).hasClass('s-Panel'))
                            TemplatedDialog.closePanel(element);
                    }
                });
        });
    }
}
