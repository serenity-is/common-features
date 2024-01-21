import { Decorators, EnumTypeRegistry, Formatter } from "@serenity-is/corelib";
import { htmlEncode, localText, tryGetText } from "@serenity-is/corelib";
import { FormatterContext } from "@serenity-is/sleekgrid";

@Decorators.registerFormatter('Serenity.Extensions.EnumSelectFormatter')
export class EnumSelectFormatter implements Formatter {
    constructor(public readonly props: { enumKey: string, allowClear?: boolean, emptyItemText?: string }) {
        this.props && (this.props.allowClear ??= true);
    }

    format(ctx: FormatterContext) {
        var enumType = EnumTypeRegistry.get(this.props?.enumKey ?? "EnumKeyOptionNotSpecified!");

        var sb = "<select>";
        if (this.props?.allowClear) {
            sb += '<option value="">';
            sb += htmlEncode(this.props?.emptyItemText || localText("Controls.SelectEditor.EmptyItemText"));
            sb += '</option>';
        }

        for (var x of Object.keys(enumType).filter(v => !isNaN(parseInt(v, 10)))) {
            sb += '<option value="' + htmlEncode(x) + '"';
            if (x == ctx.value)
                sb += " selected";
            var name = enumType[x];
            sb += ">";
            sb += htmlEncode(tryGetText("Enums." + this.props?.enumKey + "." + name) || name);
            sb += "</option>";
        }

        sb += "</select>";

        return sb;
    }
}