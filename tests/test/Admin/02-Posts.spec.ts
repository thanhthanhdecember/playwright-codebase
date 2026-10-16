import { expect } from "@playwright/test";
import { test } from "../../fixtures/LoginAdminPage-fixture";
import { urlPost, searchPost, newPost, editPost, dataSearchCategory, dataAddCategory, dataEditCategory, dataAddTag, dataEditTag } from "../../test-data/posts";
import { assertAllSearchResult } from "../../utils/assertion";

test.describe('Posts Page', async () => {
    test('All Posts', async ({ loginAdminPage, wpAdminBar, adminMenu, posts }) => {
        await adminMenu.posts.click();
        await expect(posts.allPosts).toBeVisible();
        await expect(posts.allPosts).toBeVisible();
        await expect(posts.categories).toBeVisible();
        await expect(posts.tags).toBeVisible();

        await expect(posts.page).toHaveURL(urlPost.allPosts);
        await expect(posts.header).toHaveText('Posts');
        await expect(posts.searchTextBox).toBeVisible();
        await expect(posts.searchSubmit).toBeVisible();
        await expect(posts.theList).toBeVisible();

        //Assert Search Table
        await posts.searchTextBox.fill(searchPost);
        await posts.searchSubmit.click();
        await assertAllSearchResult(posts.theList, posts.theTitle, searchPost);
        //Assert AddPost Srceen
        await expect(posts.addPostBtn).toBeVisible();
        await posts.addPostBtn.click();
        await expect(posts.page).toHaveURL(urlPost.addPost);
    })

    test('Add Post', async ({ loginAdminPage, wpAdminBar, adminMenu, posts, addPost }) => {

        await adminMenu.posts.click();
        await posts.addPost.click();
        await expect(addPost.page).toHaveURL(urlPost.addPost);

        await expect(addPost.header).toHaveText('No title');
        await expect(addPost.btnPublish).toBeDisabled({ timeout: 30000 });
        await expect(addPost.addTitle).toBeEditable();
        await addPost.addTitle.fill(newPost.title)
        await expect(addPost.btnPublish).toBeVisible({ timeout: 30000 });
        await addPost.btnPublish.click();
        await addPost.btnConfirmPublish.click();

        // Assert New Post
        await addPost.btnViewPost.click();
        await posts.page.reload();
        await assertAllSearchResult(posts.theList, posts.theTitle, newPost.title, true)

    })

    test('Edit Post', async ({ loginAdminPage, wpAdminBar, adminMenu, posts, addPost }) => {

        await adminMenu.posts.click();
        await expect(posts.page).toHaveURL(urlPost.allPosts);

        await posts.searchTextBox.fill(newPost.title);
        await posts.searchSubmit.click();
        await assertAllSearchResult(posts.theList, posts.theTitle, newPost.title);
        await posts.theTitle.hover();
        await expect(posts.editBtn).toBeVisible();
        await posts.editBtn.click();

        await expect(addPost.header).toHaveText(newPost.title);
        await expect(addPost.addTitle).toHaveText(newPost.title);
        await addPost.addTitle.fill(editPost.title)

        await addPost.btnSave.click();

        await addPost.btnViewPost.click();
        await posts.page.reload();
        await assertAllSearchResult(posts.theList, posts.theTitle, editPost.title, true)

    })

    test('Tear Down', async ({ loginAdminPage, wpAdminBar, adminMenu, posts, page }) => {

        page.on('dialog', async dialog => dialog.accept());

        await adminMenu.posts.click();
        await expect(posts.page).toHaveURL(urlPost.allPosts);
        await posts.searchTextBox.fill(editPost.title);
        await posts.searchSubmit.click();
        await assertAllSearchResult(posts.theList, posts.theTitle, editPost.title);

        await posts.theTitle.hover();
        await expect(posts.editBtn).toBeVisible();
        await posts.trashBtn.click();

    })

});

