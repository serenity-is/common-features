import { StaticTextBlock } from "@serenity-is/extensions";
import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface StaticTextBlockForm {
    StaticText: StaticTextBlock;
    SomeInput: StringEditor;
    HtmlList: StaticTextBlock;
    FromLocalText: StaticTextBlock;
    DisplayFieldValue: StaticTextBlock;
}

export class StaticTextBlockForm extends PrefixedContext {
    static formKey = 'BasicSamples.StaticTextBlock';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!StaticTextBlockForm.init)  {
            StaticTextBlockForm.init = true;

            var w0 = StaticTextBlock;
            var w1 = StringEditor;

            initFormType(StaticTextBlockForm, [
                'StaticText', w0,
                'SomeInput', w1,
                'HtmlList', w0,
                'FromLocalText', w0,
                'DisplayFieldValue', w0
            ]);
        }
    }
}
