import { expect } from "@playwright/test";
import { test } from "../../fixtures/LoginAdminPage-fixture";
import { urlMedia } from "../../test-data/media";
import { itemCountRegex } from "../../test-data/regex";
import { assertAllSearchResult, assertItemCount } from "../../utils/assertion";

test.describe('Media', async () => {
    test('Library', async ({ loginAdminPage, wpAdminBar, adminMenu, media }) => {

        await adminMenu.media.click();
        await expect(media.page).toHaveURL(urlMedia.library);
        await expect(media.header).toBeVisible();
        await expect(media.addMediaBtn).toBeVisible();
        await expect(media.searchTextBox).toBeVisible();
        await expect(media.searchTextBox).toBeEditable();
        await expect(media.mediaList).toBeVisible();
        await expect(media.loadMoreCount).toBeVisible();
        // console.log(await media.loadMoreCount.textContent())

        assertItemCount(media.mediaItems, media.loadMoreCount, itemCountRegex.mediaLibrary, 1)

        // const countText = await media.loadMoreCount.textContent(); //trả về text hiển thị của phần tử.
        // const match = countText!.match(itemCountRegex.mediaLibrary)
        // const expectedCount = Number(match![1]);
        // await expect(media.mediaItems).toHaveCount(expectedCount);

    });
})