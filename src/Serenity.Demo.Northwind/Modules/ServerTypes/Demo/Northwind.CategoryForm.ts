import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface CategoryForm {
    CategoryName: StringEditor;
    Description: StringEditor;
}

export class CategoryForm extends PrefixedContext {
    static readonly formKey = 'Northwind.Category';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!CategoryForm.init)  {
            CategoryForm.init = true;

            var w0 = StringEditor;

            initFormType(CategoryForm, [
                'CategoryName', w0,
                'Description', w0
            ]);
        }
    }
}