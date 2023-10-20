import { Decorators, Formatter } from "@serenity-is/corelib";
import { htmlEncode } from "@serenity-is/corelib";
import { FormatterContext } from "@serenity-is/sleekgrid";

@Decorators.registerFormatter('Serenity.Demo.Northwind.FreightFormatter')
export class FreightFormatter implements Formatter {
    format(ctx: FormatterContext) {
        if (ctx.value == null)
            return "";

        return htmlEncode(ctx.value) +
            ' <i class="icon fa fa-balance-scale text-secondary text-opacity-75"></i>';
    }
}
