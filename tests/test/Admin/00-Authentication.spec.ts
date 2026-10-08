import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";


test.describe("AUTH - Authentication", async () => {

     const addmin = {
          user: "betterbytes.academy.admin",
          pass: "StrongPass@BetterBytesAcademy",
     }

     const userName = "thanh123";

     test("@AUTH_001: Login fail", async ({ page }) => {

          const loginAdminPage = new LoginPage(page);
          await loginAdminPage.loginAdmin(userName, userName);

          const errorLog = page.locator('//div[@id="login_error"]/p')
          await expect(errorLog).toBeVisible();
          await expect(errorLog).toHaveText(`Error: The username ${userName} is not registered on this site. If you are unsure of your username, try your email address instead.`);
     });

     test("@AUTH_002: Login success", async ({ page }) => {

          const loginAdminPage = new LoginPage(page);
          await loginAdminPage.loginAdmin(addmin.user, addmin.pass);

          await expect(page).toHaveURL(/\/wp-admin/);

          const heading1 = page.locator('//div[@class="wrap"]/child::h1');
          await expect(heading1).toHaveText("Dashboard");

     });

});