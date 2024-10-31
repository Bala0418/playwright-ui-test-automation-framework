import { chromium } from "@playwright/test";

async function globalSetup( config: { projects: { use: { baseURL: string; headless: boolean } }[] }) {
    const authFile = 'playwright/.auth/user.json';
    const { baseURL, headless } = config.projects[0].use;
    const browser = await chromium.launch({ args: ['--auth-server-allowlist="*"'], headless: true });
    const page = await browser.newPage();
    await page.goto(baseURL);

    /* 
    Below this, the basic login will be done by the automation, preserving the auth token for the user for the rest of the session
    It uses the variables located in the .env file, like the username and the password
    Please consider that it will be only a viable solution for the AzureAD login
    */
    await page.getByPlaceholder('Email, phone, or Skype').fill(process.env.USER as string);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByPlaceholder('Password').fill(process.env.PASSWORD as string);
    await page.getByRole('button', { name: 'Sign in' }).click();

    await page.context().storageState({ path: authFile });
    await browser.close();
}

export default globalSetup;