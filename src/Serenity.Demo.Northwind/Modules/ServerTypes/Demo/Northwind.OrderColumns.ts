import { EmployeeFormatter } from "@/Employee/EmployeeFormatter";
import { ShipperFormatter } from "@/Shipper/ShipperFormatter";
import { FreightFormatter } from "@/Order/FreightFormatter";

export class OrderColumns {
    static columnsKey = 'Northwind.Order';
}

[EmployeeFormatter, ShipperFormatter, FreightFormatter]; // formatter types
