import { StringEditor, ImageUploadEditor, BooleanEditor, LookupEditor, DecimalEditor, IntegerEditor, PrefixedContext } from "@serenity-is/corelib";
import { SupplierDialog } from "@/../Serenity.Demo.Northwind/Supplier/SupplierDialog";
import { CategoryDialog } from "@/../Serenity.Demo.Northwind/";
import { initFormType } from "@serenity-is/corelib/q";

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

export class ProductForm extends PrefixedContext {
    static formKey = 'Northwind.Product';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!ProductForm.init)  {
            ProductForm.init = true;

            var w0 = StringEditor;
            var w1 = ImageUploadEditor;
            var w2 = BooleanEditor;
            var w3 = LookupEditor;
            var w4 = DecimalEditor;
            var w5 = IntegerEditor;

            initFormType(ProductForm, [
                'ProductName', w0,
                'ProductImage', w1,
                'Discontinued', w2,
                'SupplierID', w3,
                'CategoryID', w3,
                'QuantityPerUnit', w0,
                'UnitPrice', w4,
                'UnitsInStock', w5,
                'UnitsOnOrder', w5,
                'ReorderLevel', w5
            ]);
        }
    }
}

[SupplierDialog, CategoryDialog]; // inplace add dialog types
