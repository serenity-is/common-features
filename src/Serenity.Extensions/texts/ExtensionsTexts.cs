namespace Serenity.Extensions;

[NestedLocalTexts]
public static class ExtensionsTexts
{
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
}