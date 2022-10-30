import { initFullHeightGridPage } from "@serenity-is/corelib/q"
import { CategoryGrid } from "./CategoryGrid";

$(function () {
    initFullHeightGridPage(new CategoryGrid($('#GridDiv')).element);
});