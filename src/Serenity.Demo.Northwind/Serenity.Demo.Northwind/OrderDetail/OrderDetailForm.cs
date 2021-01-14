using Serenity.ComponentModel;
using System;

namespace Serenity.Demo.Northwind.Forms
{
    [FormScript("Northwind.OrderDetail")]
    [BasedOnRow(typeof(Entities.OrderDetailRow), CheckNames = true)]
    public class OrderDetailForm
    {
        public int ProductID { get; set; }
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public double Discount { get; set; }
    }
}