import { PasswordEditor, getRemoteData, localText, stringFormat } from "@serenity-is/corelib";

export interface ScriptPasswordRules {
    MinPasswordLength?: number;
    MinPasswordLowerChars?: number;
    MinPasswordUpperChars?: number;
    MinPasswordNumericChars?: number;
    MinPasswordSpecialChars?: number;
}

export function passwordRules() {
    return getRemoteData("PasswordRules") as ScriptPasswordRules;
}

export function addValidationRules(uniqueName: string, passwordEditor: PasswordEditor) {
    const rules = passwordRules();

    passwordEditor.addValidationRule(uniqueName, () => {
        if (passwordEditor.value.length < rules.MinPasswordLength)
            return stringFormat(localText("Validation.MinRequiredPasswordLength"), rules.MinPasswordLength);
    });

    if (rules.MinPasswordLowerChars > 0) {
        passwordEditor.addValidationRule(uniqueName, () => {
            var lowerChars = passwordEditor.value.replace(/[^a-z]/g, "");
            if (lowerChars.length < rules.MinPasswordLowerChars)
                return stringFormat(localText("Validation.MinRequiredLowerCharInPassword"), rules.MinPasswordLowerChars);
        });
    }

    if (rules.MinPasswordUpperChars > 0) {
        passwordEditor.addValidationRule(uniqueName, () => {
            var upperChars = passwordEditor.value.replace(/[^A-Z]/g, "");
            if (upperChars.length < rules.MinPasswordUpperChars)
                return stringFormat(localText("Validation.MinRequiredUpperCharInPassword"), rules.MinPasswordUpperChars);
        });
    }

    if (rules.MinPasswordNumericChars > 0) {
        passwordEditor.addValidationRule(uniqueName, () => {
            var numericChars = passwordEditor.value.replace(/[^0-9]/g, "");
            if (numericChars.length < rules.MinPasswordNumericChars)
                return stringFormat(localText("Validation.MinRequiredNumericCharInPassword"), rules.MinPasswordNumericChars);
        });
    }

    if (rules.MinPasswordSpecialChars > 0) {
        passwordEditor.addValidationRule(uniqueName, () => {
            var specialChars = passwordEditor.value.replace(/[a-zA-Z0-9]/g, "");
            if (specialChars.length < rules.MinPasswordSpecialChars)
                return stringFormat(localText("Validation.MinRequiredSpecialCharInPassword"), rules.MinPasswordSpecialChars);
        });
    }
}