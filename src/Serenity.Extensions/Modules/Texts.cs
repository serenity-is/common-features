namespace Serenity.Extensions;

#pragma warning disable CA2211 // Non-constant fields should not be visible
[NestedLocalTexts]
public static class Texts
{
    public static class Site
    {
        public static class BasicProgressDialog
        {
            public static LocalText CancelTitle = "Operation cancelled. Waiting for in progress calls to complete...";
            public static LocalText PleaseWait = "Please wait...";
        }

        public static class BulkServiceAction
        {
            public static LocalText AllHadErrorsFormat = "All {0} record(s) that are processed had errors!";
            public static LocalText AllSuccessFormat = "Finished processing on {0} record(s) with success.";
            public static LocalText ConfirmationFormat = "Perform this operation on {0} selected record(s)?";
            public static LocalText ErrorCount = "{0} error(s)";
            public static LocalText NothingToProcess = "Please select some records to process!";
            public static LocalText SomeHadErrorsFormat = "Finished processing on {0} record(s) with success. {1} record(s) had errors!";
            public static LocalText SuccessCount = "{0} done";
        }

        public static class Dialogs
        {
            public static LocalText PendingChangesConfirmation = "You have pending changes. Save them?";
        }
    }
}
#pragma warning restore CA2211 // Non-constant fields should not be visible
