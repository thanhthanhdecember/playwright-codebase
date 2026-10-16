import { Page, Locator, expect } from "@playwright/test";

export class AdminPage {
    page: Page;
    baseURL: Locator;

    constructor(page: Page) {
        this.page = page;
        this.baseURL = page.locator('https://pw-practice-dev.playwrightvn.com/wp-admin');
    }
}

export class WPAdminBar extends AdminPage {

    wpBar: Locator;
    myAccount: Locator;
    editProfile: Locator;
    logOut: Locator;

    constructor(page: Page) {
        super(page)
        this.wpBar = page.locator('//div[@id="wpadminbar"]');
        this.myAccount = page.locator('//a[@aria-expanded="false"]/child::span[text()="Better Bytes Academy Admin"]');
        this.editProfile = page.locator('//a/child::span[text()="Edit Profile"]');
        this.logOut = page.locator('//a[text()="Log Out"]');
    }

}

export class AdminMenu extends AdminPage {
    adminMenu: Locator;
    dashBoard: Locator;
    posts: Locator;
    media: Locator;
    pages: Locator;
    comments: Locator;
    appearance: Locator;
    plugins: Locator;
    users: Locator;
    tools: Locator;
    setting: Locator;
    apiAuth: Locator;
    collapseMenu: Locator;

    constructor(page: Page) {
        super(page);
        this.adminMenu = page.locator('#adminmenuwrap')
        this.dashBoard = page.locator('#menu-dashboard');
        this.posts = page.locator('#menu-posts');
        this.media = page.locator('#menu-media');
        this.pages = page.locator('#menu-pages');
        this.comments = page.locator('#menu-comments');
        this.appearance = page.locator('#menu-appearance');
        this.plugins = page.locator('#menu-plugins');
        this.users = page.locator('#menu-users');
        this.tools = page.locator('#menu-tools');
        this.setting = page.locator('#menu-settings');
        this.apiAuth = page.locator('#toplevel_page_mo_api_authentication_settings');
        this.collapseMenu = page.locator('#collapse-menu');
    }
}

export class Dashboard extends AdminPage {
    header: Locator;
    home: Locator;
    atAGlance: Locator;
    activity: Locator;
    quickDraft: Locator;
    wordPress: Locator;
    siteHealth: Locator;
    updates: Locator;
    upHeader: Locator;
    upCurrentVer: Locator;
    upResponse: Locator;
    upPlugins: Locator;
    upThemes: Locator


    constructor(page: Page) {
        super(page);
        this.header = page.locator('//h1[text()="Dashboard"]');
        this.home = page.locator('//a[text()="Home"]');
        this.atAGlance = page.locator('//h2[text()="At a Glance"]');
        this.activity = page.locator('//h2[text()="Activity"]');
        this.quickDraft = page.locator('//h2/child::span[text()="Quick Draft"]');
        this.wordPress = page.locator('//h2[text()="WordPress Events and News"]');
        this.siteHealth = page.locator('//h2[text()="Site Health Status"]');

        this.updates = page.locator('//a[@href="update-core.php"]');
        this.upHeader = page.locator('//h1[text()="WordPress Updates"]');
        this.upCurrentVer = page.locator('//h2[@class="wp-current-version"]');
        this.upResponse = page.locator('//h2[@class="response"]');
        this.upPlugins = page.locator('//h2[contains(text(), "Plugins")]');
        this.upThemes = page.locator('//h2[contains(text(), "Themes")]');

    }

    async countPlugins() {
        const element = await this.page.locator('//table[@id="update-plugins-table"]/child::tbody[@class="plugins"]/tr').count();
        const count = await this.page.locator("//h2[contains(text(), 'Plugins')]/child::span[@class='count']").textContent();
        const number = parseInt((count ?? '').replace(/[^0-9]/g, ''), 10);
        expect(element).toBe(number);
    }

    async countThemes() {
        const element = await this.page.locator('//table[@id="update-themes-table"]/child::tbody[@class="plugins"]/tr').count();
        const count = await this.page.locator("//h2[contains(text(), 'Themes')]/child::span[@class='count']").textContent();
        const number = parseInt((count ?? '').replace(/[^0-9]/g, ''), 10);
        expect(element).toBe(number);
    }


}

