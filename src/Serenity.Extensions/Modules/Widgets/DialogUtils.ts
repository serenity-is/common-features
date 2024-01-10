import { Fluent, closePanel, confirmDialog, getjQuery, isArrayLike, localText } from "@serenity-is/corelib";

export namespace DialogUtils {
    export function pendingChangesConfirmation(element: ArrayLike<HTMLElement> | HTMLElement, hasPendingChanges: () => boolean) {

        let dialogNode = isArrayLike(element) ? element[0] : element;
        Fluent.on(dialogNode, "dialogbeforeclose panelbeforeclose", function (e) {
            if (dialogNode.dataset.confirmedclose || !hasPendingChanges()) {
                return;
            }

            e.preventDefault();
            confirmDialog(localText('Site.Dialogs.PendingChangesConfirmation'),
                () => {
                    dialogNode.dataset.confirmedclose = "true";
                    try {
                        (dialogNode.querySelector('div.save-and-close-button') as HTMLElement)?.click()
                    }
                    finally {
                        delete dialogNode.dataset.confirmedclose;
                    }
                },
                {
                    onNo: function () {
                        dialogNode.dataset.confirmedclose = "true";
                        try {
                            let $ = getjQuery();
                            if (dialogNode.classList.contains('ui-dialog-content') && $)
                                $(dialogNode).dialog('close');
                            else if (dialogNode.classList.contains('s-Panel') ||
                                dialogNode.classList.contains('s-PanelBody'))
                                closePanel(element);
                        }
                        finally {
                            delete dialogNode.dataset.confirmedclose;
                        }
                    }
                });
        });
    }
}
