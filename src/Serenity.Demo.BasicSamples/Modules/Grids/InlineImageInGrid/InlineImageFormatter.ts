import { Decorators, Formatter, IInitializeColumn } from "@serenity-is/corelib";
import { resolveUrl } from "@serenity-is/corelib/q";
import { Column, FormatterContext } from "@serenity-is/sleekgrid";

@Decorators.registerFormatter("Serenity.Demo.BasicSamples.InlineImageFormatter")
export class InlineImageFormatter
    implements Formatter, IInitializeColumn {

    format(ctx: FormatterContext): string {

        var file = (this.fileProperty ? ctx.item[this.fileProperty] : ctx.value) as string;
        if (!file || !file.length)
            return "";

        let href = resolveUrl("~/upload/" + file);

        if (this.thumb) {
            var parts = file.split('.');
            file = parts.slice(0, parts.length - 1).join('.') + '_t.jpg';
        }

        let src = resolveUrl('~/upload/' + file);

        return `<a class="inline-image" target='_blank' href="${href}">` +
            `<img src="${src}" style='max-height: 145px; max-width: 100%;' /></a>`;
    }

    initializeColumn(column: Column): void {
        if (this.fileProperty) {
            column.referencedFields = column.referencedFields || [];
            column.referencedFields.push(this.fileProperty);
        }
    }

    @Decorators.option()
    public fileProperty: string;

    @Decorators.option()
    public thumb: boolean;
}