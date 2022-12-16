using Serenity.ComponentModel;
using System.ComponentModel;

namespace Serenity.Demo.Northwind.Forms
{
    [ColumnsScript("Northwind.Territory")]
    [BasedOnRow(typeof(TerritoryRow), CheckNames = true)]
    public class TerritoryColumns
    {
        [EditLink, DisplayName("Db.Shared.RecordId"), Width(100)]
        public int TerritoryID { get; set; }
        [EditLink, Width(200)]
        public string TerritoryDescription { get; set; }
        [EditLink(ItemType = "Demo.Northwind.Region", IdField = "RegionID"), Width(150)]
        [LookupEditor(typeof(RegionRow)), QuickFilter]
        public string RegionDescription { get; set; }
    }
}