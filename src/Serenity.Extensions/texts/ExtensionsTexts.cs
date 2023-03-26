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
    }
}