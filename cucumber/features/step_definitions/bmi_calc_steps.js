const assert = require("assert");
const { Before, Given, When, Then } = require("cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");

let driver = new Builder().forBrowser("chrome").build();
//driver.setTimeout({ pageLoad: 10000 });

When("{string} and {string} are entered into the calculator", async function(
  height,
  weight
) {
  baseUrl = "http://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmi-m.htm";
  await driver.get(baseUrl, 10000); // increase the timeout

  let heightBox = await driver.findElement(By.name("htc"));
  heightBox.sendKeys(height);
  let weightBox = await driver.findElement(By.name("kg"));
  weightBox.sendKeys(weight);
  let computeBMI = await driver.findElement(
    By.css("input[type='button'][value='Compute BMI']")
  );
  await computeBMI.click();
});

Then("the BMI should be {string}", async function(expectedBMI) {
  actualBMI = await driver.findElement(By.id("yourbmi")).getAttribute("value");
  console.log(actualBMI);
  assert(actualBMI == expectedBMI);
});
