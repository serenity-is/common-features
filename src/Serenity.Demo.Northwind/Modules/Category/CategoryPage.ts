import { initFullHeightGridPage } from "@serenity-is/corelib"
import { CategoryGrid } from "./CategoryGrid";

$(function () {
    initFullHeightGridPage(new CategoryGrid($('#GridDiv')).element);
});