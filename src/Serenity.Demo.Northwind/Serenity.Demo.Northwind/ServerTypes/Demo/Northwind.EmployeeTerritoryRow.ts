import { fieldsProxy } from "@serenity-is/corelib/q";

export interface EmployeeTerritoryRow {
    EmployeeID?: number;
    TerritoryID?: string;
    EmployeeLastName?: string;
    EmployeeFirstName?: string;
    EmployeeTitle?: string;
    EmployeeTitleOfCourtesy?: string;
    EmployeeBirthDate?: string;
    EmployeeHireDate?: string;
    EmployeeAddress?: string;
    EmployeeCity?: string;
    EmployeeRegion?: string;
    EmployeePostalCode?: string;
    EmployeeCountry?: string;
    EmployeeHomePhone?: string;
    EmployeeExtension?: string;
    EmployeePhoto?: number[];
    EmployeeNotes?: string;
    EmployeeReportsTo?: number;
    EmployeePhotoPath?: string;
    TerritoryTerritoryDescription?: string;
    TerritoryRegionID?: number;
}

export abstract class EmployeeTerritoryRow {
    static readonly idProperty = 'EmployeeID';
    static readonly nameProperty = 'TerritoryID';
    static readonly localTextPrefix = 'Northwind.EmployeeTerritory';
    static readonly deletePermission = 'Northwind:General';
    static readonly insertPermission = 'Northwind:General';
    static readonly readPermission = 'Northwind:General';
    static readonly updatePermission = 'Northwind:General';

    static readonly Fields = fieldsProxy<EmployeeTerritoryRow>();
}
