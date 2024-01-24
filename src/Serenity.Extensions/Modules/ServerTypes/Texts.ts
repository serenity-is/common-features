import { proxyTexts } from "@serenity-is/corelib";

namespace Serenity.Extensions.Texts {

    export declare namespace Db {

        namespace Common {

            namespace UserPreference {
                export const Name: string;
                export const PreferenceType: string;
                export const UserId: string;
                export const UserPreferenceId: string;
                export const Value: string;
            }
        }
    }

    export declare namespace Forms {

        namespace Membership {

            namespace ChangePassword {
                export const ElevatedActions: string;
                export const FormTitle: string;
                export const PasswordNotSet: string;
                export const SetPassword: string;
                export const SetPasswordButton: string;
                export const SetPasswordInfo: string;
                export const SetPasswordSuccess: string;
                export const SubmitButton: string;
                export const Success: string;
            }

            namespace ForgotPassword {
                export const FormInfo: string;
                export const FormTitle: string;
                export const SubmitButton: string;
                export const SuccessMessage: string;
            }

            namespace ResetPassword {
                export const EmailSubject: string;
                export const FormTitle: string;
                export const SubmitButton: string;
                export const Success: string;
            }
        }
    }

    export declare namespace Site {

        namespace BasicProgressDialog {
            export const CancelTitle: string;
            export const PleaseWait: string;
        }

        namespace BulkServiceAction {
            export const AllHadErrorsFormat: string;
            export const AllSuccessFormat: string;
            export const ConfirmationFormat: string;
            export const ErrorCount: string;
            export const NothingToProcess: string;
            export const SomeHadErrorsFormat: string;
            export const SuccessCount: string;
        }

        namespace Dialogs {
            export const PendingChangesConfirmation: string;
            export const PendingChangesUnloadWarning: string;
        }

        namespace Translation {
            export const Assembly: string;
            export const CopyFailMessage: string;
            export const CopySourceTranslations: string;
            export const CopySuccessMessage: string;
            export const CopyTargetTranslations: string;
            export const CustomText: string;
            export const EntityPlural: string;
            export const HasTranslation: string;
            export const Key: string;
            export const OverrideConfirmation: string;
            export const SaveChangesButton: string;
            export const SaveSuccessMessage: string;
            export const SourceLanguage: string;
            export const SourceText: string;
            export const TargetLanguage: string;
            export const TargetText: string;
            export const UserTranslated: string;
        }
    }

    export declare namespace Validation {
        export const InvalidResetToken: string;
        export const MinRequiredPasswordLength: string;
        export const PasswordConfirmMismatch: string;
        export const PasswordStrengthRequireDigit: string;
        export const PasswordStrengthRequireLowercase: string;
        export const PasswordStrengthRequireNonAlphanumeric: string;
        export const PasswordStrengthRequireUppercase: string;
    }

    Serenity.Extensions['Texts'] = proxyTexts(Texts, '', {
        Db: {
            Common: {
                UserPreference: {}
            }
        },
        Forms: {
            Membership: {
                ChangePassword: {},
                ForgotPassword: {},
                ResetPassword: {}
            }
        },
        Site: {
            BasicProgressDialog: {},
            BulkServiceAction: {},
            Dialogs: {},
            Translation: {}
        },
        Validation: {}
    }) as any;
}

export const Texts = Serenity.Extensions.Texts;