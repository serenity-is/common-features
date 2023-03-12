import { Decorators, ISetEditValue, Widget } from "@serenity-is/corelib";
import { coalesce, localText, PropertyItem } from "@serenity-is/corelib/q";

/**
    * This is an editor widget but it only displays a text, not edits it.
    *  
    */
@Decorators.element("<div/>")
@Decorators.registerEditor('Serenity.Extensions.StaticTextBlock', [ISetEditValue])
export class StaticTextBlock extends Widget<StaticTextBlockOptions>
    implements ISetEditValue {

    private value: string;

    constructor(container: JQuery, options: StaticTextBlockOptions) {
        super(container, options);

        // hide the caption label for this editor if in a form. ugly hack
        if (this.options.hideLabel)
            this.element.closest('.field').find('.caption').hide();

        this.updateElementContent();
    }

    private updateElementContent() {
        var txt = coalesce(this.options.text, this.value);

        // if isLocalText is set, text is actually a local text key
        if (this.options.isLocalText)
            txt = localText(txt);

        // don't html encode if isHtml option is true
        if (this.options.isHtml)
            this.element.html(txt);
        else
            this.element.text(txt);
    }

    /**
        * By implementing ISetEditValue interface, we allow this editor to display its field value.
        * But only do this when our text content is not explicitly set in options
        */
    public setEditValue(source: any, property: PropertyItem) {
        if (this.options.text == null) {
            this.value = coalesce(this.options.text, source[property.name]);
            this.updateElementContent();
        }
    }
}

export interface StaticTextBlockOptions {
    text: string;
    isHtml: boolean;
    isLocalText: boolean;
    hideLabel: boolean;
}
