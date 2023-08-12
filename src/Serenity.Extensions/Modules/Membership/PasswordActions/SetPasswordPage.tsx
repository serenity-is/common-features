/** @jsxImportSource jsx-dom */
import {Texts} from "@/ServerTypes/Texts";
import {TemplatedPanel} from "@serenity-is/corelib";
import {informationDialog, resolveUrl, serviceCall} from "@serenity-is/corelib/q";


export default function pageInit() {
    $(function () {
        new SetPasswordPage($('#PanelDiv')
            .addClass('s-container-tight mt-5'));
    });
}

const myTexts = Texts.Forms.Membership.ChangePassword;

class SetPasswordPage extends TemplatedPanel<any> {
    
    protected submitClick() {
        if (!this.validateForm())
            return;

        serviceCall({
            url: resolveUrl('~/Account/SendResetPassword'),
            onSuccess: () => {
                informationDialog(myTexts.SetPasswordSuccess, () => {
                    window.location.href = resolveUrl('~/');
                })
            }
        })
    }

    renderContents() {
        this.element.empty().append(
            <div class="s-Panel">
                <h3 class="page-title mb-4 text-center">{myTexts.SetPassword}</h3>
                <p>{myTexts.SetPasswordInfo}</p>
                <form>
                    <button class="btn btn-primary w-100" onClick={e => {
                        e.preventDefault();
                        this.submitClick()
                    }}>{myTexts.SetPassword}</button>
                </form>
            </div>
        );
    }
}

