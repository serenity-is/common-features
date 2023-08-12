/** @jsxImportSource jsx-dom */
import { Texts } from "@/ServerTypes/Texts";
import { TemplatedPanel } from "@serenity-is/corelib";
import { informationDialog, parseQueryString, resolveUrl, serviceCall } from "@serenity-is/corelib/q";
import { SendResetPasswordResponse } from "../../ServerTypes/Extensions/SendResetPasswordResponse";

export default function pageInit() {
    new SetPasswordPage($('#PanelDiv')
        .addClass('s-container-tight mt-5'));
}

const myTexts = Texts.Forms.Membership.ChangePassword;

class SetPasswordPage extends TemplatedPanel<any> {

    protected submitClick() {
        if (!this.validateForm())
            return;

        serviceCall({
            url: resolveUrl('~/Account/SendResetPassword'),
            onSuccess: (response: SendResetPasswordResponse) => {
                if (response.DemoLink) {
                    informationDialog("If this wasn't a demo we would send you a reset password email. " +
                        "Since this is a demo we will just redirect you to set your password.", () => {
                        window.location.href = resolveUrl(response.DemoLink);
                    });
                }
                else {
                    informationDialog(myTexts.SetPasswordSuccess, () => {
                        window.location.href = resolveUrl('~/');
                    });
                }
            }
        })
    }

    renderContents() {
        this.element.empty().append(
            <div class="s-Panel">
                <h3 class="page-title mb-4 text-center">{myTexts.SetPassword}</h3>
                {
                    parseQueryString()["reason"] == "elevate" ?
                        <p>{myTexts.ElevatedActions}</p> :
                        <p>{myTexts.SetPasswordInfo}</p>
                }
                <form>
                    <button class="btn btn-primary w-100" onClick={e => {
                        e.preventDefault();
                        this.submitClick()
                    }}>{myTexts.SetPasswordButton}</button>
                </form>
            </div>
        );
    }
}

