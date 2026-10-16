import { expect } from "@playwright/test";
import { test } from "../../fixtures/LoginAdminPage-fixture";
import { urlMedia } from "../../test-data/media";
import { assertAllSearchResult } from "../../utils/assertion";

test.describe('Media', async()=>{
    test('Library', async({loginAdminPage, wpAdminBar, adminMenu, media})=>{

        await adminMenu.media.click();
        await expect(media.page).toHaveURL(urlMedia.library);
        await expect(media.header).toBeVisible();
        await expect(media.addMediaBtn).toBeVisible();
        await expect(media.searchTextBox).toBeVisible();
        await expect(media.searchTextBox).toBeEditable();
        await expect(media.mediaList).toBeVisible();

        

    })
})