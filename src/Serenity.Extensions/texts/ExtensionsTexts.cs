namespace Serenity.Extensions;

[NestedLocalTexts]
public static class ExtensionsTexts
{
    public static class Forms
    {
        public static class Membership
        {
            public static class ChangePassword
            {
                public static readonly LocalText FormTitle = "Change Password";
                public static readonly LocalText SubmitButton = "Change Password";
                public static readonly LocalText Success = "Your password is changed.";
                public static readonly LocalText PasswordNotSet = "Looks like you don't have a password set";
                public static readonly LocalText SetPassword = "Set Password";
                public static readonly LocalText SetPasswordInfo = "Looks like you don't have a password set in your account. Click button to get an email for setting your password.";
                public static readonly LocalText SetPasswordSuccess = "We have sent you an email with password reset instructions.";
                public static readonly LocalText SetPasswordButton = "Send email to reset password";
                public static readonly LocalText ElevatedActions = "You need to set a password for your account to make elevated actions.";
            }

            public static class ForgotPassword
            {
                public static readonly LocalText FormInfo = "Please enter the email you used to signup.";
                public static readonly LocalText FormTitle = "Forgot My Password";
                public static readonly LocalText SubmitButton = "Reset My Password";
                public static readonly LocalText SuccessMessage = "If this user exists, we have sent you an email with password reset instructions.";
            }

            public static class ResetPassword
            {
                public static readonly LocalText EmailSubject = "Reset Your Password";
                public static readonly LocalText FormTitle = "Reset Password";
                public static readonly LocalText SubmitButton = "Reset Password";
                public static readonly LocalText Success = "Your password is changed. Please login with your new password.";
            }
        }
    }

    public static class Site
    {
        public static class BasicProgressDialog
        {
            public static readonly LocalText CancelTitle = "Operation cancelled. Waiting for in progress calls to complete...";
            public static readonly LocalText PleaseWait = "Please wait...";
        }

        public static class BulkServiceAction
        {
            public static readonly LocalText AllHadErrorsFormat = "All {0} record(s) that are processed had errors!";
            public static readonly LocalText AllSuccessFormat = "Finished processing on {0} record(s) with success.";
            public static readonly LocalText ConfirmationFormat = "Perform this operation on {0} selected record(s)?";
            public static readonly LocalText ErrorCount = "{0} error(s)";
            public static readonly LocalText NothingToProcess = "Please select some records to process!";
            public static readonly LocalText SomeHadErrorsFormat = "Finished processing on {0} record(s) with success. {1} record(s) had errors!";
            public static readonly LocalText SuccessCount = "{0} done";
        }

        public static class Dialogs
        {
            public static readonly LocalText PendingChangesConfirmation = "You have pending changes. Save them?";
            public static readonly LocalText PendingChangesUnloadWarning = "Warning! You might lose your pending changes if you continue. Please save them before navigating away.";
        }

        public static class Translation
        {
            public static readonly LocalText Assembly = "Assembly";
            public static readonly LocalText CopySuccessMessage = "Copied texts to clipboard in JSON format.";
            public static readonly LocalText CopyFailMessage = "Failed to Copy to clipboard! It might be due to not having HTTPS or necessary permissions.";
            public static readonly LocalText CopySourceTranslations = "Copy source texts to clipboard in JSON format";
            public static readonly LocalText CopyTargetTranslations = "Copy target texts to clipboard in JSON format";
            public static readonly LocalText CustomText = "User Translation in Target Language";
            public static readonly LocalText EntityPlural = "Translations";
            public static readonly LocalText HasTranslation = "Has Translation";
            public static readonly LocalText Key = "Local Text Key";
            public static readonly LocalText OverrideConfirmation = "Overwrite user translation with clicked text?";
            public static readonly LocalText SaveChangesButton = "Save Changes";
            public static readonly LocalText SaveSuccessMessage = "User translations in target language are saved to {0}";
            public static readonly LocalText SourceLanguage = "Source Language";
            public static readonly LocalText SourceText = "Effective Translation in Source Language";
            public static readonly LocalText TargetLanguage = "Target Language";
            public static readonly LocalText TargetText = "Effective Translation in Target Language";
            public static readonly LocalText UserTranslated = "User Translated";
        }
    }

    public static class Validation
    {
        public static readonly LocalText InvalidResetToken = "Your token to reset your password is invalid or has expired!";
        public static readonly LocalText MinRequiredPasswordLength = "Entered password doesn't have enough characters (min {0})!";
        public static readonly LocalText PasswordStrengthRequireDigit = "Password must contain a digit (0-9).";
        public static readonly LocalText PasswordStrengthRequireLowercase = "Password must contain a lowercase (a-z) letter.";
        public static readonly LocalText PasswordStrengthRequireUppercase = "Password must contain an uppercase (A-Z) letter.";
        public static readonly LocalText PasswordStrengthRequireNonAlphanumeric = "Password must contain a non-alphanumeric character.";
        public static readonly LocalText PasswordConfirmMismatch = "The passwords entered doesn't match!";
    }
}