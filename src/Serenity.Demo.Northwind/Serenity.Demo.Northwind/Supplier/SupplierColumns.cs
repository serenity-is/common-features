using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace Serenity.Demo.Northwind.Forms
{
    [ColumnsScript("Northwind.Supplier")]
    [BasedOnRow(typeof(Entities.SupplierRow), CheckNames = true)]
    public class SupplierColumns
    {
        [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
        public int SupplierID { get; set; }
        [EditLink, Width(250)]
        public string CompanyName { get; set; }
        [Width(150)]
        public string ContactName { get; set; }
        [Width(150)]
        public string ContactTitle { get; set; }
        [Width(120)]
        public string Phone { get; set; }
        [Width(80)]
        public string Region { get; set; }
        [Width(130)]
        [LookupEditor(typeof(Lookups.SupplierCountryLookup)), QuickFilter]
        public string Country { get; set; }
        [Width(130)]
        public string City { get; set; }
    }
}