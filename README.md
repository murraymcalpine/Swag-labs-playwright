# Swag-labs-playwright
This was to explore creating a testing suite using Playwright and Copilot.  
Using the dummy website https://www.saucedemo.com/ Test cases were created and scripted in Playwright. 

## How to run the tests
1: Clone the repo
```bash
git clone git@github.com:murraymcalpine/Swag-labs-playwright.git
```
2: Change directory to the repro
```bash
cd Swag-labs-playwright
```
3: Install dependances
```bash
npm install
```
4: Install Playwright Browsers
```bash
npx playwright install
```
5: Run the tests
```bash
npm playwright tests
```
Note: The tests will run against Chrome, Firefox and Safari at this time. 

## How to run individual tests files
Login Screen tests
```bash
npx playwright test login-tests.spec.js
```
Testing the Ordering Process
```bash
npx playwright test ordering-tests.spec.js
```
Checking the Inventory page
```bash
npx playwright test inventory-tests.spec.js
```
## How to run open the test report after a scuessful run
```bash
npx playwright show-report
```
Note: If the test fails the report will open in the browser with Screenshots and Screen recording of the point of failure
