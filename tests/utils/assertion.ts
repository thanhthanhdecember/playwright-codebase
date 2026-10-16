import { expect, Locator } from "@playwright/test";

function escapeRegex(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function assertAllSearchResult(theList: Locator, titleLocator: Locator, searchValue: string, isNewPostAdded: boolean = false) {
    
    await expect(theList).toBeVisible();
    const count = await titleLocator.count();

    if (isNewPostAdded) {
        // assert new value add in table
        await expect(titleLocator.first()).toHaveText(searchValue);

    } else if (count > 0) {
        // assert many value in table
        const searchRegex = new RegExp(escapeRegex(searchValue), 'i');

        for (let i = 0; i < count; i++) {
            const item = titleLocator.nth(i);

            await expect(item).toContainText(searchRegex);
        }
    } else {
        // assert no value match with search value
        await expect(theList).toHaveText(/No posts found\./i);
    }
}

export async function assertItemCount (itemsLocator: Locator, countTextLocator: Locator, regex: RegExp, groupIndex: number = 1): Promise<void>{

    const countText = await countTextLocator.textContent(); //trả về text hiển thị của phần tử.
    const match = countText!.match(regex) //countText khong null
    const expectedCount = Number(match![groupIndex]);
    await expect(itemsLocator).toHaveCount(expectedCount);

}