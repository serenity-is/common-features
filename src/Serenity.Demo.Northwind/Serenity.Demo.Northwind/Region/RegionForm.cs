using Serenity.ComponentModel;
using System;

namespace Serenity.Demo.Northwind.Forms
{
    [FormScript("Northwind.Region")]
    [BasedOnRow(typeof(Entities.RegionRow), CheckNames = true)]
    public class RegionForm
    {
        public int? RegionID { get; set; }
        public string RegionDescription { get; set; }
    }
}