import { EmployeeFormatter } from "@/Employee/EmployeeFormatter";
import { OrderShippingState } from "./Northwind.OrderShippingState";
import { ShipperFormatter } from "@/Shipper/ShipperFormatter";
import { FreightFormatter } from "@/Order/FreightFormatter";

export class OrderColumns {
    static columnsKey = 'Northwind.Order';
}

[EmployeeFormatter, OrderShippingState, ShipperFormatter, FreightFormatter]; // referenced types
