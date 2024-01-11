import { Fluent, attachToDialogBeforeCloseEvent, closeDialog, closePanel, confirmDialog, getDialogEventTarget, getjQuery, isArrayLike, localText } from "@serenity-is/corelib";

export namespace DialogUtils {

    export function pendingChangesConfirmation(element: ArrayLike<HTMLElement> | HTMLElement, hasPendingChanges: () => boolean) {

        let dialog = getDialogEventTarget(element);
        if (!dialog)
            return;
        attachToDialogBeforeCloseEvent(dialog, function (e) {
            if ((dialog.dataset.ackuntil && new Date().getTime() < parseInt(dialog.dataset.ackuntil, 10)) ||
                !hasPendingChanges()) {
                return;
            }

            e.preventDefault();
            e.stopImmediatePropagation();
            confirmDialog(localText('Site.Dialogs.PendingChangesConfirmation'),
                () => {
                    dialog.dataset.ackuntil = "" + new Date().getTime() + 10000;
                    (dialog.querySelector('div.save-and-close-button') as HTMLElement)?.click()
                },
                {
                    onNo: function () {
                        dialog.dataset.ackuntil = "" + new Date().getTime() + 1000;
                        closeDialog(dialog);
                    }
                });
        });
    }
}
