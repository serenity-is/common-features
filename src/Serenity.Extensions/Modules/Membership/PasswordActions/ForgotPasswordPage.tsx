/** @jsxImportSource jsx-dom */
import { Texts } from "@/ServerTypes/Texts";
import { PropertyPanel } from "@serenity-is/corelib";
import { informationDialog, resolveUrl, serviceCall } from "@serenity-is/corelib";
import { ForgotPasswordForm } from "../../ServerTypes/Extensions/ForgotPasswordForm";
import { ForgotPasswordRequest } from "../../ServerTypes/Extensions/ForgotPasswordRequest";
import { AccountPanelTitle } from "../AccountPanelTitle";


export default function pageInit() {
    new ForgotPasswordPanel($('#PanelDiv')
        .addClass('s-full-page justify-content-center s-Form'));
}

const myTexts = Texts.Forms.Membership.ForgotPassword;

export class ForgotPasswordPanel extends PropertyPanel<ForgotPasswordRequest, any> {

    protected getFormKey() { return ForgotPasswordForm.formKey; }

    protected submitClick() {
        if (!this.validateForm())
            return;

        var request = this.getSaveEntity();
        serviceCall({
            url: resolveUrl('~/Account/ForgotPassword'),
            request: request,
            onSuccess: () => {
                informationDialog(myTexts.SuccessMessage, () => {
                    window.location.href = resolveUrl('~/');
                });
            }
        });
    }

    renderContents() {
        const id = this.useIdPrefix();
        this.element.empty().append(
            <div class="s-container-tight">
                <AccountPanelTitle />
                <div class="s-Panel p-4">
                    <h5 class="text-center mb-4">{myTexts.FormTitle}</h5>
                    <p class="text-center">{myTexts.FormInfo}</p>
                    <form id={id.Form} action="">
                        <div id={id.PropertyGrid}></div>
                        <button id={id.SubmitButton} type="submit" class="btn btn-primary mx-8 w-100"
                            onClick={e => { e.preventDefault(); this.submitClick() }}>
                            {myTexts.SubmitButton}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}