import { Decorators, EnumTypeRegistry, Formatter } from "@serenity-is/corelib";
import { htmlEncode, localText, tryGetText } from "@serenity-is/corelib/q";
import { FormatterContext } from "@serenity-is/sleekgrid";

@Decorators.registerFormatter('Serenity.Extensions.EnumSelectFormatter')
export class EnumSelectFormatter implements Formatter {
    constructor() {
        this.allowClear = true;
    }

    format(ctx: FormatterContext) {
        var enumType = EnumTypeRegistry.get(this.enumKey);

        var sb = "<select>";
        if (this.allowClear) {
            sb += '<option value="">';
            sb += htmlEncode(this.emptyItemText || localText("Controls.SelectEditor.EmptyItemText"));
            sb += '</option>';
        }

        for (var x of Object.keys(enumType).filter(v => !isNaN(parseInt(v, 10)))) {
            sb += '<option value="' + htmlEncode(x) + '"';
            if (x == ctx.value)
                sb += " selected";
            var name = enumType[x];
            sb += ">";
            sb += htmlEncode(tryGetText("Enums." + this.enumKey + "." + name) || name);
            sb += "</option>";
        }

        sb += "</select>";

        return sb;
    }

    @Decorators.option()
    public enumKey: string;

    @Decorators.option()
    public allowClear: boolean;

    @Decorators.option()
    public emptyItemText: string;
}