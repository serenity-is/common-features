namespace Serenity.Demo.Northwind {

    @Serenity.Decorators.registerFormatter()
    export class FreightFormatter implements Slick.Formatter {
        format(ctx: Slick.FormatterContext) {
            if (ctx.value == null)
                return "";

            return Q.htmlEncode(ctx.value) +
                ' <i class="icon fa fa-balance-scale text-secondary text-opacity-75"></i>';
        }
    }
}