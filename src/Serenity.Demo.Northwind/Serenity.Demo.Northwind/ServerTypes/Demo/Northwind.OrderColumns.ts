import { EmployeeFormatter } from "@/../Serenity.Demo.Northwind/Employee/EmployeeFormatter";
import { ShipperFormatter } from "@/../Serenity.Demo.Northwind/Shipper/ShipperFormatter";
import { FreightFormatter } from "@/../Serenity.Demo.Northwind/Order/FreightFormatter";

export class OrderColumns {
    static columnsKey = 'Northwind.Order';
}

[EmployeeFormatter, ShipperFormatter, FreightFormatter]; // formatter types
