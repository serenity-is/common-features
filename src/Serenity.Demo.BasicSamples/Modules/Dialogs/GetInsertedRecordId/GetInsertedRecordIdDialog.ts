import { Decorators, SaveResponse } from "@serenity-is/corelib";
import { notifySuccess, notifyInfo } from "@serenity-is/corelib/q";
import { CategoryDialog, CategoryService } from "@serenity-is/demo.northwind";

@Decorators.registerClass('Serenity.Demo.BasicSamples.GetInsertedRecordIdDialog')
export class GetInsertedRecordIdDialog extends CategoryDialog {

    /**
     * This method is called after the save request to service
     * is completed succesfully. This can be an insert or update.
     *
     * @param response Response that is returned from server
     */
    protected onSaveSuccess(response: SaveResponse): void {

        // check that this is an insert
        if (this.isNew()) {
            notifySuccess("Just inserted a category with ID: " + response.EntityId);

            // you could also open a new dialog
            // new CategoryDialog().loadByIdAndOpenDialog(response.EntityId);

            // but let's better load inserted record using Retrieve service
            CategoryService.Retrieve(<any>{
                EntityId: response.EntityId
            }, resp => {
                notifyInfo("Looks like the category you added has name: " + resp.Entity.CategoryName);
            });
        }
    }
}