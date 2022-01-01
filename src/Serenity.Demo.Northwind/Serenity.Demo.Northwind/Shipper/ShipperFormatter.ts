namespace Serenity.Demo.Northwind {

    @Serenity.Decorators.registerFormatter()
    export class ShipperFormatter implements Slick.Formatter {
        format(ctx: Slick.FormatterContext) {

            if (!ctx.value)
                return Q.htmlEncode(ctx.value);

            return '<i class="text-info fa fa-' +
                (ctx.value == "Speedy Express" ? "plane"
                    : (ctx.value == "Federal Shipping" ? "ship"
                        : "truck")) + ' text-opacity-75"></i> ' + Q.htmlEncode(ctx.value);
        }
    }
}