using Serenity.ComponentModel;
using System;

namespace Serenity.Demo.Northwind.Forms
{
    [FormScript("Northwind.Category")]
    [BasedOnRow(typeof(Entities.CategoryRow), CheckNames = true)]
    public class CategoryForm
    {
        public string CategoryName { get; set; }
        public string Description { get; set; }
    }
}