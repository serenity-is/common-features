import { Decorators, StringEditor, WX, WidgetProps, localText, replaceAll } from "@serenity-is/corelib";

@Decorators.registerEditor('Serenity.Demo.Northwind.PhoneEditor')
export class PhoneEditor<P = {}> extends StringEditor<P> {

    constructor(props: WidgetProps<any>) {
        super(props);

        this.addValidationRule(this.uniqueName, e => {
            var value = this.get_value()?.trim();
            if (!value)
                return null;
            return PhoneEditor.validate(value, this.multiple);
        });

        let input = this.element;
        input.on('change', e => {
            if (!WX.hasOriginalEvent(e)) {
                return;
            }
            this.formatValue();
        });

        input.on('blur', e => {
            if (this.element.hasClass('valid')) {
                this.formatValue();
            }
        });
    }

    protected formatValue(): void {
        this.element.val(this.getFormattedValue());
    }

    protected getFormattedValue(): string {
        var value = this.element.val() as any;
        if (this.multiple) {
            return PhoneEditor.formatMulti(value, PhoneEditor.formatPhone);
        }
        return PhoneEditor.formatPhone(value);
    }

    @Decorators.option()
    public multiple: boolean;

    get_value() {
        return this.getFormattedValue();
    }

    set_value(value: string) {
        this.element.val(value);
    }

    static validate(phone: string, isMultiple: boolean) {
        var valid = (isMultiple ? PhoneEditor.isValidMulti(phone, PhoneEditor.isValidPhone) : PhoneEditor.isValidPhone(phone));
        if (valid) {
            return null;
        }
        return localText((isMultiple ? 'Validation.NorthwindPhoneMultiple' : 'Validation.NorthwindPhone'));
    }

    static isValidPhone(phone: string) {
        if (!phone) {
            return false;
        }
        phone = replaceAll(replaceAll(phone, ' ', ''), '-', '');
        if (phone.length < 10) {
            return false;
        }

        if (phone.startsWith('0')) {
            phone = phone.substring(1);
        }

        if (phone.startsWith('(') && phone.charAt(4) === ')') {
            phone = phone.substr(1, 3) + phone.substring(5);
        }

        if (phone.length !== 10) {
            return false;
        }

        if (phone.startsWith('0')) {
            return false;
        }

        for (var i = 0; i < phone.length; i++) {
            var c = phone.charAt(i);
            if (c < '0' || c > '9') {
                return false;
            }
        }

        return true;
    }

    static formatPhone(phone) {
        if (!PhoneEditor.isValidPhone(phone)) {
            return phone;
        }
        phone = replaceAll(replaceAll(replaceAll(replaceAll(phone, ' ', ''), '-', ''), '(', ''), ')', '');
        if (phone.startsWith('0')) {
            phone = phone.substring(1);
        }
        phone = '(' + phone.substr(0, 3) + ') ' + phone.substr(3, 3) + '-' + phone.substr(6, 2) + phone.substr(8, 2);
        return phone;
    }

    static formatMulti(phone: string, format: (s: string) => string) {
        var phones = replaceAll(phone, String.fromCharCode(59), String.fromCharCode(44)).split(String.fromCharCode(44));
        var result = '';
        for (var x of phones) {
            var s = x?.trim();
            if (!s)
                continue;
            if (result.length > 0)
                result += ', ';
            result += format(s);
        }
        return result;
    }

    static isValidMulti(phone: string, check: (s: string) => boolean) {
        if (!phone)
            return false;
        var phones = replaceAll(phone, String.fromCharCode(59), String.fromCharCode(44)).split(String.fromCharCode(44));
        var anyValid = false;
        for (var $t1 = 0; $t1 < phones.length; $t1++) {
            var x = phones[$t1];
            var s = x?.trim();
            if (!s)
                continue;
            if (!check(s))
                return false;
            anyValid = true;
        }
        if (!anyValid)
            return false;
        return true;
    }
}
