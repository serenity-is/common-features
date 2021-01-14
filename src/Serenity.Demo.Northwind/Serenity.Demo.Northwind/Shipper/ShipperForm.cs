using Serenity.ComponentModel;

namespace Serenity.Demo.Northwind.Forms
{
    [FormScript("Northwind.Shipper")]
    [BasedOnRow(typeof(Entities.ShipperRow), CheckNames = true)]
    public class ShipperForm
    {
        public string CompanyName { get; set; }
        [PhoneEditor]
        public string Phone { get; set; }
    }
}