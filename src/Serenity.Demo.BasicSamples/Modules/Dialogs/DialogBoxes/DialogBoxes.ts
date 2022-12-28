import { alertDialog, confirmDialog, informationDialog, notifySuccess, notifyInfo, notifyError, successDialog, warningDialog } from "@serenity-is/corelib/q";

export namespace DialogBoxes {
    export function initializePage() {
        confirmDialogButtons();
        confirmWithCustomTitle();
        informationDialogSample();
        successDialogSample();
        warningDialogSample();
        alertDialogSample();
        alertWithHtmlContent();
    }
}

function confirmDialogButtons() {

    // here we demonstrate how you can detect which button user has clicked
    // second parameter is Yes handler and it is called only when user clicks Yes.
    // third parameter has some additional options, that you should only use when needed

    $('#ConfirmDialogButtons').click(() => {
        confirmDialog(
            "Click one of buttons, or close dialog with [x] on top right, i'll tell you what you did!",
            () => {
                notifySuccess("You clicked YES. Great!");
            },
            {
                onNo: () => {
                    notifyInfo("You clicked NO. Why?");
                },
                onCancel: () => {
                    notifyError("You clicked X. Operation is cancelled. Will try again?");
                }
            });
    });
}

function confirmWithCustomTitle() {

    $('#ConfirmWithCustomTitle').click(() => {
        confirmDialog(
            "This confirmation has a custom title",
            () => {
                notifySuccess("Allright!");
            },
            {
                title: 'Some Custom Confirmation Title'
            });
    });
}

function informationDialogSample() {

    $('#Information').click(() => {
        informationDialog(
            "What a nice day",
            () => {
                notifySuccess("No problem!");
            });
    });
}

function successDialogSample() {

    $('#Success').click(() => {
        successDialog(
            "Operation complete",
            () => {
                notifySuccess("Well done!");
            });
    });
}

function warningDialogSample() {

    $('#Warning').click(() => {
        warningDialog("Hey, be careful!");
    });
}

function alertDialogSample() {

    $('#Alert').click(() => {
        alertDialog("Houston, we got a problem!");
    });
}

function alertWithHtmlContent() {
    $('#AlertWithHtmlContent').click(() => {
        alertDialog("<h4>Here is some HTML content!</h4>" +
            "<ul><li>Item 1</li><li>Item 2</li >" +
            "<li>Visit <a href='https://serenity.is/' target='_blank' style='color: #ddf'>https://serenity.is/</a>!</li></ul>", {
            htmlEncode: false
        });
    });
}