import { InlineImageInGridColumns } from "@/ServerTypes/Demo";
import { Decorators, EntityGrid, Formatter, IInitializeColumn } from "@serenity-is/corelib";
import { initFullHeightGridPage, resolveUrl } from "@serenity-is/corelib";
import { ProductRow, ProductDialog, ProductService } from "@serenity-is/demo.northwind";
import { Column, FormatterContext, GridOptions } from "@serenity-is/sleekgrid";

export default function pageInit() {
    initFullHeightGridPage(new InlineImageInGrid($('#GridDiv')).element);
}

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

@Decorators.registerClass('Serenity.Demo.BasicSamples.InlineImageInGrid')
export class InlineImageInGrid extends EntityGrid<ProductRow, any> {

    protected getColumnsKey() { return InlineImageInGridColumns.columnsKey; }
    protected getDialogType() { return <any>ProductDialog; }
    protected getRowDefinition() { return ProductRow; }
    protected getService() { return ProductService.baseUrl; }

    protected getSlickOptions(): GridOptions {
        let opt = super.getSlickOptions();
        opt.rowHeight = 150;
        return opt;
    }
}