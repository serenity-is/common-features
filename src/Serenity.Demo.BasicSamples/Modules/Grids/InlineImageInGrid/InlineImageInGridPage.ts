import { InlineImageInGridColumns } from "../../ServerTypes/Demo";
import { Decorators, EntityGrid, Formatter, IInitializeColumn, gridPageInit, resolveUrl } from "@serenity-is/corelib";
import { ProductDialog, ProductRow, ProductService } from "@serenity-is/demo.northwind";
import { Column, FormatterContext, GridOptions } from "@serenity-is/sleekgrid";

export default () => gridPageInit(InlineImageInGrid);

@Decorators.registerFormatter("Serenity.Demo.BasicSamples.InlineImageFormatter")
export class InlineImageFormatter
    implements Formatter, IInitializeColumn {

    constructor(public readonly props: { fileProperty?: string, thumb?: boolean } = {}) {
    }

    format(ctx: FormatterContext): string {

        var file = (this.props?.fileProperty ? ctx.item[this.props.fileProperty] : ctx.value) as string;
        if (!file || !file.length)
            return "";

        let href = resolveUrl("~/upload/" + file);

        if (this.props?.thumb) {
            var parts = file.split('.');
            file = parts.slice(0, parts.length - 1).join('.') + '_t.jpg';
        }

        let src = resolveUrl('~/upload/' + file);

        return ctx.asHtml(`<a class="inline-image" target='_blank' href="${ctx.escape(href)}">` +
            `<img src="${ctx.escape(src)}" style='max-height: 145px; max-width: 100%;' /></a>`);
    }

    initializeColumn(column: Column): void {
        if (this.props?.fileProperty) {
            column.referencedFields = column.referencedFields || [];
            column.referencedFields.push(this.props.fileProperty);
        }
    }
}

@Decorators.registerClass('Serenity.Demo.BasicSamples.InlineImageInGrid')
export class InlineImageInGrid<P = {}> extends EntityGrid<ProductRow, P> {

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