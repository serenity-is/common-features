import { Decorators, Formatter, IInitializeColumn, faIcon, isTrimmedEmpty } from "@serenity-is/corelib";
import { Column, FormatterContext } from "@serenity-is/sleekgrid";
import { Gender } from "../ServerTypes/Demo";

@Decorators.registerFormatter('Serenity.Demo.Northwind.EmployeeFormatter', [IInitializeColumn])
export class EmployeeFormatter implements Formatter {
    constructor(public readonly props: { genderProperty?: string } = {}) {
        this.props ??= {};
    }

    format(ctx: FormatterContext) {
        let text = ctx.escape();

        if (!this.props.genderProperty || isTrimmedEmpty(ctx.value))
            return ctx.asHtml(text);

        let female = ctx.item[this.props.genderProperty] === Gender.Female;
        return ctx.asHtml(`<i class="${faIcon(female ? "female" : "male", female ? "danger" : "primary")} + ' text-opacity-75"></i>` + text);
    }

    public initializeColumn(column: Column) {
        column.referencedFields = column.referencedFields || [];
        if (this.props.genderProperty)
            column.referencedFields.push(this.props.genderProperty);
    }
}