test.describe('Categogy', async () => {

    test('Categories', async ({ loginAdminPage, wpAdminBar, adminMenu, posts, categories }) => {

        await adminMenu.posts.click();
        await posts.categories.click();
        await expect(categories.page).toHaveURL(urlPost.categories);
        await expect(categories.header).toBeVisible();
        await expect(categories.searchTextBox).toBeVisible();
        await expect(categories.searchSubmit).toBeVisible();

        await expect(categories.theList).toBeVisible();

        await expect(categories.addName).toBeVisible();
        await expect(categories.addName).toBeEditable();

        await expect(categories.addSlug).toBeVisible();
        await expect(categories.addSlug).toBeEditable();

        await expect(categories.addParentCategory).toBeVisible();
        await expect(categories.addParentCategory).toBeEditable();

        await expect(categories.addDescription).toBeVisible();
        await expect(categories.addDescription).toBeEditable();

        await expect(categories.addCategoryBtn).toBeVisible();

    })

    test('Search Category', async ({ loginAdminPage, wpAdminBar, adminMenu, posts, categories }) => {

        await adminMenu.posts.click();
        await posts.categories.click();
        await expect(categories.page).toHaveURL(/\/wp-admin\/edit-tags\.php/);

        await categories.searchTextBox.fill(dataSearchCategory);
        await categories.searchSubmit.click();
        await assertAllSearchResult(categories.theList, categories.nameCategory, dataSearchCategory)

    })

    test('Add Category', async ({ loginAdminPage, wpAdminBar, adminMenu, posts, addPost, categories }) => {

        await adminMenu.posts.click();
        await posts.categories.click();
        await expect(categories.page).toHaveURL(/\/wp-admin\/edit-tags\.php/);

        await categories.addName.fill(dataAddCategory.name);
        await expect(categories.addName).toHaveValue(dataAddCategory.name);
        await categories.addSlug.fill(dataAddCategory.slug);
        await expect(categories.addSlug).toHaveValue(dataAddCategory.slug);
        await categories.addParentCategory.selectOption({ value: dataAddCategory.parent });
        await expect(categories.addParentCategory).toHaveValue(dataAddCategory.parent);
        await categories.addDescription.fill(dataAddCategory.descrition)
        await categories.addCategoryBtn.click();

        await categories.searchTextBox.fill(dataAddCategory.name);
        await categories.searchSubmit.click();
        await assertAllSearchResult(categories.theList, categories.nameCategory, dataAddCategory.name)
        await assertAllSearchResult(categories.theList, categories.descriptionCategory, dataAddCategory.descrition)
        await assertAllSearchResult(categories.theList, categories.slugCategory, dataAddCategory.slug)

        //Assert Category In Add Post
        await posts.addPost.click();
        await expect(addPost.page).toHaveURL(/\/wp-admin\/post-new\.php/);
        await addPost.searchCategories.fill(dataAddCategory.name);
        await expect(addPost.nameCategories.filter({ hasText: dataAddCategory.name })).toBeVisible();

    })

    test('Edit Category', async ({ loginAdminPage, wpAdminBar, adminMenu, posts, addPost, categories }) => {

        await adminMenu.posts.click();
        await posts.categories.click();
        await expect(categories.page).toHaveURL(/\/wp-admin\/edit-tags\.php/);
        await categories.searchTextBox.fill(dataAddCategory.name);
        await categories.searchSubmit.click();
        await expect(categories.nameCategory).toHaveText(dataAddCategory.name);
        await categories.nameCategory.hover();
        await expect(categories.editBtn).toBeVisible();
        await categories.editBtn.click();

        //asert header
        await expect(categories.editHeader).toBeVisible();
        // assert Name
        await expect(categories.editName).toBeEditable();
        await expect(categories.editName).toHaveValue(dataAddCategory.name);
        // assert Slug
        await expect(categories.editSlug).toBeEditable();
        await expect(categories.editSlug).toHaveValue(dataAddCategory.slug);

        // assert Parent
        await expect(categories.editParentCategory).toBeEditable();
        await expect(categories.editParentCategory).toHaveValue(dataAddCategory.parent)
        // selected

        // assert Description
        await expect(categories.editDescription).toBeEditable();
        await expect(categories.editDescription).toHaveText(dataAddCategory.descrition)

        // Edit
        await categories.editName.fill(dataEditCategory.name);
        await expect(categories.editName).toHaveValue(dataEditCategory.name);
        await categories.editSlug.fill(dataEditCategory.slug);
        await expect(categories.editSlug).toHaveValue(dataEditCategory.slug);
        await categories.editParentCategory.selectOption({ value: dataEditCategory.parent });
        await expect(categories.editParentCategory).toHaveValue(dataEditCategory.parent);
        await categories.editDescription.fill(dataEditCategory.descrition);
        await categories.etitUpdateBtn.click();

        // Assert After Edit
        categories.updateMessage();
        await categories.editGoToCategory.click();
        await expect(categories.nameCategory).toHaveText(dataEditCategory.name);
        await expect(categories.descriptionCategory).toHaveText(dataEditCategory.descrition);
        await expect(categories.slugCategory).toHaveText(dataEditCategory.slug);

        await posts.addPost.click();
        await expect(addPost.page).toHaveURL(/\/wp-admin\/post-new\.php/);
        await addPost.searchCategories.fill(dataEditCategory.name);
        await expect(addPost.nameCategories.filter({ hasText: dataEditCategory.name })).toBeVisible();

    })

    test('Teardown', async ({ loginAdminPage, wpAdminBar, adminMenu, posts, categories, page }) => {

        page.on('dialog', async dialog => dialog.accept());

        await adminMenu.posts.click();
        await posts.categories.click();
        await expect(categories.page).toHaveURL(/\/wp-admin\/edit-tags\.php/);
        await categories.searchTextBox.fill(dataEditCategory.name);
        await categories.searchSubmit.click();
        await expect(categories.nameCategory).toHaveText(dataEditCategory.name);
        await categories.nameCategory.hover();
        await expect(categories.deleteBtn).toBeVisible();
        await categories.deleteBtn.click();

    })

});

