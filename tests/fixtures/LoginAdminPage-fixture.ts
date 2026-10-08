import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { WPAdminBar, AdminMenu, Dashboard, Posts, AddPost, Categories } from "../pages/AdminPage";

const test = base.extend<{ loginAdminPage: LoginPage; wpAdminBar: WPAdminBar; adminMenu: AdminMenu; dashBoard: Dashboard; posts: Posts; addPost: AddPost; categories: Categories }>({

    loginAdminPage: async ({ page }, use) => {

        const addmin = {
            user: "betterbytes.academy.admin",
            pass: "StrongPass@BetterBytesAcademy",
        }
        const loginAdminPage = new LoginPage(page);
        await loginAdminPage.loginAdmin(addmin.user, addmin.pass);
        await expect(page).toHaveURL(/\/wp-admin/);

        await use(loginAdminPage);
        console.log('LoginAdmin: End of test')
    },

    wpAdminBar: async ({ page }, use) => {

        const wpAdminBar = new WPAdminBar(page);

        await expect(wpAdminBar.wpBar).toBeVisible();
        await expect(wpAdminBar.myAccount).toContainText('Better Bytes Academy Admin');
        await wpAdminBar.myAccount.hover();
        await expect(wpAdminBar.editProfile).toBeVisible();
        await expect(wpAdminBar.logOut).toBeVisible();

        await use(wpAdminBar);
        console.log('WPAdminBar: End of test')
    },

    adminMenu: async ({ page }, use) => {
        const adminMenu = new AdminMenu(page);

        await expect(adminMenu.adminMenu).toBeVisible();
        await expect(adminMenu.dashBoard).toBeVisible();
        await expect(adminMenu.media).toBeVisible();
        await expect(adminMenu.pages).toBeVisible();
        await expect(adminMenu.comments).toBeVisible();
        await expect(adminMenu.appearance).toBeVisible();
        await expect(adminMenu.plugins).toBeVisible();
        await expect(adminMenu.users).toBeVisible();
        await expect(adminMenu.tools).toBeVisible();
        await expect(adminMenu.setting).toBeVisible();
        await expect(adminMenu.apiAuth).toBeVisible();
        await expect(adminMenu.collapseMenu).toBeVisible();

        await use(adminMenu);
        console.log('AdminMenu: End of test')
    },

    dashBoard: async ({ page }, use) => {

        const dashBoard = new Dashboard(page);
        await use(dashBoard);
    },

    posts: async ({ page }, use) => {
        const posts = new Posts(page);
        await use(posts);
    },

    addPost: async ({ page }, use) => {
        const addPost = new AddPost(page);
        await use(addPost);
    },

    categories: async ({ page }, use) => {
        const categories = new Categories(page);
        await use(categories);
    }


});

export { test };

