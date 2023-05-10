import { Decorators, Formatter } from "@serenity-is/corelib";
import { Lookup } from "@serenity-is/corelib/q";
import { FormatterContext } from "@serenity-is/sleekgrid";
import { EmployeeRow } from "../ServerTypes/Demo";

var employeeLookup: Lookup<EmployeeRow>;
var employeePromise: Promise<any>;

@Decorators.registerFormatter('Serenity.Demo.Northwind.EmployeeListFormatter')
export class EmployeeListFormatter implements Formatter {

    format(ctx: FormatterContext) {

        var idList = ctx.value as string[];
        if (!idList || !idList.length)
            return "";

        
        if (!employeeLookup) {

            if (!employeePromise) {
                employeePromise = EmployeeRow.getLookupAsync().then(lookup => {
                    employeeLookup = lookup;
                    ctx.grid?.invalidate();
                }).catch(() => employeePromise = null);
            }

            return `<i class="fa fa-spinner"></i>`;
        }

        var byId = employeeLookup.itemById;
        return idList.map(x => {
            var z = byId[x];
            return z == null ? x : z.FullName;
        }).join(", ");
    }
}
