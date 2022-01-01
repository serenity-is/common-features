namespace Serenity.Demo.Northwind {

    @Serenity.Decorators.registerFormatter([Serenity.ISlickFormatter, Serenity.IInitializeColumn])
    export class EmployeeFormatter implements Slick.Formatter {
        format(ctx: Slick.FormatterContext) {
            var text = Q.htmlEncode(ctx.value);

            if (!this.genderProperty || Q.isTrimmedEmpty(ctx.value)) {
                return text;
            }

            var gender = ctx.item[this.genderProperty];
            return '<i class="fa fa-' + ((gender === Gender.Female) ?
                'female text-danger' : 'male text-primary') + ' text-opacity-75"></i>' + text;
        }

        @Serenity.Decorators.option()
        public genderProperty: string;

        public initializeColumn(column: Slick.Column) {
            column.referencedFields = column.referencedFields || [];
            if (this.genderProperty)
                column.referencedFields.push(this.genderProperty);
        }
    }
}