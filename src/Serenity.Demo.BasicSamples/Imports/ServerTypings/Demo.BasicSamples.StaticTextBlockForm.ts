namespace Serenity.Demo.BasicSamples {
    export interface StaticTextBlockForm {
        StaticText: Extensions.StaticTextBlock;
        SomeInput: StringEditor;
        HtmlList: Extensions.StaticTextBlock;
        FromLocalText: Extensions.StaticTextBlock;
        DisplayFieldValue: Extensions.StaticTextBlock;
    }

    export class StaticTextBlockForm extends Serenity.PrefixedContext {
        static formKey = 'BasicSamples.StaticTextBlock';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!StaticTextBlockForm.init)  {
                StaticTextBlockForm.init = true;

                var s = Serenity;
                var w0 = Extensions.StaticTextBlock;
                var w1 = StringEditor;

                Q.initFormType(StaticTextBlockForm, [
                    'StaticText', w0,
                    'SomeInput', w1,
                    'HtmlList', w0,
                    'FromLocalText', w0,
                    'DisplayFieldValue', w0
                ]);
            }
        }
    }
}
