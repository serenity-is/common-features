import { fieldsProxy } from "@serenity-is/corelib/q";

export interface CustomerDetailsRow {
    Id?: number;
    LastContactDate?: string;
    LastContactedBy?: number;
    Email?: string;
    SendBulletin?: boolean;
    LastContactedByLastName?: string;
    LastContactedByFirstName?: string;
    LastContactedByTitle?: string;
    LastContactedByTitleOfCourtesy?: string;
    LastContactedByBirthDate?: string;
    LastContactedByHireDate?: string;
    LastContactedByAddress?: string;
    LastContactedByCity?: string;
    LastContactedByRegion?: string;
    LastContactedByPostalCode?: string;
    LastContactedByCountry?: string;
    LastContactedByHomePhone?: string;
    LastContactedByExtension?: string;
    LastContactedByPhoto?: number[];
    LastContactedByNotes?: string;
    LastContactedByReportsTo?: number;
    LastContactedByPhotoPath?: string;
}

export abstract class CustomerDetailsRow {
    static readonly idProperty = 'Id';
    static readonly nameProperty = 'Email';
    static readonly localTextPrefix = 'Northwind.CustomerDetails';
    static readonly deletePermission = 'Northwind:General';
    static readonly insertPermission = 'Northwind:General';
    static readonly readPermission = 'Northwind:General';
    static readonly updatePermission = 'Northwind:General';

    static readonly Fields = fieldsProxy<CustomerDetailsRow>();
}
