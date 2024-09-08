import { ServiceRequest } from "@serenity-is/corelib";
import { TranslateTextOutput } from "./TranslateTextOutput";

export interface TranslateTextResponse extends ServiceRequest {
    Translations?: TranslateTextOutput[];
}