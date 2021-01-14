using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace Serenity.Demo.Northwind.Forms
{
    [ColumnsScript("Northwind.Region")]
    [BasedOnRow(typeof(Entities.RegionRow), CheckNames = true)]
    public class RegionColumns
    {
        [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
        public int RegionID { get; set; }
        [EditLink, Width(300)]
        public string RegionDescription { get; set; }
    }
}