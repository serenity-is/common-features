import { Decorators, Formatter, faIcon } from "@serenity-is/corelib";
import { FormatterContext } from "@serenity-is/sleekgrid";

@Decorators.registerFormatter('Serenity.Demo.Northwind.FreightFormatter')
export class FreightFormatter implements Formatter {
    format(ctx: FormatterContext) {
        if (ctx.value == null)
            return "";

        return ctx.asHtml(`${ctx.escape()} <i class="${faIcon("balance-scale", "secondary")} text-opacity-75"></i>`);
    }
}
