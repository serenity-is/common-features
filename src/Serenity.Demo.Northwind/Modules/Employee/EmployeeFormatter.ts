import { Decorators, Formatter, IInitializeColumn, ISlickFormatter, faIcon } from "@serenity-is/corelib";
import { htmlEncode, isTrimmedEmpty } from "@serenity-is/corelib";
import { Column, FormatterContext } from "@serenity-is/sleekgrid";
import { Gender } from "@/ServerTypes/Demo";

@Decorators.registerFormatter('Serenity.Demo.Northwind.EmployeeFormatter', [IInitializeColumn])
export class EmployeeFormatter implements Formatter {
    format(ctx: FormatterContext) {
        let text = htmlEncode(ctx.value);

        if (!this.genderProperty || isTrimmedEmpty(ctx.value))
            return text;

        let female = ctx.item[this.genderProperty] === Gender.Female;
        return `<i class="${faIcon(female ? "female" : "male", female ? "danger" : "primary")} + ' text-opacity-75"></i>` + text;
    }

    @Decorators.option()
    public genderProperty: string;

    public initializeColumn(column: Column) {
        column.referencedFields = column.referencedFields || [];
        if (this.genderProperty)
            column.referencedFields.push(this.genderProperty);
    }
}
