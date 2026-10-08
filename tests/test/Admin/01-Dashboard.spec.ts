import { expect } from "@playwright/test";
import { test } from "../../fixtures/LoginAdminPage-fixture";

test.describe('Admin Page', async () => {

    test('Home', async ({ loginAdminPage, wpAdminBar, adminMenu, dashBoard }) => {
        await expect(dashBoard.header).toBeVisible();
        await expect(dashBoard.header).toHaveText('Dashboard');
        await expect(dashBoard.home).toBeVisible();
        await expect(dashBoard.atAGlance).toBeVisible();
        await expect(dashBoard.activity).toBeVisible();
        await expect(dashBoard.quickDraft).toBeVisible();
        await expect(dashBoard.wordPress).toBeVisible();
        await expect(dashBoard.siteHealth).toBeVisible();

        await expect(dashBoard.updates).toBeVisible();
        await dashBoard.updates.click();
        await expect(dashBoard.page).toHaveURL(/\/wp-admin\/update-core\.php/);
        await expect(dashBoard.upHeader).toBeVisible();
        await expect(dashBoard.upHeader).toHaveText('WordPress Updates');
    });

    test('Updates', async ({ loginAdminPage, wpAdminBar, adminMenu, dashBoard }) => {

        await expect(dashBoard.updates).toBeVisible();
        await dashBoard.updates.click();
        await expect(dashBoard.page).toHaveURL(/\/wp-admin\/update-core\.php/);
        await expect(dashBoard.upHeader).toBeVisible();
        await expect(dashBoard.upHeader).toHaveText('WordPress Updates');
        await expect(dashBoard.upCurrentVer).toBeVisible();
        await expect(dashBoard.upResponse).toBeVisible();
        await expect(dashBoard.upPlugins).toBeVisible();
        await dashBoard.countPlugins();
        await expect(dashBoard.upThemes).toBeVisible();
        await dashBoard.countThemes();

    });

});