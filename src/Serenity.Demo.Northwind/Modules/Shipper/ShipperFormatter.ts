import { Decorators, Formatter } from "@serenity-is/corelib";
import { htmlEncode } from "@serenity-is/corelib";
import { FormatterContext } from "@serenity-is/sleekgrid";

@Decorators.registerFormatter('Serenity.Demo.Northwind.ShipperFormatter')
export class ShipperFormatter implements Formatter {
    format(ctx: FormatterContext) {

        if (!ctx.value)
            return htmlEncode(ctx.value);

        return '<i class="text-info fa fa-' +
            (ctx.value == "Speedy Express" ? "plane"
                : (ctx.value == "Federal Shipping" ? "ship"
                    : "truck")) + ' text-opacity-75"></i> ' + htmlEncode(ctx.value);
    }
}
