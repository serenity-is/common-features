import { Decorators, Formatter } from "@serenity-is/corelib";
import { Lookup } from "@serenity-is/corelib/q";
import { FormatterContext } from "@serenity-is/sleekgrid";
import { EmployeeRow } from "@/ServerTypes/Demo";

@Decorators.registerFormatter('Serenity.Demo.Northwind.EmployeeListFormatter')
export class EmployeeListFormatter implements Formatter {

    private static lookup: Lookup<EmployeeRow>;
    private static promise: Promise<Lookup<EmployeeRow>>;

    format(ctx: FormatterContext) {

        var idList = ctx.value as string[];
        if (!idList || !idList.length)
            return "";

        if (!EmployeeListFormatter.lookup) {

            if (!EmployeeListFormatter.promise) {
                EmployeeListFormatter.promise = EmployeeRow.getLookupAsync().then(lookup => {
                    EmployeeListFormatter.lookup = lookup;
                    ctx.grid?.invalidate();
                }).catch(() => EmployeeListFormatter.lookup = null);
            }

            return `<i class="fa fa-spinner"></i>`;
        }

        var byId = EmployeeListFormatter.lookup.itemById;
        return idList.map(x => {
            var z = byId[x];
            return ctx.escape(z == null ? x : z.FullName);
        }).join(", ");
    }
}
