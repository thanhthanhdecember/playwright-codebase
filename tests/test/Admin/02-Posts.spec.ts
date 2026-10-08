// Hover => Kiểm tra 4 element
// Click vào post => kiểm tra 4 element
// All Posts: Add post by button / verify 4 screen
// Add Post: menubar/ add title / add content / publish / view post in post / Delete post
// Categories: list / add category / view in list / view in add post
// Tags: list / add tag / view in list / view in add post
import { expect } from "@playwright/test";
import { test } from "../../fixtures/LoginAdminPage-fixture";

test.describe('Posts Page', async () => {
    test('All Posts', async ({ loginAdminPage, wpAdminBar, adminMenu, posts }) => {
        await posts.posts.click();
        await expect(posts.allPosts).toBeVisible();
        await expect(posts.allPosts).toBeVisible();
        await expect(posts.categories).toBeVisible();
        await expect(posts.tags).toBeVisible();

        await expect(posts.page).toHaveURL(/\/wp-admin\/edit\.php/);
        await expect(posts.header).toHaveText('Posts');
        await expect(posts.searchTextBox).toBeVisible();
        await expect(posts.searchSubmit).toBeVisible();
        await expect(posts.table).toBeVisible();

        await posts.searchTextBox.fill('Amily');
        await posts.searchSubmit.click();
        expect(await posts.titlePost.textContent()).toContain('Amily');

        await expect(posts.addPostBtn).toBeVisible();
        await posts.addPostBtn.click();
        await expect(posts.page).toHaveURL(/\/wp-admin\/post-new\.php/);
    })

    test('Add Post', async ({ loginAdminPage, wpAdminBar, adminMenu, posts, addPost }) => {
        await posts.posts.click();
        await posts.addPost.click();
        await expect(addPost.page).toHaveURL(/\/wp-admin\/post-new\.php/);
        await expect(addPost.btnPublish).toBeDisabled({ timeout: 30000 });
        await expect(addPost.addTitle).toBeVisible();
        // await expect(addPost.document).toBeEditable();
    }) // chưa add title được

    test('Categories', async ({loginAdminPage, wpAdminBar, adminMenu, posts, categories}) => {
        await posts.posts.click();
        await posts.categories.click();
        await expect(categories.page).toHaveURL(/\/wp-admin\/edit-tags\.php/);
        await expect(categories.header).toBeVisible();
        await expect(categories.searchTextBox).toBeVisible();
        await expect(categories.searchBtn).toBeVisible();
        await expect(categories.table).toBeVisible();

        await expect(categories.addName).toBeVisible();
        await expect(categories.addName).toBeEditable();

        await expect(categories.addSlug).toBeVisible();
        await expect(categories.addSlug).toBeEditable();

        await expect(categories.addParentCategory).toBeVisible();
        await expect(categories.addParentCategory).toBeEditable();

        await expect(categories.addDescription).toBeVisible();
        await expect(categories.addDescription).toBeEditable();

        await expect(categories.addCategoryBtn).toBeVisible();

        await categories.addName.fill('Amily');
        await expect(categories.addName).toHaveValue('Amily');
        await categories.addSlug.fill('Amily');
        await expect(categories.addSlug).toHaveValue('Amily');
        await categories.addParentCategory.selectOption({value: '10284'});
        await expect(categories.addParentCategory).toHaveValue('10284');
        await categories.addDescription.fill('Playwright Test is an end-to-end test framework for modern web apps. It bundles test runner, assertions, isolation, parallelization and rich tooling. Playwright supports Chromium, WebKit and Firefox on Windows, Linux and macOS, locally or in CI, headless or headed, with native mobile emulation for Chrome (Android) and Mobile Safari.')
        // await categories.addCategoryBtn.click();







    })

})