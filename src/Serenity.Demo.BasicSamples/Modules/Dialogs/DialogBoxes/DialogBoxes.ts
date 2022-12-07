import { alert, confirm, information, notifySuccess, notifyInfo, notifyError, success, warning } from "@serenity-is/corelib/q";

export namespace DialogBoxes {
    export function initializePage() {
        confirmDialogButtons();
        confirmWithCustomTitle();
        informationDialog();
        successDialog();
        warningDialog();
        alertDialog();
        alertWithHtmlContent();
    }
}

function confirmDialogButtons() {

    // here we demonstrate how you can detect which button user has clicked
    // second parameter is Yes handler and it is called only when user clicks Yes.
    // third parameter has some additional options, that you should only use when needed

    $('#ConfirmDialogButtons').click(() => {
        confirm(
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
        confirm(
            "This confirmation has a custom title",
            () => {
                notifySuccess("Allright!");
            },
            {
                title: 'Some Custom Confirmation Title'
            });
    });
}

function informationDialog() {

    $('#Information').click(() => {
        information(
            "What a nice day",
            () => {
                notifySuccess("No problem!");
            });
    });
}

function successDialog() {

    $('#Success').click(() => {
        success(
            "Operation complete",
            () => {
                notifySuccess("Well done!");
            });
    });
}

function warningDialog() {

    $('#Warning').click(() => {
        warning("Hey, be careful!");
    });
}

function alertDialog() {

    $('#Alert').click(() => {
        alert("Houston, we got a problem!");
    });
}

function alertWithHtmlContent() {
    $('#AlertWithHtmlContent').click(() => {
        alert("<h4>Here is some HTML content!</h4>" +
            "<ul><li>Item 1</li><li>Item 2</li >" +
            "<li>Visit <a href='https://serenity.is/' target='_blank' style='color: #ddf'>https://serenity.is/</a>!</li></ul>", {
            htmlEncode: false
        });
    });
}