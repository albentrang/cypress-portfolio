Feature: Less or More
  Background: Load the Less or More page
    Given I visit the Less or More page

  Scenario: Check title
    When I load the Less or More page at the correct sub directory
    Then I should see the title of the web page as "Less or More"

  Scenario: Check footer text
    When I see the footer element where the footer text has the data-cy attribute "lm-footer-text"
    Then I should see the expected text "© 2025 by Alben Trang" and the email address "albentrang@gmail.com"

  Scenario: Check links
    When I see clickable text based on the data from the "less_or_more.json" fixture file
    Then I should see the correct URL for each link based on the data from the given fixture file

  Scenario: Check initial page state
    When I load the initial state of the Less or More page
    Then I should see the left number, the question marks, the Less and More buttons, and the scores at 0

  Scenario Outline: Guess less a number of times
    When I play the Less or More game by making <guessNum> number of guesses with the Less button
    Then I should see the expected final score and high score are displayed
    Examples:
      | guessNum |
      | 1        |
      | 10       |
      | 100      |

  Scenario Outline: Guess more a number of times
    When I play the Less or More game by making <guessNum> number of guesses with the More button
    Then I should see the expected final score and high score are displayed
    Examples:
      | guessNum |
      | 1        |
      | 10       |
      | 100      |

  Scenario Outline: Alternate guesses a number of times
    When I play the Less or More game by making <guessNum> number of guesses by alternating between the Less and More buttons
    Then I should see the expected final score and high score are displayed
    Examples:
      | guessNum |
      | 1        |
      | 10       |
      | 100      |

  Scenario Outline: Guess optimally a number of times
    When I play the Less or More game by making <guessNum> number of guesses by clicking the Less button if the left number is 5 or more or clicking the More button if the left number is 4 or less
    Then I should see the expected final score and high score are displayed
    Examples:
      | guessNum |
      | 1        |
      | 10       |
      | 100      |

  Scenario Outline: Guess randomly a number of times
    When I play the Less or More game by making <guessNum> number of guesses randomly
    Then I should see the expected final score and high score are displayed
    Examples:
      | guessNum |
      | 1        |
      | 10       |
      | 100      |
