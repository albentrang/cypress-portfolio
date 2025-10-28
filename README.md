# Cypress Portfolio

Welcome to my portfolio that showcases personal Cypress projects. Please feel free to look through any files to see my work that uses JavaScript and Cypress automated testing.

## Current Project

Custom website by me showcasing various elements and interactions that will be tested. The work will be done in the custom_website branch of this repository.

- The custom website will be hosted on [GitHub Pages](https://albentrang.github.io/cypress-portfolio/), and it will contain the test results for the finished projects, including the [test results for that website](https://albentrang.github.io/cypress-portfolio/custom-report.html).

## Finished Projects

Automated REST API tests on the [Deck of Cards API](https://www.deckofcardsapi.com/) by Chase Roberts.

- View the Mochawesome report that shows the list of passing test cases by clicking this [GitHub Pages link](https://albentrang.github.io/cypress-portfolio/deck-report.html).

## Test Plans

The test plans for each project are stored in the test_specs folder from this repository.

## Website Test Automation Project Workflow

![My workflow for analyzing the website under test and creating the automated tests](test_specs/software_qa_workflow.jpg 'Website Test Automation Project Workflow')

Here is my workflow for analyzing the website under test and creating the automated tests.

- First, I review the website's specifications to understand the purpose and functions of the website.
- Next, I manually test the website myself using techniques, like exploratory testing and boundary value analysis, to check if it functions as expected based on the specifications.
- At this point, I develop the test plan that includes information like the test objective, test approach, positive tests, and negative tests. It also includes notes for information like the limitations for testing some features.
- Then, the project environment and test automation framework, like Cypress, are initialized.
- The tests are created based on the test cases in the test plan.
- Tests are then executed using the test automation framework to automatically check the website's functionality.
- If all tests pass, then the project gets published to GitHub.
  - The updated project will go through a GitHub Actions CI/CD workflow where it tests the website using the test automation scripts and create results using a tool like Mochawesome.
  - Finally, the results are automatically published to GitHub Pages.
- If at least one test fails, I check if it's newly created because this testing project started or the test is verifying a new update.
  - If the failing test(s) are new, then I debug and fix them until they pass.
  - If the failing test(s) are old, then it shows a regression defect that will be filed as a bug ticket.
    - After that, I will need to wait for the bug to be fixed before I can run the failed tests again.
