import { Decorators, Formatter, faIcon } from "@serenity-is/corelib";
import { FormatterContext } from "@serenity-is/sleekgrid";

@Decorators.registerFormatter('Serenity.Demo.Northwind.ShipperFormatter')
export class ShipperFormatter implements Formatter {
    format(ctx: FormatterContext) {

        if (!ctx.value)
            return ctx.escape();

        return `<i class="text-info ${faIcon(ctx.value == "Speedy Express" ? "plane" :
            (ctx.value == "Federal Shipping" ? "ship" : "truck"))}  text-opacity-75"></i> ${ctx.escape()}`;
    }
}
