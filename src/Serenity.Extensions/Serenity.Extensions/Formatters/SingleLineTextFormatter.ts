import { Decorators } from "@serenity-is/corelib";
import { toSingleLine } from "@serenity-is/corelib/q";
import { Formatter } from "@serenity-is/corelib/slick";
import { FormatterContext } from "@serenity-is/sleekgrid";

@Decorators.registerFormatter('Serenity.Extensions.SingleLineTextFormatter')
export class SingleLineTextFormatter implements Formatter {
    format(ctx: FormatterContext) {
        return SingleLineTextFormatter.formatValue(ctx.value);
    }

    public static formatValue(value: string) {
        var text = $('<div/>').html(value || '').text();
        return toSingleLine(text);
    }
}