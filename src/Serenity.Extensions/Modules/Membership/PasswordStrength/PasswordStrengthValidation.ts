import { PasswordEditor, getRemoteDataAsync, localText, stringFormat } from "@serenity-is/corelib";
import { PasswordStrengthRules } from "../../ServerTypes/Extensions/PasswordStrengthRules";

export async function getPasswordStrengthRules(): Promise<PasswordStrengthRules> {
    return await getRemoteDataAsync<PasswordStrengthRules>("PasswordStrengthRules");
}

export function addPasswordStrengthValidation(passwordEditor: PasswordEditor, uniqueName: string) {
    getPasswordStrengthRules().then((passwordStrengthRules) => {
        passwordEditor.addValidationRule(uniqueName, () => {
            if (passwordEditor.value.length < passwordStrengthRules.MinPasswordLength)
                return stringFormat(localText("Validation.MinRequiredPasswordLength"), passwordStrengthRules.MinPasswordLength);
        });

        if (passwordStrengthRules.RequireDigit) {
            passwordEditor.addValidationRule(uniqueName, () => {
                if (!(/[0-9]/.test(passwordEditor.value)))
                    return stringFormat(localText("Validation.PasswordStrengthRequireDigit"));
            });
        }        

        if (passwordStrengthRules.RequireLowercase) {
            passwordEditor.addValidationRule(uniqueName, () => {
                if (!(/[a-z\p{Ll}]/.test(passwordEditor.value)))
                    return localText("Validation.PasswordStrengthRequireDigit");
            });
        }

        if (passwordStrengthRules.RequireUppercase) {
            passwordEditor.addValidationRule(uniqueName, () => {
                if (!(/[A-Z\p{Lu}]/u.test(passwordEditor.value)))
                    return localText("Validation.PasswordStrengthRequireUppercase");
            });
        }

        if (passwordStrengthRules.RequireNonAlphanumeric) {
            passwordEditor.addValidationRule(uniqueName, () => {
                if (!(/[^\s\p{L}]/u.test(passwordEditor.value)))
                    return localText("Validation.PasswordStrengthRequireNonAlphanumeric");                
            });
        }
    });
}