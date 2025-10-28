Feature: Homepage
  Background: Load the homepage
    Given I visit the homepage

  Scenario: Check title
    When I load the homepage at the correct the sub directory
    Then I should see the title of the web page as "Homepage"

  Scenario Outline: Check text
    When I see an element with the data-cy attribute "<dataCy>"
    Then I should see the expected text "<expText>" from that element
    Examples:
      | dataCy                  | expText                                                                              |
      | home-nav-home-link      | Home                                                                                 |
      | home-nav-calc-link      | Calculator                                                                           |
      | home-header             | Homepage                                                                             |
      | home-tagline            | My custom website to test various elements and interactions!                         |
      | test-pages-header       | Test Pages                                                                           |
      | test-pages-desc         | Explore different test pages to validate various features.                           |
      | test-pages-calc-link    | Calculator                                                                           |
      | cy-test-results-header  | Cypress Test Results                                                                 |
      | cy-test-results-desc    | These Mochawesome test results are generated right before this website's deployment. |
      | custom-web-results-link | Custom Website Test Results                                                          |
      | deck-api-results-link   | Deck of Cards API Test Results                                                       |
      | home-footer-text        | © Alben Trang 2025                                                                   |

  Scenario Outline: Check links
    When I see clickable text with the data-cy attribute "<dataCy>"
    Then I should expect the link to reference the correct URL "<url>" of the custom website or an external website
    Examples:
      | dataCy                    | url                                             |
      | home-nav-home-link        | /                                               |
      | home-nav-calc-link        | calculator.html                                 |
      | test-pages-calc-link      | calculator.html                                 |
      | custom-web-results-link   | custom-report.html                              |
      | deck-api-results-link     | deck-report.html                                |
      | home-footer-linkedin-link | https://www.linkedin.com/in/albentrang/         |
      | home-footer-github-link   | https://github.com/albentrang/cypress-portfolio |