test.describe('Tags', async () => {

    test('Tags', async ({ loginAdminPage, wpAdminBar, adminMenu, posts, tags }) => {

        await adminMenu.posts.click();
        await posts.tags.click();
        await expect(tags.page).toHaveURL(urlPost.tags);
        await expect(tags.header).toBeVisible();
        await expect(tags.searchTextBox).toBeVisible();
        await expect(tags.searchSubmit).toBeVisible();

        await expect(tags.theList).toBeVisible();

        await expect(tags.addName).toBeVisible();
        await expect(tags.addName).toBeEditable();

        await expect(tags.addSlug).toBeVisible();
        await expect(tags.addSlug).toBeEditable();

        await expect(tags.addDescription).toBeVisible();
        await expect(tags.addDescription).toBeEditable();

        await expect(tags.addTagBtn).toBeVisible();

    })

    test('Search Tags', async ({ loginAdminPage, wpAdminBar, adminMenu, posts, tags }) => {

        await adminMenu.posts.click();
        await posts.tags.click();
        await expect(tags.page).toHaveURL(/\/wp-admin\/edit-tags\.php/);

        await tags.searchTextBox.fill(dataSearchCategory);
        await tags.searchSubmit.click();
        await assertAllSearchResult(tags.theList, tags.nameTags, dataSearchCategory)

    })

    test('Add Tags', async ({ loginAdminPage, wpAdminBar, adminMenu, posts, tags }) => {

        await adminMenu.posts.click();
        await posts.tags.click();
        await expect(tags.page).toHaveURL(/\/wp-admin\/edit-tags\.php/);

        await tags.addName.fill(dataAddTag.name);
        await expect(tags.addName).toHaveValue(dataAddTag.name);
        await tags.addSlug.fill(dataAddTag.slug);
        await expect(tags.addSlug).toHaveValue(dataAddTag.slug);
        await tags.addDescription.fill(dataAddTag.descrition)
        await tags.addTagBtn.click();

        await tags.searchTextBox.fill(dataAddTag.name);
        await tags.searchSubmit.click();
        await assertAllSearchResult(tags.theList, tags.nameTags, dataAddTag.name)
        await assertAllSearchResult(tags.theList, tags.descriptionTags, dataAddTag.descrition)
        await assertAllSearchResult(tags.theList, tags.slugTags, dataAddTag.slug)

    })

    test('Edit Category', async ({ loginAdminPage, wpAdminBar, adminMenu, posts, tags }) => {

        await adminMenu.posts.click();
        await posts.tags.click();
        await expect(tags.page).toHaveURL(/\/wp-admin\/edit-tags\.php/);
        await tags.searchTextBox.fill(dataAddTag.name);
        await tags.searchSubmit.click();
        await expect(tags.nameTags).toHaveText(dataAddTag.name);
        await tags.nameTags.hover();
        await expect(tags.editBtn).toBeVisible();
        await tags.editBtn.click();

        //asert header
        await expect(tags.editHeader).toBeVisible();
        // assert Name
        await expect(tags.editName).toBeEditable();
        await expect(tags.editName).toHaveValue(dataAddTag.name);
        // assert Slug
        await expect(tags.editSlug).toBeEditable();
        await expect(tags.editSlug).toHaveValue(dataAddTag.slug);

        // assert Description
        await expect(tags.editDescription).toBeEditable();
        await expect(tags.editDescription).toHaveText(dataAddTag.descrition)

        // Edit
        await tags.editName.fill(dataEditTag.name);
        await expect(tags.editName).toHaveValue(dataEditTag.name);
        await tags.editSlug.fill(dataEditTag.slug);
        await expect(tags.editSlug).toHaveValue(dataEditTag.slug);
        await tags.editDescription.fill(dataEditTag.descrition);
        await tags.etitUpdateBtn.click();

        // Assert After Edit
        tags.updateMessage();
        await tags.editGoToTags.click();
        await expect(tags.nameTags).toHaveText(dataEditTag.name);
        await expect(tags.descriptionTags).toHaveText(dataEditTag.descrition);
        await expect(tags.slugTags).toHaveText(dataEditTag.slug);

    })

    test('Teardown', async ({ loginAdminPage, wpAdminBar, adminMenu, posts, tags, page }) => {

        page.on('dialog', async dialog => dialog.accept());

        await adminMenu.posts.click();
        await posts.tags.click();
        await expect(tags.page).toHaveURL(/\/wp-admin\/edit-tags\.php/);
        await tags.searchTextBox.fill(dataEditTag.name);
        await tags.searchSubmit.click();
        await expect(tags.nameTags).toHaveText(dataEditTag.name);
        await tags.nameTags.hover();
        await expect(tags.deleteBtn).toBeVisible();
        await tags.deleteBtn.click();

    })

});

