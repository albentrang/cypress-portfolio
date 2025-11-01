# Deck of Cards API Test Plan

## Test Objective

This document plans the positive and negative test cases when for my [custom website](https://albentrang.github.io/cypress-portfolio/). Each test case will go through the website's user interface to interact with elements and check their intended functionality such as a calculator correctly displaying a result after inputting numbers and operations.

### Test Approach

- Every test, both positive and negative, needs to pass.
- Tests are done using JavaScript, Cypress, and Cucumber.
- Deliverable will be a generated report using Mochawesome.
- All data-cy attributes in the HTML elements must be unique across all HTML files.
- Using the Cucumber framework, the feature files will store all the specific test cases. Thus, the test cases listed in this test plan will contain general features (web pages) to test.

## Test Cases

### All Website Pages

- [ ] The navigation bar at the top of the website is consistent across all web pages
- [ ] The navigation bar contains buttons for navigating the different pages of the website
- [ ] The footer of the web pages all have "© Alben Trang 2025"
- [ ] The footer contains icons that link to my LinkedIn profile and the GitHub repository used to make my custom website

### Homepage

- [x] All the elements contain their expected text when the homepage is loaded
- [x] The title element uses "Homepage"
- [x] The navigation bar's links lead to the correct pages of the custom website
- [x] The links under the "Test Pages" header lead to the correct pages of the custom website
- [x] The links under the "Cypress Test Results" header lead to the correct report pages

### Calculator

- [x] All the elements contain their expected text when the calculator page is loaded
- [x] The title element uses "Calculator"
- [ ] The correct numbers appear in the results bar when one number is entered
- [ ] The correct numbers appear in the results bar when two different whole or decimal numbers are added
- [ ] The correct numbers appear in the results bar when two different whole or decimal numbers are subtracted
- [ ] The correct numbers appear in the results bar when two different whole or decimal numbers are multiplied
- [ ] The correct numbers appear in the results bar when two different whole or decimal numbers are divided
- [ ] The correct numbers appear in the results bar when three different whole or decimal numbers are entered with two operations
- [ ] The results bar can display -999999999 and 9999999999 exactly
- [ ] The calculator handles the divide by 0 error gracefully
- [ ] The results bar will display -999999999 or 9999999999 if a number goes beyond one of them

## Notes

- The website will use TypeScript for its functionality, but the Cypress tests and supporting scripts will use JavaScript.
- The calculator application will display up to ten digits including the decimal point and negative sign if needed.
