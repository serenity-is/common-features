import { Decorators } from "@serenity-is/corelib";
import { OrderGrid } from "@serenity-is/demo.northwind";

@Decorators.registerClass('Serenity.Demo.BasicSamples.WrappedHeadersGrid')
export class WrappedHeadersGrid extends OrderGrid {

    constructor(container: JQuery) {
        super(container);
    }
}