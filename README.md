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
npm run test
```
Note: The tests will run against Chrome, Firefox and Safari at this time. 
## To run the all the tests against a speific browser
Chrome
```bash
npm run test:chrome
```
Firefox
```bash
npm run test:firefox
```
Safari
```bash
npm run test:safari
```
## How to run individual tests files
Login Screen tests
```bash
npm run test:login
```
Testing the Ordering Process
```bash
npm run test:ordering
```
Checking the Inventory page
```bash
npm run test:inventory
```
Note: The tests will run against Chrome, Firefox and Safari at this time. 
## How to run open the test report after a scuessful run
```bash
npx playwright show-report
```
Note: If the test fails the report will open in the browser with Screenshots and Screen recording of the point of failure
