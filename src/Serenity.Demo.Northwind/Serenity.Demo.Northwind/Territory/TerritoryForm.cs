using Serenity.ComponentModel;
using System;

namespace Serenity.Demo.Northwind.Forms
{
    [FormScript("Northwind.Territory")]
    [BasedOnRow(typeof(Entities.TerritoryRow), CheckNames = true)]
    public class TerritoryForm
    {
        public string TerritoryID { get; set; }
        public string TerritoryDescription { get; set; }
        [LookupEditor(typeof(Entities.RegionRow))]
        public int RegionID { get; set; }
    }
}