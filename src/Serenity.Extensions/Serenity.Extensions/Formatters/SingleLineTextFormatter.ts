
namespace Serenity.Extensions {
    
    @Decorators.registerFormatter('Serenity.Extensions.SingleLineTextFormatter')
    export class SingleLineTextFormatter implements Slick.Formatter {
        format(ctx: Slick.FormatterContext) {
            return SingleLineTextFormatter.formatValue(ctx.value);
        }

        public static formatValue(value: string) {
            var text = $('<div/>').html(value || '').text();
            return Q.toSingleLine(text);
        }
    }
}