import { ListResponse } from "@serenity-is/corelib/q";
import { TranslationItem } from "./TranslationItem";

export interface TranslationListResponse extends ListResponse<TranslationItem> {
    KeysByAssembly?: { [key: string]: string[] };
}