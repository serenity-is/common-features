import { Decorators, Formatter, IInitializeColumn, ISlickFormatter } from "@serenity-is/corelib";
import { htmlEncode, isTrimmedEmpty } from "@serenity-is/corelib/q";
import { Column, FormatterContext } from "@serenity-is/sleekgrid";
import { Gender } from "../ServerTypes/Demo";

@Decorators.registerFormatter('Serenity.Demo.Northwind.EmployeeFormatter', [ISlickFormatter, IInitializeColumn])
export class EmployeeFormatter implements Formatter {
    format(ctx: FormatterContext) {
        var text = htmlEncode(ctx.value);

        if (!this.genderProperty || isTrimmedEmpty(ctx.value)) {
            return text;
        }

        var gender = ctx.item[this.genderProperty];
        return '<i class="fa fa-' + ((gender === Gender.Female) ?
            'female text-danger' : 'male text-primary') + ' text-opacity-75"></i>' + text;
    }

    @Decorators.option()
    public genderProperty: string;

    public initializeColumn(column: Column) {
        column.referencedFields = column.referencedFields || [];
        if (this.genderProperty)
            column.referencedFields.push(this.genderProperty);
    }
}
