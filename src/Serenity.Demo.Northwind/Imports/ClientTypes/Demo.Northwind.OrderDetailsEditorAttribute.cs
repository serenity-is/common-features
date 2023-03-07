using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace Serenity.Demo.Northwind;

public partial class OrderDetailsEditorAttribute : CustomEditorAttribute
{
    public const string Key = "Serenity.Demo.Northwind.OrderDetailsEditor";

    public OrderDetailsEditorAttribute()
        : base(Key)
    {
    }
}