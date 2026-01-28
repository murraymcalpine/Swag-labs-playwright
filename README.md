# Swag-labs-playwright
Exploring Playwright testing using the dummy website https://www.saucedemo.com/

## How to run the all the tests
1: Clone the repo
```bash
git clone git@github.com:murraymcalpine/Swag-labs-playwright.git
```
2: Change directory to the repro
```bash
cd Swag-labs-playwright
```
3: Run the tests
```bash
npm playwright tests
```

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
