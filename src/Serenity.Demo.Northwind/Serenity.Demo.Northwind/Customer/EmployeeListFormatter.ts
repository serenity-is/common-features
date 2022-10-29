import { Decorators, Formatter } from "@serenity-is/corelib";
import { FormatterContext } from "@serenity-is/sleekgrid";
import { EmployeeRow } from "../ServerTypes/Demo";

@Decorators.registerFormatter('Serenity.Demo.Northwind.EmployeeListFormatter')
export class EmployeeListFormatter implements Formatter {
    format(ctx: FormatterContext) {
        var idList = ctx.value as string[];
        if (!idList || !idList.length)
            return "";

        var byId = EmployeeRow.getLookup().itemById;
        let z: EmployeeRow;
        return idList.map(x => ((z = byId[x]) ? z.FullName : x)).join(", ");
    }
}
