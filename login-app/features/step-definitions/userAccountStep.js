// userAccountStep.js

const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');

let driver;

Given('that I’m on the website', async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:3000');
});

Given('I see the “sign up” button', async function () {
    const signUpButtonXPath = '//*[@id="root"]/div/nav/div/a[2]';
    const signUpButton = await driver.findElement(By.xpath(signUpButtonXPath));
    await driver.wait(until.elementIsVisible(signUpButton), 5000);
});

When('I press “sign up”', async function () {
    const signUpButtonXPath = '//*[@id="root"]/div/nav/div/a[2]';
    const signUpButton = await driver.findElement(By.xpath(signUpButtonXPath));
    await driver.wait(until.elementIsVisible(signUpButton), 5000);
    await driver.wait(until.elementIsEnabled(signUpButton), 5000);
    await signUpButton.click();
});

When('I enter a username, email address, and a password', async function () {
    const usernameInput = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/form/label[1]/input'));
    const passwordInput = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/form/label[2]/input'));

    await usernameInput.sendKeys('testuser');
    await passwordInput.sendKeys('testpassword');
});

Then('the user enters those details and can press the “create account” button', async function () {
    const createAccountButtonXPath = '//*[@id="root"]/div/div[2]/div/form/button';
    const createAccountButton = await driver.findElement(By.xpath(createAccountButtonXPath));

    // Wait for the button to be clickable (visible and enabled) before clicking
    await driver.wait(until.elementIsVisible(createAccountButton), 5000);
    await driver.wait(until.elementIsEnabled(createAccountButton), 5000);

    // Click the "Create Account" button
    await createAccountButton.click();
});

Then('they are returned to the log in page to log in to their new account', async function () {
    // Assuming you navigate to the login page after account creation, adjust as needed
    const loginPageSpan = await driver.findElement(By.xpath('//form'));
    await driver.wait(until.elementIsVisible(loginPageSpan), 5000);
    console.log('Successfully created an account and returned to the login page');
});
