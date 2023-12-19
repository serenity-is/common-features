import { Decorators } from "@serenity-is/corelib";
import { initFullHeightGridPage } from "@serenity-is/corelib";
import { OrderGrid } from "@serenity-is/demo.northwind";

export default function pageInit() {
    initFullHeightGridPage(new WrappedHeadersGrid($('#GridDiv')).element);
}

@Decorators.registerClass('Serenity.Demo.BasicSamples.WrappedHeadersGrid')
export class WrappedHeadersGrid extends OrderGrid {
}