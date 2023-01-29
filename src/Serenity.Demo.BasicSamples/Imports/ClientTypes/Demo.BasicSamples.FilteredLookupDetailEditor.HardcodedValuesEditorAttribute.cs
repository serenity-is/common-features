using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace Serenity.Demo.BasicSamples.FilteredLookupDetailEditor;

public partial class HardcodedValuesEditorAttribute : CustomEditorAttribute
{
    public const string Key = "Serenity.Demo.BasicSamples.FilteredLookupDetailEditor.HardcodedValuesEditor";

    public HardcodedValuesEditorAttribute()
        : base(Key)
    {
    }
}
