using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace Serenity.Demo.BasicSamples;

public partial class ChangingLookupTextEditorAttribute : LookupEditorBaseAttribute
{
    public const string Key = "Serenity.Demo.BasicSamples.ChangingLookupTextEditor";

    public ChangingLookupTextEditorAttribute()
        : base(Key)
    {
    }
}