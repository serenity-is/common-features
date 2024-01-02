import { PasswordEditor, getRemoteData, getRemoteDataAsync, localText, stringFormat } from "@serenity-is/corelib";

export interface PasswordStrengthRules {
    MinLength?: number;
    MinLowerCharCount?: number;
    MinUpperCharCount?: number;
    MinNumericCharCount?: number;
    MinSpecialCharCount?: number;
}

export function getPasswordRulesAsync() {
    return getRemoteDataAsync("PasswordStrengthRules").then(s => s as PasswordStrengthRules);
}

export function addPasswordStrengthValidationRules(passwordEditor: PasswordEditor, uniqueName: string) {
    getPasswordRulesAsync().then((passwordStrengthRules) => {
        passwordEditor.addValidationRule(uniqueName, () => {
            if (passwordEditor.value.length < passwordStrengthRules.MinLength)
                return stringFormat(localText("Validation.MinRequiredPasswordLength"), passwordStrengthRules.MinLength);
        });

        if (passwordStrengthRules.MinLowerCharCount > 0) {
            passwordEditor.addValidationRule(uniqueName, () => {
                var lowerChars = passwordEditor.value.replace(/[^a-z]/g, "");
                if (lowerChars.length < passwordStrengthRules.MinLowerCharCount)
                    return stringFormat(localText("Validation.MinRequiredLowerCharInPassword"), passwordStrengthRules.MinLowerCharCount);
            });
        }

        if (passwordStrengthRules.MinUpperCharCount > 0) {
            passwordEditor.addValidationRule(uniqueName, () => {
                var upperChars = passwordEditor.value.replace(/[^A-Z]/g, "");
                if (upperChars.length < passwordStrengthRules.MinUpperCharCount)
                    return stringFormat(localText("Validation.MinRequiredUpperCharInPassword"), passwordStrengthRules.MinUpperCharCount);
            });
        }

        if (passwordStrengthRules.MinNumericCharCount > 0) {
            passwordEditor.addValidationRule(uniqueName, () => {
                var numericChars = passwordEditor.value.replace(/[^0-9]/g, "");
                if (numericChars.length < passwordStrengthRules.MinNumericCharCount)
                    return stringFormat(localText("Validation.MinRequiredNumericCharInPassword"), passwordStrengthRules.MinNumericCharCount);
            });
        }

        if (passwordStrengthRules.MinSpecialCharCount > 0) {
            passwordEditor.addValidationRule(uniqueName, () => {
                var specialChars = passwordEditor.value.replace(/[a-zA-Z0-9]/g, "");
                if (specialChars.length < passwordStrengthRules.MinSpecialCharCount)
                    return stringFormat(localText("Validation.MinRequiredSpecialCharInPassword"), passwordStrengthRules.MinSpecialCharCount);
            });
        }
    });
}