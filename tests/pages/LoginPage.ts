import { Page } from "@playwright/test";

export class LoginPage {
    page: Page;
    urlBase: string = 'https://pw-practice-dev.playwrightvn.com/wp-login.php';
    xpathUserName: string = '#user_login';
    xpathPassWord: string = '#user_pass';
    xpathBtnLogin: string = '#wp-submit';

    constructor(page: Page) {
        this.page = page;
    }

    async loginAdmin(user: string, pass: string) {
        await this.page.goto(this.urlBase);
        await this.page.locator(this.xpathUserName).fill(user);
        await this.page.locator(this.xpathPassWord).fill(pass);
        await this.page.locator(this.xpathBtnLogin).click();
    }

}