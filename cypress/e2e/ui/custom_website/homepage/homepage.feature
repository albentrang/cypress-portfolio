Feature: Homepage
  Background: Load the homepage
    Given I visit the homepage

  Scenario: Check title
    When I load the homepage at the correct the sub directory
    Then I should see the title of the web page as "Homepage"

  Scenario: Check footer text
    When I see the footer element where the footer text has the data-cy attribute "home-footer-text"
    Then I should see the expected text "© 2025 by Alben Trang" and the email address "albentrang@gmail.com"

  Scenario: Check links
    When I see clickable text based on the data from the "homepage.json" fixture file
    Then I should see the correct URL for each link based on the data from the given fixture file
