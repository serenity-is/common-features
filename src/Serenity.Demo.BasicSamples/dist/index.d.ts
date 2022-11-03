/// <reference types="jquery" />
/// <reference types="jquery.validation" />
/// <reference types="jqueryui" />

import { BooleanEditor, DateEditor, DecimalEditor, EntityDialog, EntityGrid, Formatter, IInitializeColumn, ImageUploadEditor, IntegerEditor, ListResponse, LookupEditor, LookupEditorBase, LookupEditorOptions, PrefixedContext, PropertyDialog, QuickFilter, SaveResponse, Select2Editor, ServiceRequest, ServiceResponse, StringEditor, TemplatedDialog, ToolButton, Widget } from '@serenity-is/corelib';
import { ServiceOptions } from '@serenity-is/corelib/q';
import { CategoryDialog, CategoryGrid, CategoryRow, CustomerDialog, CustomerEditor, CustomerGrid, OrderDetailDialog, OrderDetailRow, OrderDetailsEditor, OrderDialog, OrderGrid, OrderRow, ProductDialog, ProductRow, SalesByCategoryRow, SupplierDialog, SupplierGrid, SupplierRow } from '@serenity-is/demo.northwind';
import { GridEditorDialog, SelectableEntityGrid, StaticTextBlock } from '@serenity-is/extensions';
import { Column, FormatterContext, GridOptions } from '@serenity-is/sleekgrid';

export declare class ChartInDialog extends TemplatedDialog<any> {
	private areaChart;
	static initializePage(): void;
	protected onDialogOpen(): void;
	protected getTemplate(): string;
	protected getDialogOptions(): JQueryUI.DialogOptions;
}
export declare class CloneableEntityDialog extends ProductDialog {
	protected updateInterface(): void;
	/**
		* Overriding this method is optional to customize cloned entity
		*/
	protected getCloningEntity(): import("@serenity-is/demo.northwind").ProductRow;
}
/**
 * Subclass of ProductGrid to override dialog type to CloneableEntityDialog
 */
export declare class CloneableEntityGrid extends EntityGrid<ProductRow, any> {
	protected getColumnsKey(): string;
	protected getDialogType(): typeof CloneableEntityDialog;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getService(): string;
}
export declare class DefaultValuesInNewGrid extends OrderGrid {
	constructor(container: JQuery);
	/**
	 * This method is called when New Item button is clicked.
	 * By default, it calls EditItem with an empty entity.
	 * This is a good place to fill in default values for New Item button.
	 */
	protected addButtonClick(): void;
	protected getButtons(): import("@serenity-is/corelib").ToolButton[];
}
export declare namespace DialogBoxes {
	function initializePage(): void;
}
/**
 * A version of order dialog converted to a panel by adding Serenity.@Decorators.panel decorator.
 */
export declare class EntityDialogAsPanel extends OrderDialog {
	constructor();
	protected updateInterface(): void;
	protected onSaveSuccess(response: any): void;
}
export declare class GetInsertedRecordIdDialog extends CategoryDialog {
	/**
	 * This method is called after the save request to service
	 * is completed succesfully. This can be an insert or update.
	 *
	 * @param response Response that is returned from server
	 */
	protected onSaveSuccess(response: SaveResponse): void;
}
/**
 * Subclass of CategoryGrid to override dialog type to GetInsertedRecordIdDialog
 */
export declare class GetInsertedRecordIdGrid extends CategoryGrid {
	protected getDialogType(): typeof GetInsertedRecordIdDialog;
	constructor(container: JQuery);
}
/**
 * Our custom order dialog subclass that will have a tab to display and edit selected customer details.
 */
export declare class OtherFormInTabDialog extends OrderDialog {
	private customerPropertyGrid;
	private customerForm;
	private customerValidator;
	constructor();
	getCustomerID(): number;
	loadEntity(entity: OrderRow): void;
	getTemplate(): string;
}
/**
 * Subclass of OrderGrid to override dialog type to OtherFormInTabDialog
 */
