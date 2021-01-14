namespace Serenity.Demo.Northwind {
    export interface CategoryForm {
        CategoryName: StringEditor;
        Description: StringEditor;
    }

    export class CategoryForm extends Serenity.PrefixedContext {
        static formKey = 'Northwind.Category';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!CategoryForm.init)  {
                CategoryForm.init = true;

                var s = Serenity;
                var w0 = StringEditor;

                Q.initFormType(CategoryForm, [
                    'CategoryName', w0,
                    'Description', w0
                ]);
            }
        }
    }
}
