import { Decorators, Formatter, htmlEncode, toSingleLine } from "@serenity-is/corelib";
import { FormatterContext } from "@serenity-is/sleekgrid";

@Decorators.registerFormatter('Serenity.Extensions.SingleLineTextFormatter')
export class SingleLineTextFormatter implements Formatter {
    format(ctx: FormatterContext) {
        return ctx.asText(SingleLineTextFormatter.formatValue(ctx.value));
    }

    /** Formats html value as text, note that return value is plain text, e.g. is not html escaped */
    public static formatValue(htmlValue: string): string {
        var div = document.createElement("div");
        div.innerHTML = htmlValue ?? '';
        return toSingleLine(div.textContent);
    }
}