export declare class OtherFormInTabGrid extends OrderGrid {
	protected getDialogType(): typeof OtherFormInTabDialog;
	constructor(container: JQuery);
}
/**
 * Our custom order dialog subclass that will have a tab to display and edit selected customer details.
 * With single toolbar for all forms
 */
export declare class OtherFormOneBarDialog extends OrderDialog {
	private customerPropertyGrid;
	private customerForm;
	private customerValidator;
	private selfChange;
	constructor();
	getCustomerID(): number;
	loadEntity(entity: OrderRow): void;
	protected saveCustomer(callback: (response: SaveResponse) => void, onSuccess?: (response: SaveResponse) => void): boolean;
	protected saveOrder(callback: (response: SaveResponse) => void): void;
	protected saveAll(callback: (response: SaveResponse) => void): void;
	protected save(callback: (response: SaveResponse) => void): void;
	protected getTemplate(): string;
}
/**
 * Subclass of OrderGrid to override dialog type to OtherFormInTabOneBarDialog
 */
export declare class OtherFormInTabOneBarGrid extends OrderGrid {
	protected getDialogType(): typeof OtherFormOneBarDialog;
	constructor(container: JQuery);
}
export interface OrdersByShipperRequest extends ServiceRequest {
}
export interface OrdersByShipperResponse extends ServiceResponse {
	Values?: {
		[key: string]: any;
	}[];
	ShipperKeys?: string[];
	ShipperLabels?: string[];
}
export declare namespace BasicSamplesService {
	const baseUrl = "Serenity.Demo.BasicSamples";
	function OrdersByShipper(request: OrdersByShipperRequest, onSuccess?: (response: OrdersByShipperResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
	const Methods: {
		readonly OrdersByShipper: "Serenity.Demo.BasicSamples/OrdersByShipper";
	};
}
/**
 * Our custom product editor type
 */
export declare class ChangingLookupTextEditor extends LookupEditorBase<LookupEditorOptions, ProductRow> {
	constructor(container: JQuery, options: LookupEditorOptions);
	protected getLookupKey(): string;
	protected getItemText(item: ProductRow, lookup: Q.Lookup<ProductRow>): string;
}
export interface ChangingLookupTextForm {
	ProductID: ChangingLookupTextEditor;
	UnitPrice: DecimalEditor;
	Quantity: IntegerEditor;
	Discount: DecimalEditor;
}
export declare class ChangingLookupTextForm extends PrefixedContext {
	static formKey: string;
	private static init;
	constructor(prefix: string);
}
/**
 * Our subclass of order detail dialog with a CategoryID property
 * that will be used to set CascadeValue of product editor
 */
export declare class FilteredLookupOrderDetailDialog extends OrderDetailDialog {
	constructor();
	/**
	 * This method is called just before an entity is loaded to dialog
	 * This is also called for new record mode with an empty entity
	 */
	protected beforeLoadEntity(entity: any): void;
	categoryID: number;
}
/**
 * Our subclass of Order Details editor with a CategoryID property
 */
export declare class FilteredLookupDetailEditor extends OrderDetailsEditor {
	protected getDialogType(): typeof FilteredLookupOrderDetailDialog;
	constructor(container: JQuery);
	categoryID: number;
	/**
	 * This method is called to initialize an edit dialog created by
	 * grid editor when Add button or an edit link is clicked
	 * We have an opportunity here to pass CategoryID to edit dialog
	 */
	protected initEntityDialog(itemType: string, dialog: Widget<any>): void;
}
export interface FilteredLookupInDetailForm {
	CustomerID: CustomerEditor;
	OrderDate: DateEditor;
	CategoryID: LookupEditor;
	DetailList: FilteredLookupDetailEditor;
}
export declare class FilteredLookupInDetailForm extends PrefixedContext {
	static formKey: string;
	private static init;
	constructor(prefix: string);
}
/**
 * Our select editor with hardcoded values.
 *
 * When you define a new editor type, make sure you build
 * and transform templates for it to be available
 * in server side forms, e.g. [HardCodedValuesEditor]
 */
export declare class HardcodedValuesEditor extends Select2Editor<any, any> {
	constructor(container: JQuery);
}
export interface HardcodedValuesForm {
	SomeValue: HardcodedValuesEditor;
}
export declare class HardcodedValuesForm extends PrefixedContext {
	static formKey: string;
	private static init;
	constructor(prefix: string);
}
export declare class InlineImageInGridColumns {
	static columnsKey: string;
}
/**
 * This is our category editor that will show only categories of Produce and
 * Seafood. We are subclassing LookupEditorBase which also LookupEditor
 * derives from.
 *
 * After compiling and transforming templates, this editor type will be
 * available in server side to use in our LookupFilterByMultipleForm,
 * which is a version of ProductForm that uses our custom editor.
 */
export declare class ProduceSeafoodCategoryEditor extends LookupEditorBase<LookupEditorOptions, CategoryRow> {
	constructor(container: JQuery, opt: LookupEditorOptions);
	/**
	 * Normally LookupEditor requires a lookup key to determine which set of
	 * lookup data to show in editor. As our editor will only show category
	 * data, we lock it to category lookup key.
	 */
	protected getLookupKey(): string;
	/**
	 * Here we are filtering by category name but you could filter by any field.
	 * Just make sure the fields you filter on has [LookupInclude] attribute on them,
	 * otherwise their value will be null in client side as they are not sent back
	 * from server in lookup script.
	 */
	protected getItems(lookup: Q.Lookup<CategoryRow>): CategoryRow[];
}
export interface LookupFilterByMultipleForm {
	ProductName: StringEditor;
	ProductImage: ImageUploadEditor;
	Discontinued: BooleanEditor;
	SupplierID: LookupEditor;
	CategoryID: ProduceSeafoodCategoryEditor;
	QuantityPerUnit: StringEditor;
	UnitPrice: DecimalEditor;
	UnitsInStock: IntegerEditor;
	UnitsOnOrder: IntegerEditor;
	ReorderLevel: IntegerEditor;
}
export declare class LookupFilterByMultipleForm extends PrefixedContext {
	static formKey: string;
	private static init;
	constructor(prefix: string);
}
export interface PopulateLinkedDataForm {
	CustomerID: CustomerEditor;
	CustomerContactName: StringEditor;
	CustomerContactTitle: StringEditor;
	CustomerCity: StringEditor;
	CustomerRegion: StringEditor;
	CustomerCountry: StringEditor;
	CustomerPhone: StringEditor;
	CustomerFax: StringEditor;
	OrderDate: DateEditor;
	RequiredDate: DateEditor;
	EmployeeID: LookupEditor;
	DetailList: OrderDetailsEditor;
}
export declare class PopulateLinkedDataForm extends PrefixedContext {
	static formKey: string;
	private static init;
	constructor(prefix: string);
}
export interface StaticTextBlockForm {
	StaticText: StaticTextBlock;
	SomeInput: StringEditor;
	HtmlList: StaticTextBlock;
	FromLocalText: StaticTextBlock;
	DisplayFieldValue: StaticTextBlock;
}
export declare class StaticTextBlockForm extends PrefixedContext {
	static formKey: string;
	private static init;
	constructor(prefix: string);
}
export declare class PopulateLinkedDataDialog extends EntityDialog<OrderRow, any> {
	protected getFormKey(): string;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getNameProperty(): string;
	protected getService(): string;
	protected form: PopulateLinkedDataForm;
	constructor();
	private setCustomerDetails;
	/**
	 * This dialog will have CSS class "s-PopulateLinkedDataDialog"
	 * We are changing it here to "s-OrderDialog", to make it use default OrderDialog styles
	 * This has no effect other than looks on populate linked data demonstration
	 */
	protected getCssClass(): string;
}
/**
 * A subclass of OrderGrid that launches PopulateLinkedDataDialog
 */
export declare class PopulateLinkedDataGrid extends OrderGrid {
	protected getDialogType(): typeof PopulateLinkedDataDialog;
	constructor(container: JQuery);
}
export declare class ReadOnlyDialog extends SupplierDialog {
	/**
	 * This is the method that gets list of tool
	 * buttons to be created in a dialog.
	 *
	 * Here we'll remove save and close button, and
	 * apply changes buttons.
	 */
	protected getToolbarButtons(): ToolButton[];
	/**
	 * This method is a good place to update states of
	 * interface elements. It is called after dialog
	 * is initialized and an entity is loaded into dialog.
	 * This is also called in new item mode.
	 */
	protected updateInterface(): void;
	/**
	 * This method is called when dialog title needs to be updated.
	 * Base class returns something like 'Edit xyz' for edit mode,
	 * and 'New xyz' for new record mode.
	 *
	 * But our dialog is readonly, so we should change it to 'View xyz'
	 */
	protected getEntityTitle(): string;
	/**
	 * This method is actually the one that calls getEntityTitle()
	 * and updates the dialog title. We could do it here too...
	 */
	protected updateTitle(): void;
}
/**
 * A readonly grid that launches ReadOnlyDialog
 */
export declare class ReadOnlyGrid extends SupplierGrid {
	protected getDialogType(): typeof ReadOnlyDialog;
	constructor(container: JQuery);
	/**
	 * Removing add button from grid using its css class
	 */
	protected getButtons(): ToolButton[];
}
export declare class SerialAutoNumberDialog extends CustomerDialog {
	constructor();
	protected afterLoadEntity(): void;
	private getNextNumber;
}
/**
 * Subclass of CustomerGrid to override dialog type to SerialAutoNumberDialog
 */
export declare class SerialAutoNumberGrid extends CustomerGrid {
	protected getDialogType(): typeof SerialAutoNumberDialog;
	constructor(container: JQuery);
}
export declare class ChangingLookupTextDialog extends GridEditorDialog<OrderDetailRow> {
	protected getFormKey(): string;
	protected getLocalTextPrefix(): string;
	protected form: ChangingLookupTextForm;
	constructor();
	protected updateInterface(): void;
}
/**
 * Basic order dialog with a category selection
 */
export declare class FilteredLookupInDetailDialog extends EntityDialog<OrderRow, any> {
	protected getFormKey(): string;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getNameProperty(): string;
	protected getService(): string;
	private form;
	constructor();
}
/**
 * Subclass of OrderGrid to override dialog type to FilteredLookupInDetailDialog
 */
export declare class FilteredLookupInDetailGrid extends OrderGrid {
	protected getDialogType(): typeof FilteredLookupInDetailDialog;
	constructor(container: JQuery);
}
/**
 * This is our custom product dialog that uses a different product form
 * (LookupFilterByMultipleForm) with our special category editor.
 */
export declare class LookupFilterByMultipleDialog extends ProductDialog {
	protected getFormKey(): string;
}
/**
 * Subclass of ProductGrid to override dialog type to CloneableEntityDialog
 */
export declare class LookupFilterByMultipleGrid extends EntityGrid<ProductRow, any> {
	protected getColumnsKey(): string;
	protected getDialogType(): typeof LookupFilterByMultipleDialog;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getService(): string;
	constructor(container: JQuery);
	/**
	 * This method is called just before List request is sent to service.
	 * You have an opportunity here to cancel request or modify it.
	 * Here we'll add a custom criteria to list request.
	 */
	protected onViewSubmit(): boolean;
}
export declare class HardcodedValuesDialog extends PropertyDialog<any, any> {
	protected getFormKey(): string;
	protected form: HardcodedValuesForm;
	constructor();
}
export declare class StaticTextBlockDialog extends PropertyDialog<any, any> {
	protected getFormKey(): string;
	protected form: StaticTextBlockForm;
	constructor();
	/**
	 * Here we override loadInitialEntity method to set value for "DisplayFieldValue" field.
	 * If this was an EntityDialog, your field value would be originating from server side entity.
	 */
	protected loadInitialEntity(): void;
	protected getDialogOptions(): JQueryUI.DialogOptions;
}
export declare class CustomLinksInGrid extends OrderGrid {
	constructor(container: JQuery);
	/**
	 * We override getColumns() to change format functions for some columns.
	 * You could also write them as formatter classes, and use them at server side
	 */
	protected getColumns(): Column[];
	protected onClick(e: JQueryEventObject, row: number, cell: number): void;
	/**
	 * This method is called for columns with [EditLink] attribute,
	 * but only for edit links of this grid's own item type.
	 * It is also called by Add Product button with a NULL entityOrId
	 * parameter so we should check that entityOrId is a string
	 * to be sure it is originating from a link.
	 *
	 * As we changed format for other columns, this will only be called
	 * for links in remaining OrderID column
	 */
	protected editItem(entityOrId: any): void;
}
export declare class RowSelectionGrid extends SelectableEntityGrid<SupplierRow, any> {
	protected getColumnsKey(): string;
	protected getDialogType(): any;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getService(): string;
}
export declare class GridFilteredByCriteria extends EntityGrid<ProductRow, any> {
	protected getColumnsKey(): string;
	protected getDialogType(): typeof ProductDialog;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getService(): string;
	protected onViewSubmit(): boolean;
}
export declare class GroupingAndSummariesInGrid extends EntityGrid<ProductRow, any> {
	protected getColumnsKey(): string;
	protected getDialogType(): typeof LookupFilterByMultipleDialog;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getService(): string;
	constructor(container: JQuery);
	protected createSlickGrid(): import("@serenity-is/sleekgrid").Grid<any>;
	protected getColumns(): import("@serenity-is/sleekgrid").Column<any>[];
	protected getSlickOptions(): import("@serenity-is/sleekgrid").GridOptions<any>;
	protected usePager(): boolean;
	protected getButtons(): {
		title: string;
		cssClass: string;
		onClick: () => void;
	}[];
}
export declare class InitialValuesForQuickFilters extends OrderGrid {
	constructor(container: JQuery);
	/**
	 * This method is called to get list of quick filters to be created for this grid.
	 * By default, it returns quick filter objects corresponding to properties that
	 * have a [QuickFilter] attribute at server side OrderColumns.cs
	 */
	protected getQuickFilters(): QuickFilter<Widget<any>, any>[];
	/**
	 * This method is another possible place to modify quick filter widgets.
	 * It is where the quick filter widgets are actually created.
	 *
	 * By default, it calls getQuickFilters() then renders UI for these
	 * quick filters.
	 *
	 * We could use getQuickFilters() method for ShipVia too,
	 * but this is for demonstration purposes
	 */
	protected createQuickFilters(): void;
}
export declare class InlineActionGrid extends CustomerGrid {
	constructor(container: JQuery);
	protected getColumns(): import("@serenity-is/sleekgrid").Column<any>[];
	protected onClick(e: JQueryEventObject, row: number, cell: number): void;
}
export declare class InlineImageFormatter implements Formatter, IInitializeColumn {
	format(ctx: FormatterContext): string;
	initializeColumn(column: Column): void;
	fileProperty: string;
	thumb: boolean;
}
export declare class InlineImageInGrid extends EntityGrid<ProductRow, any> {
	protected getColumnsKey(): string;
	protected getDialogType(): any;
	protected getIdProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getService(): string;
	constructor(container: JQuery);
	protected getSlickOptions(): GridOptions;
}
export declare class RemovingAddButton extends SupplierGrid {
	constructor(container: JQuery);
	/**
	 * This method is called to get list of buttons to be created.
	 */
	protected getButtons(): ToolButton[];
}
export declare class ViewWithoutIDGrid extends EntityGrid<SalesByCategoryRow, any> {
	protected getColumnsKey(): string;
	protected getIdProperty(): string;
	protected getNameProperty(): string;
	protected getLocalTextPrefix(): string;
	protected getService(): string;
	private nextId;
	constructor(container: JQuery);
	/**
	 * This method is called to preprocess data returned from the list service
	 */
	protected onViewProcessData(response: ListResponse<SalesByCategoryRow>): ListResponse<SalesByCategoryRow>;
	protected getButtons(): any[];
}
export declare class WrappedHeadersGrid extends OrderGrid {
	constructor(container: JQuery);
}

export {};