export class Posts extends AdminPage {
    allPosts: Locator;
    addPost: Locator;
    categories: Locator;
    tags: Locator;
    header: Locator;
    searchTextBox: Locator;
    searchSubmit: Locator;
    theList: Locator;
    theTitle: Locator;
    addPostBtn: Locator;

    editBtn: Locator;
    trashBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.allPosts = page.locator('//a[@class="wp-first-item current"]');
        this.addPost = page.locator('//a[@href="post-new.php"]');
        this.categories = page.locator('//a[@href="edit-tags.php?taxonomy=category"]');
        this.tags = page.locator('//a[@href="edit-tags.php?taxonomy=post_tag"]');
        this.header = page.locator('//h1[@class="wp-heading-inline"]');
        this.searchTextBox = page.locator('//input[@id="post-search-input"]');
        this.searchSubmit = page.locator('//input[@id="search-submit"]');
        this.theList = page.locator('//tbody[@id="the-list"]');
        this.theTitle = page.locator('//a[@class="row-title"]')
        this.addPostBtn = page.locator('//a[@class="page-title-action"]');
        this.editBtn = page.locator('.row-actions .edit')
        this.trashBtn = page.locator('.row-actions .trash')

    }

    // findTitle(title: string): Locator {
    //     return this.theList.getByRole('link', { name: title, exact: true })
    // }


}

export class AddPost extends AdminPage {
    header: Locator;
    setting: Locator;
    btnPublish: Locator;
    addTitle: Locator;
    // document: Locator;
    btnConfirmPublish: Locator;
    btnViewPost: Locator;
    btnSave: Locator;

    searchCategories: Locator;
    nameCategories: Locator;

    constructor(page: Page) {
        super(page);
        this.header = page.locator('//span[@class="editor-document-bar__post-title"]');
        this.setting = page.locator('//div[@aria-label="Editor settings"]');
        this.btnPublish = page.locator('//button[text()="Publish"]');
        this.addTitle = page
            .frameLocator('iframe')
            .locator("h1[aria-label='Add title'][role='textbox']");
        // this.document = page
        // .frameLocator('iframe')
        // .locator('//p[@id="block-9fbb3cd1-1db8-41f4-b20f-ef6c2461544e"]');
        this.btnConfirmPublish = page.locator('//div[@class="editor-post-publish-panel__header-publish-button"]/child::button')
        this.btnViewPost = page.locator('//div[@class="edit-post-fullscreen-mode-close__view-mode-toggle-icon"]')
        this.searchCategories = page.locator('//input[@id="components-search-control-0"]')
        this.nameCategories = page.locator('//label[@class="components-checkbox-control__label"]')
        this.btnSave = page.locator('//button[text()="Save"]');
    }
}

export class Categories extends AdminPage {
    header: Locator;

    searchTextBox: Locator;
    searchSubmit: Locator;
    theList: Locator;
    nameCategory: Locator;
    descriptionCategory: Locator;
    slugCategory: Locator;
    editBtn: Locator;
    deleteBtn: Locator


    addName: Locator;
    addSlug: Locator;
    addParentCategory: Locator;
    addDescription: Locator;
    addCategoryBtn: Locator;

    editHeader: Locator;
    editMessage: Locator;
    editGoToCategory: Locator
    editName: Locator;
    editSlug: Locator;
    editParentCategory: Locator;
    editDescription: Locator;
    etitUpdateBtn: Locator;
    etditDeleteBtn: Locator;


