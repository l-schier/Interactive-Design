const { Given, When, Then } = require('cucumber');
const { Builder, By, until } = require('selenium-webdriver');

let driver;

Given("I'm on the website and see the login button", async function () {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.get('http://localhost:3000');
});

When('I press the {string} button', async function (buttonText) {
  const loginButtonXPath = '//*[@id="root"]/div/nav/div/a[1]';
  const loginButton = await driver.findElement(By.xpath(loginButtonXPath));

  await driver.wait(until.elementIsVisible(loginButton), 5000);
  await driver.wait(until.elementIsEnabled(loginButton), 5000);

  await loginButton.click();
});

Then('I see the "Login" page', async function () {
  const loginForm = await driver.findElement(By.xpath('//form'));

  if (loginForm) {
    console.log('Successfully navigated to the "Login" page');
  } else {
    throw new Error('Failed to navigate to the "Login" page');
  }
});

When('I enter a valid Username', async function () {
  const usernameField = await driver.findElement(By.xpath('/html/body/div/div/div/form/div[1]/input'));
  await usernameField.sendKeys('test');
});

When('I enter a valid Password', async function () {
  const passwordField = await driver.findElement(By.xpath('/html/body/div/div/div/form/div[2]/input'));
  await passwordField.sendKeys('test');
});

When('I press the "Login" button on the form', async function () {
  const loginButtonXPath = '//*[@id="root"]/div/div/form/button';
  const loginButton = await driver.findElement(By.xpath(loginButtonXPath));

  await driver.wait(until.elementIsVisible(loginButton), 5000);
  await driver.wait(until.elementIsEnabled(loginButton), 5000);

  await loginButton.click();
});

Then("I should be returned to the website's home page", async function () {
  const homePageElementXPath = '//*[@id="root"]/div/nav/span';
  
  // Add an explicit wait for the home page element
  const homePageElement = await driver.wait(until.elementLocated(By.xpath(homePageElementXPath)), 5000);

  if (homePageElement) {
    console.log('Successfully returned to the home page');
  } else {
    throw new Error('Failed to return to the home page');
  }

  await driver.quit();
});
