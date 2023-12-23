import { Decorators, gridPageInit } from "@serenity-is/corelib";
import { OrderGrid } from "@serenity-is/demo.northwind";

export default () => gridPageInit(WrappedHeadersGrid)

@Decorators.registerClass('Serenity.Demo.BasicSamples.WrappedHeadersGrid')
export class WrappedHeadersGrid extends OrderGrid {
}