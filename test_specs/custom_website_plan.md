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

- [x] The navigation bar at the top of the website is consistent across all web pages.
- [x] The navigation bar contains buttons for navigating the different pages of the website.
- [x] The navigation bar will only show the Home button and the Menu button when the screen size is small, and the Menu button will show a dropdown with the buttons for navigating the different pages of the website.
- [x] Hovering over an element with a function or link using the mouse will cause the element to change its background co.lor
- [x] The footer of the web pages all have "© 2025 by Alben Trang".
- [x] The footer contains icons that link to my LinkedIn profile and the GitHub repository used to make my custom website.
- [x] The website is responsive and displays correctly on different screen sizes.

### Homepage

- [x] All the elements contain their expected text when the homepage is loaded.
- [x] The title element uses "Homepage".
- [x] The navigation bar's links lead to the correct pages of the custom website.
- [x] The links under the "Test Pages" header lead to the correct pages of the custom we.bsite
- [x] The links under the "Cypress Test Results" header lead to the correct report pages.

### Calculator

- [x] All the elements contain their expected text when the calculator page is loaded.
- [x] The title element uses "Calculator".
- [x] The calculator application will display up to ten digits including the decimal point and negative sign if needed.
- [x] The correct numbers appear in the results bar when one number is entered.
- [x] The correct numbers appear in the results bar when two different whole or decimal numbers are added.
- [x] The correct numbers appear in the results bar when two different whole or decimal numbers are subtracted.
- [x] The correct numbers appear in the results bar when two different whole or decimal numbers are multiplied.
- [x] The correct numbers appear in the results bar when two different whole or decimal numbers are divided.
- [x] The correct numbers appear in the results bar when two different whole or decimal numbers are used to get the remainder.
- [x] The correct numbers appear in the results bar when one number and one operation are entered.
- [x] The correct numbers appear in the results bar when three different whole or decimal numbers are entered with two operations.
- [x] The results bar can display -999999999 and 9999999999 exactly.
- [x] The calculator handles the divide by 0 error gracefully.
- [x] The results bar will display -999999999 or 9999999999 if a number goes beyond one of them.
- [x] Enter one number, clear entry, and then enter a new number. The results bar should only show the new number.
- [x] Enter one number, then the operation, then the next number, then clear entry, and then enter a new number. The results bar should show the result of the first number and operation with the new number.
- [x] Enter two numbers, press the clear button, and then do two new numbers. The results bar should only show the result of the second calculation.
- [x] Clicking the sign change button twice should return the number to its original value.
- [x] Clicking the decimal button twice should not add a second decimal point to the number.

### Text to File Downloader

- [x] All the elements contain their expected text when the text to file downloader page is loaded.
- [x] The title element uses "Text to File Downloader".
- [x] The char count dynamically counts up and down when the user types in the text area.
- [x] The char count dynamically counts up and down when the user types in the file name input.
- [x] The text to file downloader's text area has a character limit of 300 characters.
- [x] The text to file downloader's file name field has a character limit of 30 characters.
- [x] Enter text to download a text file.
- [x] Enter text to download a markdown file.
- [x] Enter text to download a CSV file.
- [x] Enter text to download a JSON file.
- [x] Error message appears when the text area is empty and the user tries to download a file.
- [x] Error message appears when the file name field is empty and the user tries to download a file.
- [x] Error message appears when the file name field contains invalid characters and the user tries to download a file.
- [x] Error message appears when the text area contains invalid CSV content and the user tries to download a CSV file.
- [x] Error message appears when the text area contains invalid JSON content and the user tries to download a JSON file.

### Less or More Game

- [x] All the elements contain their expected text when the less or more game page is loaded.
- [x] The title element uses "Less or More Game".
- [x] A random number between 0 and 9 is generated to the left of the screen when the game page is loaded.
- [x] The right part of the screen shows a question mark before the user makes a guess.
- [x] The user can guess if the next number will be less than or more than the current number using the Less or More buttons.
- [x] After the user makes a guess, a new random number between 0 and 9 is generated on the right side of the screen.
- [x] The game indicates to the user if their guess was correct or incorrect using text and the less than and greater than symbols.
- [x] The Next button appears while the Less and More buttons are hidden after the user makes a guess.
- [x] Clicking the Next button takes the right number as the current number on the left side, the right side shows a question mark again, the Next button is hidden, and the Less and More buttons reappear.
- [x] The score and high score update correctly when the user makes a correct guess.
- [x] The score resets to 0 when the user makes an incorrect guess.

## Notes and Ideas

### Frontend

- The website will use TypeScript for its functionality, but the Cypress tests and supporting scripts will use JavaScript.
- The website will use responsive web design principles to ensure it looks good on all devices.

### Backend

- After the static version of this custom website is complete in the cypress-portfolio repository, there can be another version of this website in another repository that uses backend technologies, containerization, and Playwright testing.
- The backend technologies can include Python and/or SQL if possible.
