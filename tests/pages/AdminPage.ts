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
    posts: Locator;
    allPosts: Locator;
    addPost: Locator;
    categories: Locator;
    tags: Locator;
    header: Locator;
    searchTextBox: Locator;
    searchSubmit: Locator;
    table: Locator;
    titlePost: Locator;
    addPostBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.posts = page.locator('#menu-posts');
        this.allPosts = page.locator('//a[@class="wp-first-item current"]');
        this.addPost = page.locator('//a[@href="post-new.php"]');
        this.categories = page.locator('//a[@href="edit-tags.php?taxonomy=category"]');
        this.tags = page.locator('//a[@href="edit-tags.php?taxonomy=post_tag"]');
        this.header = page.locator('//h1[@class="wp-heading-inline"]');
        this.searchTextBox = page.locator('//input[@id="post-search-input"]');
        this.searchSubmit = page.locator('//input[@id="search-submit"]');
        this.table = page.locator('//table[@class="wp-list-table widefat fixed striped table-view-list posts"]');
        this.titlePost = page.locator('//a[@class="row-title"]');
        this.addPostBtn = page.locator('//a[@class="page-title-action"]');
    }
}

export class AddPost extends AdminPage {
    header: Locator;
    setting: Locator;
    btnPublish: Locator;
    addTitle: Locator;
    // document: Locator;

    constructor(page: Page) {
        super(page);
        this.header = page.locator('//div[@aria-label="Editor top bar"]');
        this.setting = page.locator('//div[@aria-label="Editor settings"]');
        this.btnPublish = page.locator('//button[text()="Publish"]');
        this.addTitle = page.locator("//h1[@aria-label='Add title' and @role='textbox']")
        // this.document = page.locator('//p[@role="document"]');
    }
}

export class Categories extends AdminPage {
    header: Locator;
    searchTextBox: Locator;
    searchBtn: Locator;
    table: Locator;
    nameCategory: Locator;
    addName: Locator;
    addSlug: Locator;
    addParentCategory: Locator;
    addDescription: Locator;
    addCategoryBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.header = page.locator('h1.wp-heading-inline');
        this.searchTextBox = page.locator('#tag-search-input');
        this.searchBtn = page.locator('#search-submit');
        this.table = page.locator('table.wp-list-table.widefat.fixed.striped.table-view-list.tags');
        this.nameCategory = page.locator('a.row-title');
        this.addName = page.locator('#tag-name');
        this.addSlug = page.locator('#tag-slug');
        this.addParentCategory = page.locator('#parent');
        this.addDescription = page.locator('#tag-description')
        this.addCategoryBtn = page.locator('#submit')
    }
}