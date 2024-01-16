import { Dialog, confirmDialog, isArrayLike, localText } from "@serenity-is/corelib";

export namespace DialogUtils {

    export function pendingChangesConfirmation(element: ArrayLike<HTMLElement> | HTMLElement, hasPendingChanges: () => boolean) {

        var el = isArrayLike(element) ? element[0] : element;
        var dialog = Dialog.getInstance(element);
        dialog?.onClose((_, e: Event) => {

            if (dialog?.result === "save-and-close" || dialog?.result === "save" || dialog?.result === "delete" || dialog?.result === "done" ||
                (el.dataset.ackuntil && 
                new Date().getTime() < parseInt(el.dataset.ackuntil, 10)) ||
                !hasPendingChanges()) {
                return;
            }

            e.preventDefault();
            e.stopImmediatePropagation();
            confirmDialog(localText('Site.Dialogs.PendingChangesConfirmation'),
                () => {
                    el.dataset.ackuntil = "" + new Date().getTime() + 1000;
                    (el.querySelector('div.save-and-close-button') as HTMLElement)?.click()
                },
                {
                    onNo: function () {
                        el.dataset.ackuntil = "" + new Date().getTime() + 1000;
                        dialog?.close(dialog?.result);
                    }
                });
        }, /*before*/ true);
    }
}
