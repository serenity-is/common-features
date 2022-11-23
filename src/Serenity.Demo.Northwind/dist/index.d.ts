/// <reference types="jquery" />
/// <reference types="jquery.validation" />
/// <reference types="jqueryui" />

import { BooleanEditor, CaptureOperationType, DateEditor, DecimalEditor, DeleteRequest, DeleteResponse, EmailAddressEditor, EntityDialog, EntityGrid, EnumEditor, Formatter, IGetEditValue, ISetEditValue, ImageUploadEditor, IntegerEditor, ListRequest, ListResponse, LookupEditor, LookupEditorBase, LookupEditorOptions, PrefixedContext, PropertyItem, RetrieveRequest, RetrieveResponse, SaveRequest, SaveResponse, StringEditor, TemplatedDialog, TemplatedWidget, ToolButton } from '@serenity-is/corelib';
import { ServiceOptions } from '@serenity-is/corelib/q';
import { GetNextNumberRequest, GetNextNumberResponse, GridEditorBase, GridEditorDialog } from '@serenity-is/extensions';
import { Column, FormatterContext } from '@serenity-is/sleekgrid';

export declare class CategoryColumns {
	static columnsKey: string;
}
export interface CategoryForm {
	CategoryName: StringEditor;
	Description: StringEditor;
}
export declare class CategoryForm extends PrefixedContext {
	static formKey: string;
	private static init;
	constructor(prefix: string);
}
export interface CategoryLangRow {
	Id?: number;
	CategoryId?: number;
	LanguageId?: number;
	CategoryName?: string;
	Description?: string;
}
export declare abstract class CategoryLangRow {
	static readonly idProperty = "Id";
	static readonly nameProperty = "CategoryName";
	static readonly localTextPrefix = "Northwind.CategoryLang";
	static readonly deletePermission = "Northwind:General";
	static readonly insertPermission = "Northwind:General";
	static readonly readPermission = "Northwind:General";
	static readonly updatePermission = "Northwind:General";
	static readonly Fields: Readonly<Record<keyof CategoryLangRow, string>>;
}
export declare namespace CategoryLangService {
	const baseUrl = "Serenity.Demo.Northwind/CategoryLang";
	function Create(request: SaveRequest<CategoryLangRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Update(request: SaveRequest<CategoryLangRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<CategoryLangRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function List(request: ListRequest, onSuccess?: (response: ListResponse<CategoryLangRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
	const Methods: {
		readonly Create: "Serenity.Demo.Northwind/CategoryLang/Create";
		readonly Update: "Serenity.Demo.Northwind/CategoryLang/Update";
		readonly Delete: "Serenity.Demo.Northwind/CategoryLang/Delete";
		readonly Retrieve: "Serenity.Demo.Northwind/CategoryLang/Retrieve";
		readonly List: "Serenity.Demo.Northwind/CategoryLang/List";
	};
}
export interface CategoryRow {
	CategoryID?: number;
	CategoryName?: string;
	Description?: string;
	Picture?: number[];
}
export declare abstract class CategoryRow {
	static readonly idProperty = "CategoryID";
	static readonly nameProperty = "CategoryName";
	static readonly localTextPrefix = "Northwind.Category";
	static readonly lookupKey = "Northwind.Category";
	/** @deprecated use getLookupAsync instead */
	static getLookup(): Q.Lookup<CategoryRow>;
	static getLookupAsync(): Promise<Q.Lookup<CategoryRow>>;
	static readonly deletePermission = "Northwind:General";
	static readonly insertPermission = "Northwind:General";
	static readonly readPermission = "Northwind:General";
	static readonly updatePermission = "Northwind:General";
	static readonly Fields: Readonly<Record<keyof CategoryRow, string>>;
}
export declare namespace CategoryService {
	const baseUrl = "Serenity.Demo.Northwind/Category";
	function Create(request: SaveRequest<CategoryRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Update(request: SaveRequest<CategoryRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<CategoryRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function List(request: ListRequest, onSuccess?: (response: ListResponse<CategoryRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
	const Methods: {
		readonly Create: "Serenity.Demo.Northwind/Category/Create";
		readonly Update: "Serenity.Demo.Northwind/Category/Update";
		readonly Delete: "Serenity.Demo.Northwind/Category/Delete";
		readonly Retrieve: "Serenity.Demo.Northwind/Category/Retrieve";
		readonly List: "Serenity.Demo.Northwind/Category/List";
	};
}
export declare class CustomerColumns {
	static columnsKey: string;
}
export interface CustomerCustomerDemoRow {
	ID?: number;
	CustomerID?: string;
	CustomerTypeID?: string;
	CustomerCompanyName?: string;
	CustomerContactName?: string;
	CustomerContactTitle?: string;
	CustomerAddress?: string;
	CustomerCity?: string;
	CustomerRegion?: string;
	CustomerPostalCode?: string;
	CustomerCountry?: string;
	CustomerPhone?: string;
	CustomerFax?: string;
	CustomerTypeCustomerDesc?: string;
}
export declare abstract class CustomerCustomerDemoRow {
	static readonly idProperty = "ID";
	static readonly nameProperty = "CustomerID";
	static readonly localTextPrefix = "Northwind.CustomerCustomerDemo";
	static readonly deletePermission = "Northwind:General";
	static readonly insertPermission = "Northwind:General";
	static readonly readPermission = "Northwind:General";
	static readonly updatePermission = "Northwind:General";
	static readonly Fields: Readonly<Record<keyof CustomerCustomerDemoRow, string>>;
}
export interface CustomerDemographicRow {
	ID?: number;
	CustomerTypeID?: string;
	CustomerDesc?: string;
}
export declare abstract class CustomerDemographicRow {
	static readonly idProperty = "ID";
	static readonly nameProperty = "CustomerTypeID";
	static readonly localTextPrefix = "Northwind.CustomerDemographic";
	static readonly deletePermission = "Northwind:General";
	static readonly insertPermission = "Northwind:General";
	static readonly readPermission = "Northwind:General";
	static readonly updatePermission = "Northwind:General";
	static readonly Fields: Readonly<Record<keyof CustomerDemographicRow, string>>;
}
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
export declare abstract class CustomerDetailsRow {
	static readonly idProperty = "Id";
	static readonly nameProperty = "Email";
	static readonly localTextPrefix = "Northwind.CustomerDetails";
	static readonly deletePermission = "Northwind:General";
	static readonly insertPermission = "Northwind:General";
	static readonly readPermission = "Northwind:General";
	static readonly updatePermission = "Northwind:General";
	static readonly Fields: Readonly<Record<keyof CustomerDetailsRow, string>>;
}
export declare class NotesEditor extends TemplatedWidget<any> implements IGetEditValue, ISetEditValue {
	private isDirty;
	private items;
	constructor(div: JQuery);
	protected getTemplate(): string;
	protected updateContent(): void;
	protected addClick(): void;
	protected editClick(e: any): void;
	deleteClick(e: any): void;
	get value(): NoteRow[];
	set value(value: NoteRow[]);
	getEditValue(prop: PropertyItem, target: any): void;
	setEditValue(source: any, prop: PropertyItem): void;
	get_isDirty(): boolean;
	set_isDirty(value: any): void;
	onChange: () => void;
}
export interface CustomerForm {
	CustomerID: StringEditor;
	CompanyName: StringEditor;
	ContactName: StringEditor;
	ContactTitle: StringEditor;
	Representatives: LookupEditor;
	Address: StringEditor;
	Country: LookupEditor;
	City: LookupEditor;
	Region: StringEditor;
	PostalCode: StringEditor;
	Phone: StringEditor;
	Fax: StringEditor;
	NoteList: NotesEditor;
	LastContactDate: DateEditor;
	LastContactedBy: LookupEditor;
	Email: EmailAddressEditor;
	SendBulletin: BooleanEditor;
}
export declare class CustomerForm extends PrefixedContext {
	static formKey: string;
	private static init;
	constructor(prefix: string);
}
export interface CustomerGrossSalesRow {
	CustomerId?: string;
	ContactName?: string;
	ProductId?: number;
	ProductName?: string;
	GrossAmount?: number;
}
export declare abstract class CustomerGrossSalesRow {
	static readonly nameProperty = "ContactName";
	static readonly localTextPrefix = "Northwind.CustomerGrossSales";
	static readonly deletePermission = "Northwind:General";
	static readonly insertPermission = "Northwind:General";
	static readonly readPermission = "Northwind:General";
	static readonly updatePermission = "Northwind:General";
	static readonly Fields: Readonly<Record<keyof CustomerGrossSalesRow, string>>;
}
export interface CustomerRepresentativesRow {
	RepresentativeId?: number;
	CustomerId?: number;
	EmployeeId?: number;
}
export declare abstract class CustomerRepresentativesRow {
	static readonly idProperty = "RepresentativeId";
	static readonly localTextPrefix = "Northwind.CustomerRepresentatives";
	static readonly deletePermission = "Northwind:Customer:View";
	static readonly insertPermission = "Northwind:Customer:View";
	static readonly readPermission = "Northwind:Customer:View";
	static readonly updatePermission = "Northwind:Customer:View";
	static readonly Fields: Readonly<Record<keyof CustomerRepresentativesRow, string>>;
}
export interface NoteRow {
	NoteId?: number;
	EntityType?: string;
	EntityId?: number;
	Text?: string;
	InsertUserId?: number;
	InsertDate?: string;
	InsertUserDisplayName?: string;
}
export declare abstract class NoteRow {
	static readonly idProperty = "NoteId";
	static readonly nameProperty = "EntityType";
	static readonly localTextPrefix = "Northwind.Note";
	static readonly deletePermission = "Northwind:General";
	static readonly insertPermission = "Northwind:General";
	static readonly readPermission = "Northwind:General";
	static readonly updatePermission = "Northwind:General";
	static readonly Fields: Readonly<Record<keyof NoteRow, string>>;
}
export interface CustomerRow {
	ID?: number;
	CustomerID?: string;
	CompanyName?: string;
	ContactName?: string;
	ContactTitle?: string;
	Address?: string;
	City?: string;
	Region?: string;
	PostalCode?: string;
	Country?: string;
	Phone?: string;
	Fax?: string;
	NoteList?: NoteRow[];
	Representatives?: number[];
	LastContactDate?: string;
	LastContactedBy?: number;
	Email?: string;
	SendBulletin?: boolean;
}
export declare abstract class CustomerRow {
	static readonly idProperty = "ID";
	static readonly nameProperty = "CompanyName";
	static readonly localTextPrefix = "Northwind.Customer";
	static readonly lookupKey = "Northwind.Customer";
	/** @deprecated use getLookupAsync instead */
	static getLookup(): Q.Lookup<CustomerRow>;
	static getLookupAsync(): Promise<Q.Lookup<CustomerRow>>;
	static readonly deletePermission = "Northwind:Customer:Delete";
	static readonly insertPermission = "Northwind:Customer:Modify";
	static readonly readPermission = "Northwind:Customer:View";
	static readonly updatePermission = "Northwind:Customer:Modify";
	static readonly Fields: Readonly<Record<keyof CustomerRow, string>>;
}
export declare namespace CustomerService {
	const baseUrl = "Serenity.Demo.Northwind/Customer";
	function Create(request: SaveRequest<CustomerRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Update(request: SaveRequest<CustomerRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function GetNextNumber(request: GetNextNumberRequest, onSuccess?: (response: GetNextNumberResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<CustomerRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function List(request: ListRequest, onSuccess?: (response: ListResponse<CustomerRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
	const Methods: {
		readonly Create: "Serenity.Demo.Northwind/Customer/Create";
		readonly Update: "Serenity.Demo.Northwind/Customer/Update";
		readonly Delete: "Serenity.Demo.Northwind/Customer/Delete";
		readonly GetNextNumber: "Serenity.Demo.Northwind/Customer/GetNextNumber";
		readonly Retrieve: "Serenity.Demo.Northwind/Customer/Retrieve";
		readonly List: "Serenity.Demo.Northwind/Customer/List";
	};
}
export declare enum Gender {
	Male = 1,
	Female = 2
}
export interface EmployeeRow {
	EmployeeID?: number;
	LastName?: string;
	FirstName?: string;
	FullName?: string;
	Title?: string;
	TitleOfCourtesy?: string;
	BirthDate?: string;
	HireDate?: string;
	Address?: string;
	City?: string;
	Region?: string;
	PostalCode?: string;
	Country?: string;
	HomePhone?: string;
	Extension?: string;
	Photo?: number[];
	Notes?: string;
	ReportsTo?: number;
	PhotoPath?: string;
	ReportsToFullName?: string;
	ReportsToLastName?: string;
	ReportsToFirstName?: string;
	ReportsToTitle?: string;
	ReportsToTitleOfCourtesy?: string;
	ReportsToBirthDate?: string;
	ReportsToHireDate?: string;
	ReportsToAddress?: string;
	ReportsToCity?: string;
	ReportsToRegion?: string;
	ReportsToPostalCode?: string;
	ReportsToCountry?: string;
	ReportsToHomePhone?: string;
	ReportsToExtension?: string;
	ReportsToPhoto?: number[];
	ReportsToNotes?: string;
	ReportsToReportsTo?: number;
	ReportsToPhotoPath?: string;
	Gender?: Gender;
}
export declare abstract class EmployeeRow {
	static readonly idProperty = "EmployeeID";
	static readonly nameProperty = "FullName";
	static readonly localTextPrefix = "Northwind.Employee";
	static readonly lookupKey = "Northwind.Employee";
	/** @deprecated use getLookupAsync instead */
	static getLookup(): Q.Lookup<EmployeeRow>;
	static getLookupAsync(): Promise<Q.Lookup<EmployeeRow>>;
	static readonly deletePermission = "Northwind:General";
	static readonly insertPermission = "Northwind:General";
	static readonly readPermission = "Northwind:General";
	static readonly updatePermission = "Northwind:General";
	static readonly Fields: Readonly<Record<keyof EmployeeRow, string>>;
}
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
export declare abstract class EmployeeTerritoryRow {
	static readonly idProperty = "EmployeeID";
	static readonly nameProperty = "TerritoryID";
	static readonly localTextPrefix = "Northwind.EmployeeTerritory";
	static readonly deletePermission = "Northwind:General";
	static readonly insertPermission = "Northwind:General";
	static readonly readPermission = "Northwind:General";
	static readonly updatePermission = "Northwind:General";
	static readonly Fields: Readonly<Record<keyof EmployeeTerritoryRow, string>>;
}
export declare class OrderColumns {
	static columnsKey: string;
}
export declare class OrderDetailColumns {
	static columnsKey: string;
}
export interface OrderDetailForm {
	ProductID: LookupEditor;
	UnitPrice: DecimalEditor;
	Quantity: IntegerEditor;
	Discount: DecimalEditor;
}
export declare class OrderDetailForm extends PrefixedContext {
	static formKey: string;
	private static init;
	constructor(prefix: string);
}
export interface OrderDetailRow {
	DetailID?: number;
	OrderID?: number;
	ProductID?: number;
	UnitPrice?: number;
	Quantity?: number;
	Discount?: number;
	OrderCustomerID?: string;
	OrderEmployeeID?: number;
	OrderDate?: string;
	OrderShippedDate?: string;
	OrderShipVia?: number;
	OrderShipCity?: string;
	OrderShipCountry?: string;
	ProductName?: string;
	ProductDiscontinued?: boolean;
	ProductSupplierID?: number;
	ProductQuantityPerUnit?: string;
	ProductUnitPrice?: number;
	LineTotal?: number;
}
export declare abstract class OrderDetailRow {
	static readonly idProperty = "DetailID";
	static readonly localTextPrefix = "Northwind.OrderDetail";
	static readonly deletePermission = "Northwind:General";
	static readonly insertPermission = "Northwind:General";
	static readonly readPermission = "Northwind:General";
	static readonly updatePermission = "Northwind:General";
	static readonly Fields: Readonly<Record<keyof OrderDetailRow, string>>;
}
export declare namespace OrderDetailService {
	const baseUrl = "Serenity.Demo.Northwind/OrderDetail";
	function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<OrderDetailRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function List(request: ListRequest, onSuccess?: (response: ListResponse<OrderDetailRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
	const Methods: {
		readonly Retrieve: "Serenity.Demo.Northwind/OrderDetail/Retrieve";
		readonly List: "Serenity.Demo.Northwind/OrderDetail/List";
	};
}
export declare class CustomerEditor extends LookupEditorBase<LookupEditorOptions, CustomerRow> {
	constructor(hidden: JQuery, options: LookupEditorOptions);
	protected getLookupKey(): string;
	protected getItemText(item: any, lookup: any): string;
}
export declare class OrderDetailDialog extends GridEditorDialog<OrderDetailRow> {
	protected getFormKey(): string;
	protected getLocalTextPrefix(): string;
	protected form: OrderDetailForm;
	constructor();
}
export declare class OrderDetailsEditor extends GridEditorBase<OrderDetailRow> {
	protected getColumnsKey(): string;
	protected getDialogType(): typeof OrderDetailDialog;
	protected getLocalTextPrefix(): string;
	constructor(container: JQuery);
	validateEntity(row: any, id: any): boolean;
}
export interface OrderForm {
	CustomerID: CustomerEditor;
	OrderDate: DateEditor;
	RequiredDate: DateEditor;
	EmployeeID: LookupEditor;
	DetailList: OrderDetailsEditor;
	ShippedDate: DateEditor;
	ShipVia: LookupEditor;
	Freight: DecimalEditor;
	ShipName: StringEditor;
	ShipAddress: StringEditor;
	ShipCity: StringEditor;
	ShipRegion: StringEditor;
	ShipPostalCode: StringEditor;
	ShipCountry: StringEditor;
}
export declare class OrderForm extends PrefixedContext {
	static formKey: string;
	private static init;
	constructor(prefix: string);
}
export interface OrderListRequest extends ListRequest {
	ProductID?: number;
}
export declare enum OrderShippingState {
	NotShipped = 0,
	Shipped = 1
}
export interface OrderRow {
	OrderID?: number;
	CustomerID?: string;
	EmployeeID?: number;
	OrderDate?: string;
	RequiredDate?: string;
	ShippedDate?: string;
	ShipVia?: number;
	Freight?: number;
	ShipName?: string;
	ShipAddress?: string;
	ShipCity?: string;
	ShipRegion?: string;
	ShipPostalCode?: string;
	ShipCountry?: string;
	CustomerCompanyName?: string;
	CustomerContactName?: string;
	CustomerContactTitle?: string;
	CustomerCity?: string;
	CustomerRegion?: string;
	CustomerCountry?: string;
	CustomerPhone?: string;
	CustomerFax?: string;
	EmployeeFullName?: string;
	EmployeeGender?: Gender;
	EmployeeReportsToFullName?: string;
	ShipViaCompanyName?: string;
	ShipViaPhone?: string;
	ShippingState?: OrderShippingState;
	DetailList?: OrderDetailRow[];
}
export declare abstract class OrderRow {
	static readonly idProperty = "OrderID";
	static readonly nameProperty = "CustomerID";
	static readonly localTextPrefix = "Northwind.Order";
	static readonly deletePermission = "Northwind:General";
	static readonly insertPermission = "Northwind:General";
	static readonly readPermission = "Northwind:General";
	static readonly updatePermission = "Northwind:General";
	static readonly Fields: Readonly<Record<keyof OrderRow, string>>;
}
export declare namespace OrderService {
	const baseUrl = "Serenity.Demo.Northwind/Order";
	function Create(request: SaveRequest<OrderRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Update(request: SaveRequest<OrderRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<OrderRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function List(request: OrderListRequest, onSuccess?: (response: ListResponse<OrderRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
	const Methods: {
		readonly Create: "Serenity.Demo.Northwind/Order/Create";
		readonly Update: "Serenity.Demo.Northwind/Order/Update";
		readonly Delete: "Serenity.Demo.Northwind/Order/Delete";
		readonly Retrieve: "Serenity.Demo.Northwind/Order/Retrieve";
		readonly List: "Serenity.Demo.Northwind/Order/List";
	};
}
export declare namespace PermissionKeys {
	const General = "Northwind:General";
	namespace Customer {
		const Delete = "Northwind:Customer:Delete";
		const Modify = "Northwind:Customer:Modify";
		const View = "Northwind:Customer:View";
	}
}
export declare class ProductColumns {
	static columnsKey: string;
}
export interface ProductForm {
	ProductName: StringEditor;
	ProductImage: ImageUploadEditor;
	Discontinued: BooleanEditor;
	SupplierID: LookupEditor;
	CategoryID: LookupEditor;
	QuantityPerUnit: StringEditor;
	UnitPrice: DecimalEditor;
	UnitsInStock: IntegerEditor;
	UnitsOnOrder: IntegerEditor;
	ReorderLevel: IntegerEditor;
}
export declare class ProductForm extends PrefixedContext {
	static formKey: string;
	private static init;
	constructor(prefix: string);
}
export interface ProductLangRow {
	Id?: number;
	ProductId?: number;
	LanguageId?: number;
	ProductName?: string;
}
export declare abstract class ProductLangRow {
	static readonly idProperty = "Id";
	static readonly nameProperty = "ProductName";
	static readonly localTextPrefix = "Northwind.ProductLang";
	static readonly deletePermission = "Northwind:General";
	static readonly insertPermission = "Northwind:General";
	static readonly readPermission = "Northwind:General";
	static readonly updatePermission = "Northwind:General";
	static readonly Fields: Readonly<Record<keyof ProductLangRow, string>>;
}
export declare namespace ProductLangService {
	const baseUrl = "Serenity.Demo.Northwind/ProductLang";
	function Create(request: SaveRequest<ProductLangRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Update(request: SaveRequest<ProductLangRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<ProductLangRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function List(request: ListRequest, onSuccess?: (response: ListResponse<ProductLangRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
	const Methods: {
		readonly Create: "Serenity.Demo.Northwind/ProductLang/Create";
		readonly Update: "Serenity.Demo.Northwind/ProductLang/Update";
		readonly Delete: "Serenity.Demo.Northwind/ProductLang/Delete";
		readonly Retrieve: "Serenity.Demo.Northwind/ProductLang/Retrieve";
		readonly List: "Serenity.Demo.Northwind/ProductLang/List";
	};
}
export interface ProductLogRow {
	ProductLogID?: number;
	OperationType?: CaptureOperationType;
	ChangingUserId?: number;
	ValidFrom?: string;
	ValidUntil?: string;
	ProductID?: number;
	ProductName?: string;
	ProductImage?: string;
	Discontinued?: boolean;
	SupplierID?: number;
	CategoryID?: number;
	QuantityPerUnit?: string;
	UnitPrice?: number;
	UnitsInStock?: number;
	UnitsOnOrder?: number;
	ReorderLevel?: number;
}
export declare abstract class ProductLogRow {
	static readonly idProperty = "ProductLogID";
	static readonly localTextPrefix = "Northwind.ProductLog";
	static readonly deletePermission: any;
	static readonly insertPermission: any;
	static readonly readPermission = "";
	static readonly updatePermission: any;
	static readonly Fields: Readonly<Record<keyof ProductLogRow, string>>;
}
export interface ProductRow {
	ProductID?: number;
	ProductName?: string;
	ProductImage?: string;
	Discontinued?: boolean;
	SupplierID?: number;
	CategoryID?: number;
	QuantityPerUnit?: string;
	UnitPrice?: number;
	UnitsInStock?: number;
	UnitsOnOrder?: number;
	ReorderLevel?: number;
	SupplierCompanyName?: string;
	SupplierContactName?: string;
	SupplierContactTitle?: string;
	SupplierAddress?: string;
	SupplierCity?: string;
	SupplierRegion?: string;
	SupplierPostalCode?: string;
	SupplierCountry?: string;
	SupplierPhone?: string;
	SupplierFax?: string;
	SupplierHomePage?: string;
	CategoryName?: string;
	CategoryDescription?: string;
	CategoryPicture?: number[];
}
export declare abstract class ProductRow {
	static readonly idProperty = "ProductID";
	static readonly nameProperty = "ProductName";
	static readonly localTextPrefix = "Northwind.Product";
	static readonly lookupKey = "Northwind.Product";
	/** @deprecated use getLookupAsync instead */
	static getLookup(): Q.Lookup<ProductRow>;
	static getLookupAsync(): Promise<Q.Lookup<ProductRow>>;
	static readonly deletePermission = "Northwind:General";
	static readonly insertPermission = "Northwind:General";
	static readonly readPermission = "Northwind:General";
	static readonly updatePermission = "Northwind:General";
	static readonly Fields: Readonly<Record<keyof ProductRow, string>>;
}
export declare namespace ProductService {
	const baseUrl = "Serenity.Demo.Northwind/Product";
	function Create(request: SaveRequest<ProductRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Update(request: SaveRequest<ProductRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<ProductRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function List(request: ListRequest, onSuccess?: (response: ListResponse<ProductRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
	const Methods: {
		readonly Create: "Serenity.Demo.Northwind/Product/Create";
		readonly Update: "Serenity.Demo.Northwind/Product/Update";
		readonly Delete: "Serenity.Demo.Northwind/Product/Delete";
		readonly Retrieve: "Serenity.Demo.Northwind/Product/Retrieve";
		readonly List: "Serenity.Demo.Northwind/Product/List";
	};
}
export declare class RegionColumns {
	static columnsKey: string;
}
export interface RegionForm {
	RegionID: IntegerEditor;
	RegionDescription: StringEditor;
}
export declare class RegionForm extends PrefixedContext {
	static formKey: string;
	private static init;
	constructor(prefix: string);
}
export interface RegionRow {
	RegionID?: number;
	RegionDescription?: string;
}
export declare abstract class RegionRow {
	static readonly idProperty = "RegionID";
	static readonly nameProperty = "RegionDescription";
	static readonly localTextPrefix = "Northwind.Region";
	static readonly lookupKey = "Northwind.Region";
	/** @deprecated use getLookupAsync instead */
	static getLookup(): Q.Lookup<RegionRow>;
	static getLookupAsync(): Promise<Q.Lookup<RegionRow>>;
	static readonly deletePermission = "Northwind:General";
	static readonly insertPermission = "Northwind:General";
	static readonly readPermission = "Northwind:General";
	static readonly updatePermission = "Northwind:General";
	static readonly Fields: Readonly<Record<keyof RegionRow, string>>;
}
export declare namespace RegionService {
	const baseUrl = "Serenity.Demo.Northwind/Region";
	function Create(request: SaveRequest<RegionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Update(request: SaveRequest<RegionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<RegionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function List(request: ListRequest, onSuccess?: (response: ListResponse<RegionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
	const Methods: {
		readonly Create: "Serenity.Demo.Northwind/Region/Create";
		readonly Update: "Serenity.Demo.Northwind/Region/Update";
		readonly Delete: "Serenity.Demo.Northwind/Region/Delete";
		readonly Retrieve: "Serenity.Demo.Northwind/Region/Retrieve";
		readonly List: "Serenity.Demo.Northwind/Region/List";
	};
}
export declare class SalesByCategoryColumns {
	static columnsKey: string;
}
export interface SalesByCategoryRow {
	CategoryId?: number;
	CategoryName?: string;
	ProductName?: string;
	ProductSales?: number;
}
export declare abstract class SalesByCategoryRow {
	static readonly nameProperty = "CategoryName";
	static readonly localTextPrefix = "Northwind.SalesByCategory";
	static readonly deletePermission = "Northwind:General";
	static readonly insertPermission = "Northwind:General";
	static readonly readPermission = "Northwind:General";
	static readonly updatePermission = "Northwind:General";
	static readonly Fields: Readonly<Record<keyof SalesByCategoryRow, string>>;
}
export declare namespace SalesByCategoryService {
	const baseUrl = "Serenity.Demo.Northwind/SalesByCategory";
	function List(request: ListRequest, onSuccess?: (response: ListResponse<SalesByCategoryRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
	const Methods: {
		readonly List: "Serenity.Demo.Northwind/SalesByCategory/List";
	};
}
export declare class ShipperColumns {
	static columnsKey: string;
}
export declare class PhoneEditor extends StringEditor {
	constructor(input: JQuery);
	protected formatValue(): void;
	protected getFormattedValue(): string;
	multiple: boolean;
	get_value(): string;
	set_value(value: string): void;
	static validate(phone: string, isMultiple: boolean): string;
	static isValidPhone(phone: string): boolean;
	static formatPhone(phone: any): any;
	static formatMulti(phone: string, format: (s: string) => string): string;
	static isValidMulti(phone: string, check: (s: string) => boolean): boolean;
}
export interface ShipperForm {
	CompanyName: StringEditor;
	Phone: PhoneEditor;
}
export declare class ShipperForm extends PrefixedContext {
	static formKey: string;
	private static init;
	constructor(prefix: string);
}
export interface ShipperRow {
	ShipperID?: number;
	CompanyName?: string;
	Phone?: string;
}
export declare abstract class ShipperRow {
	static readonly idProperty = "ShipperID";
	static readonly nameProperty = "CompanyName";
	static readonly localTextPrefix = "Northwind.Shipper";
	static readonly lookupKey = "Northwind.Shipper";
	/** @deprecated use getLookupAsync instead */
	static getLookup(): Q.Lookup<ShipperRow>;
	static getLookupAsync(): Promise<Q.Lookup<ShipperRow>>;
	static readonly deletePermission = "Northwind:General";
	static readonly insertPermission = "Northwind:General";
	static readonly readPermission = "Northwind:General";
	static readonly updatePermission = "Northwind:General";
	static readonly Fields: Readonly<Record<keyof ShipperRow, string>>;
}
export declare namespace ShipperService {
	const baseUrl = "Serenity.Demo.Northwind/Shipper";
	function Create(request: SaveRequest<ShipperRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Update(request: SaveRequest<ShipperRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<ShipperRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function List(request: ListRequest, onSuccess?: (response: ListResponse<ShipperRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
	const Methods: {
		readonly Create: "Serenity.Demo.Northwind/Shipper/Create";
		readonly Update: "Serenity.Demo.Northwind/Shipper/Update";
		readonly Delete: "Serenity.Demo.Northwind/Shipper/Delete";
		readonly Retrieve: "Serenity.Demo.Northwind/Shipper/Retrieve";
		readonly List: "Serenity.Demo.Northwind/Shipper/List";
	};
}
export declare class SupplierColumns {
	static columnsKey: string;
}
export interface SupplierForm {
	CompanyName: StringEditor;
	ContactName: StringEditor;
	ContactTitle: StringEditor;
	Address: StringEditor;
	Region: StringEditor;
	PostalCode: StringEditor;
	Country: StringEditor;
	City: StringEditor;
	Phone: StringEditor;
	Fax: StringEditor;
	HomePage: StringEditor;
}
export declare class SupplierForm extends PrefixedContext {
	static formKey: string;
	private static init;
	constructor(prefix: string);
}
export interface SupplierRow {
	SupplierID?: number;
	CompanyName?: string;
	ContactName?: string;
	ContactTitle?: string;
	Address?: string;
	City?: string;
	Region?: string;
	PostalCode?: string;
	Country?: string;
	Phone?: string;
	Fax?: string;
	HomePage?: string;
}
export declare abstract class SupplierRow {
	static readonly idProperty = "SupplierID";
	static readonly nameProperty = "CompanyName";
	static readonly localTextPrefix = "Northwind.Supplier";
	static readonly lookupKey = "Northwind.Supplier";
	/** @deprecated use getLookupAsync instead */
	static getLookup(): Q.Lookup<SupplierRow>;
	static getLookupAsync(): Promise<Q.Lookup<SupplierRow>>;
	static readonly deletePermission = "Northwind:General";
	static readonly insertPermission = "Northwind:General";
	static readonly readPermission = "Northwind:General";
	static readonly updatePermission = "Northwind:General";
	static readonly Fields: Readonly<Record<keyof SupplierRow, string>>;
}
export declare namespace SupplierService {
	const baseUrl = "Serenity.Demo.Northwind/Supplier";
	function Create(request: SaveRequest<SupplierRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Update(request: SaveRequest<SupplierRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<SupplierRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function List(request: ListRequest, onSuccess?: (response: ListResponse<SupplierRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
	const Methods: {
		readonly Create: "Serenity.Demo.Northwind/Supplier/Create";
		readonly Update: "Serenity.Demo.Northwind/Supplier/Update";
		readonly Delete: "Serenity.Demo.Northwind/Supplier/Delete";
		readonly Retrieve: "Serenity.Demo.Northwind/Supplier/Retrieve";
		readonly List: "Serenity.Demo.Northwind/Supplier/List";
	};
}
export declare class TerritoryColumns {
	static columnsKey: string;
}
export interface TerritoryForm {
	TerritoryID: StringEditor;
	TerritoryDescription: StringEditor;
	RegionID: LookupEditor;
}
export declare class TerritoryForm extends PrefixedContext {
	static formKey: string;
	private static init;
	constructor(prefix: string);
}
export interface TerritoryRow {
	ID?: number;
	TerritoryID?: string;
	TerritoryDescription?: string;
	RegionID?: number;
	RegionDescription?: string;
}
export declare abstract class TerritoryRow {
	static readonly idProperty = "ID";
	static readonly nameProperty = "TerritoryID";
	static readonly localTextPrefix = "Northwind.Territory";
	static readonly lookupKey = "Northwind.Territory";
	/** @deprecated use getLookupAsync instead */
	static getLookup(): Q.Lookup<TerritoryRow>;
	static getLookupAsync(): Promise<Q.Lookup<TerritoryRow>>;
	static readonly deletePermission = "Northwind:General";
	static readonly insertPermission = "Northwind:General";
	static readonly readPermission = "Northwind:General";
	static readonly updatePermission = "Northwind:General";
	static readonly Fields: Readonly<Record<keyof TerritoryRow, string>>;
}
export declare namespace TerritoryService {
	const baseUrl = "Serenity.Demo.Northwind/Territory";
	function Create(request: SaveRequest<TerritoryRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Update(request: SaveRequest<TerritoryRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<TerritoryRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
	function List(request: ListRequest, onSuccess?: (response: ListResponse<TerritoryRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
	const Methods: {
		readonly Create: "Serenity.Demo.Northwind/Territory/Create";
		readonly Update: "Serenity.Demo.Northwind/Territory/Update";
		readonly Delete: "Serenity.Demo.Northwind/Territory/Delete";
		readonly Retrieve: "Serenity.Demo.Northwind/Territory/Retrieve";
		readonly List: "Serenity.Demo.Northwind/Territory/List";
	};
}
export declare class CategoryDialog extends EntityDialog<CategoryRow, any> {
	protected getFormKey(): string;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getNameProperty(): string;
	protected getService(): string;
	protected form: CategoryForm;
}
export declare class CategoryGrid extends EntityGrid<CategoryRow, any> {
	protected getColumnsKey(): string;
	protected getDialogType(): any;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getService(): string;
}
export declare class CustomerDialog extends EntityDialog<CustomerRow, any> {
	protected getFormKey(): string;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getNameProperty(): string;
	protected getService(): string;
	protected form: CustomerForm;
	private ordersGrid;
	private loadedState;
	constructor();
	getSaveState(): string;
	loadResponse(data: any): void;
	loadEntity(entity: CustomerRow): void;
	onSaveSuccess(response: any): void;
	getTemplate(): string;
}
export declare class CustomerGrid extends EntityGrid<CustomerRow, any> {
	protected getColumnsKey(): string;
	protected getDialogType(): any;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getService(): string;
}
export declare class OrderDialog extends EntityDialog<OrderRow, any> {
	protected getFormKey(): string;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getNameProperty(): string;
	protected getService(): string;
	protected form: OrderForm;
	constructor();
	getToolbarButtons(): import("@serenity-is/corelib").ToolButton[];
	protected updateInterface(): void;
}
export declare class CustomerOrderDialog extends OrderDialog {
	updateInterface(): void;
}
export declare class OrderGrid extends EntityGrid<OrderRow, any> {
	protected getColumnsKey(): string;
	protected getDialogType(): any;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getService(): string;
	protected shippingStateFilter: EnumEditor;
	constructor(container: JQuery);
	protected getQuickFilters(): import("@serenity-is/corelib").QuickFilter<import("@serenity-is/corelib").Widget<any>, any>[];
	protected createQuickFilters(): void;
	protected getButtons(): ToolButton[];
	protected getColumns(): import("@serenity-is/sleekgrid").Column<any>[];
	protected onClick(e: JQueryEventObject, row: number, cell: number): void;
	set_shippingState(value: number): void;
	protected addButtonClick(): void;
}
export declare class CustomerOrdersGrid extends OrderGrid {
	protected getDialogType(): typeof CustomerOrderDialog;
	constructor(container: JQuery);
	protected getColumns(): Column[];
	protected initEntityDialog(itemType: any, dialog: any): void;
	protected addButtonClick(): void;
	protected getInitialTitle(): any;
	protected getGridCanLoad(): boolean;
	private _customerID;
	get customerID(): string;
	set customerID(value: string);
}
export declare class EmployeeListFormatter implements Formatter {
	format(ctx: FormatterContext): string;
}
export declare class EmployeeFormatter implements Formatter {
	format(ctx: FormatterContext): string;
	genderProperty: string;
	initializeColumn(column: Column): void;
}
export declare class NoteDialog extends TemplatedDialog<any> {
	private textEditor;
	constructor();
	protected getTemplate(): string;
	protected getDialogButtons(): {
		text: string;
		click: () => void;
	}[];
	get text(): string;
	set text(value: string);
	okClick: () => void;
}
export declare class FreightFormatter implements Formatter {
	format(ctx: FormatterContext): string;
}
export declare class ProductDialog extends EntityDialog<ProductRow, any> {
	protected getFormKey(): string;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getNameProperty(): string;
	protected getService(): string;
	protected form: ProductForm;
}
export declare class ProductGrid extends EntityGrid<ProductRow, any> {
	protected getColumnsKey(): string;
	protected getDialogType(): any;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getService(): string;
	private pendingChanges;
	constructor(container: JQuery);
	protected getButtons(): import("@serenity-is/corelib").ToolButton[];
	protected onViewProcessData(response: any): import("@serenity-is/corelib/q").ListResponse<ProductRow>;
	/**
	 * It would be nice if we could use autonumeric, Serenity editors etc. here, to control input validation,
	 * but it's not supported by SlickGrid as we are only allowed to return a string, and should attach
	 * no event handlers to rendered cell contents
	 */
	private numericInputFormatter;
	private stringInputFormatter;
	/**
	 * Sorry but you cannot use LookupEditor, e.g. Select2 here, only possible is a SELECT element
	 */
	private selectFormatter;
	private getEffectiveValue;
	protected getColumns(): Column<any>[];
	private inputsChange;
	private setSaveButtonState;
	private saveClick;
	protected getQuickFilters(): import("@serenity-is/corelib").QuickFilter<import("@serenity-is/corelib").Widget<any>, any>[];
}
export declare class RegionDialog extends EntityDialog<RegionRow, any> {
	protected getFormKey(): string;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getNameProperty(): string;
	protected getService(): string;
	protected form: RegionForm;
}
export declare class RegionGrid extends EntityGrid<RegionRow, any> {
	protected getColumnsKey(): string;
	protected getDialogType(): any;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getService(): string;
}
export declare class ShipperDialog extends EntityDialog<ShipperRow, any> {
	protected getFormKey(): string;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getNameProperty(): string;
	protected getService(): string;
	protected form: ShipperForm;
}
export declare class ShipperFormatter implements Formatter {
	format(ctx: FormatterContext): string;
}
export declare class ShipperGrid extends EntityGrid<ShipperRow, any> {
	protected getColumnsKey(): string;
	protected getDialogType(): any;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getService(): string;
}
export declare class SupplierDialog extends EntityDialog<SupplierRow, any> {
	protected getFormKey(): string;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getNameProperty(): string;
	protected getService(): string;
	protected form: SupplierForm;
}
export declare class SupplierGrid extends EntityGrid<SupplierRow, any> {
	protected getColumnsKey(): string;
	protected getDialogType(): any;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getService(): string;
}
export declare class TerritoryDialog extends EntityDialog<TerritoryRow, any> {
	protected getFormKey(): string;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getNameProperty(): string;
	protected getService(): string;
	protected form: TerritoryForm;
}
export declare class TerritoryGrid extends EntityGrid<TerritoryRow, any> {
	protected getColumnsKey(): string;
	protected getDialogType(): any;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getService(): string;
}

export {};
