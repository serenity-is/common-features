namespace Serenity.Demo.Northwind;

#pragma warning disable CA2211 // Non-constant fields should not be visible
public static partial class Texts
{
    public static partial class Validation
    {
        public static LocalText NorthwindPhone = "Phone numbers should be entered in format '(503) 555-9831'.";
        public static LocalText NorthwindPhoneMultiple = "Phone numbers should be entered in format '(503) 555-9831. " +
            "Multiple numbers can be separated with comma.";
    }
}
#pragma warning restore CA2211 // Non-constant fields should not be visible