    constructor(page: Page) {
        super(page);
        this.header = page.locator('h1.wp-heading-inline');

        this.searchTextBox = page.locator('#tag-search-input');
        this.searchSubmit = page.locator('#search-submit');
        this.theList = page.locator('#the-list');
        this.nameCategory = page.locator('a.row-title');
        this.descriptionCategory = page.locator('td.description.column-description span.screen-reader-text, td.description.column-description p');
        this.slugCategory = page.locator('td.slug.column-slug')
        this.editBtn = page.locator('.row-actions .edit')
        this.deleteBtn = page.locator('.row-actions .delete')

        this.addName = page.locator('#tag-name');
        this.addSlug = page.locator('#tag-slug');
        this.addParentCategory = page.locator('#parent');
        this.addDescription = page.locator('#tag-description')
        this.addCategoryBtn = page.locator('#submit')

        this.editHeader = page.locator('h1');
        this.editMessage = page.locator('//div[@id="message"]')
        this.editGoToCategory = page.locator('//div[@id="message"]/p/a')
        this.editName = page.locator('#name');
        this.editSlug = page.locator('#slug')
        this.editParentCategory = page.locator('#parent');
        this.editDescription = page.locator('#description');
        this.etitUpdateBtn = page.locator('input.button.button-primary');
        this.etditDeleteBtn = page.locator('#delete-link');
    }

    updateMessage() {
        expect(this.editMessage).toBeVisible();
        expect(this.page.locator('//div[@id="message"]/p/strong[text()="Category updated."]')).toBeVisible();
        expect(this.page.locator('//div[@id="message"]/p/a')).toBeVisible();
    }

}

export class Tags extends AdminPage {
    header: Locator;

    searchTextBox: Locator;
    searchSubmit: Locator;
    theList: Locator;
    nameTags: Locator;
    descriptionTags: Locator;
    slugTags: Locator;
    editBtn: Locator;
    deleteBtn: Locator


    addName: Locator;
    addSlug: Locator;
    addDescription: Locator;
    addTagBtn: Locator;

    editHeader: Locator;
    editMessage: Locator;
    editGoToTags: Locator
    editName: Locator;
    editSlug: Locator;
    editDescription: Locator;
    etitUpdateBtn: Locator;
    etditDeleteBtn: Locator;


    constructor(page: Page) {
        super(page);
        this.header = page.locator('h1.wp-heading-inline');

        this.searchTextBox = page.locator('#tag-search-input');
        this.searchSubmit = page.locator('#search-submit');
        this.theList = page.locator('#the-list');
        this.nameTags = page.locator('a.row-title');
        this.descriptionTags = page.locator('td.description.column-description span.screen-reader-text, td.description.column-description p');
        this.slugTags = page.locator('td.slug.column-slug')
        this.editBtn = page.locator('.row-actions .edit')
        this.deleteBtn = page.locator('.row-actions .delete')

        this.addName = page.locator('#tag-name');
        this.addSlug = page.locator('#tag-slug');
        this.addDescription = page.locator('#tag-description')
        this.addTagBtn = page.locator('#submit')

        this.editHeader = page.locator('h1');
        this.editMessage = page.locator('//div[@id="message"]')
        this.editGoToTags = page.locator('//div[@id="message"]/p/a')
        this.editName = page.locator('#name');
        this.editSlug = page.locator('#slug')
        this.editDescription = page.locator('#description');
        this.etitUpdateBtn = page.locator('input.button.button-primary');
        this.etditDeleteBtn = page.locator('#delete-link');
    }

    updateMessage() {
        expect(this.editMessage).toBeVisible();
        expect(this.page.locator('//div[@id="message"]/p/strong[text()="Tag updated."]')).toBeVisible();
        expect(this.page.locator('//div[@id="message"]/p/a')).toBeVisible();
    }

}

export class Media extends AdminPage {
    header: Locator;
    addMediaBtn: Locator;
    searchTextBox: Locator
    mediaList: Locator;
    mediaItems: Locator;
    loadMoreCount: Locator;

    constructor(page: Page){
        super(page);
        this.header = page.locator('//h1');
        this.addMediaBtn = page.locator('//a[@class="page-title-action aria-button-if-js"]');
        this.searchTextBox = page.locator('//input[@id="media-search-input"]');
        this.mediaList = page.locator('//div[@class="attachments-wrapper"]');
        this.mediaItems = page.locator('//ul[@id="__attachments-view-48"]/child::li');
        this.loadMoreCount = page.locator('//div[@class="load-more-wrapper"]/child::p')
    }

    // lấy số lượng -> assert số item = số lượng
}

export class AddMediaFile extends AdminPage {

}