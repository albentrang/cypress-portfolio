Feature: Less or More
  Background: Load the Less or More page
    Given I visit the Less or More page

  Scenario: Check title
    When I load the Less or More page at the correct sub directory
    Then I should see the title of the web page as "Less or More"

  Scenario Outline: Check text
    When I see an element with the data-cy attribute "<dataCy>"
    Then I should see the expected text "<expText>" from that element
    Examples:
      | dataCy           | expText                                |
      | lm-nav-home-link | Home                                   |
      | lm-nav-calc-link | Calculator                             |
      | lm-nav-text-link | Text to File                           |
      | lm-nav-lm-link   | Less or More                           |
      | lm-header        | Less or More                           |
      | lm-tagline       | Test your luck and guess less or more! |

  Scenario: Check footer text
    When I see the footer element where the footer text has the data-cy attribute "lm-footer-text"
    Then I should see the expected text "© 2025 by Alben Trang" and the email address "albentrang@gmail.com"

  Scenario Outline: Check links
    When I see clickable text with the data-cy attribute "<dataCy>"
    Then I should expect the link to reference the correct URL "<url>" of the custom website or an external website
    Examples:
      | dataCy                  | url                                             |
      | lm-nav-home-link        | index.html                                      |
      | lm-nav-calc-link        | calculator.html                                 |
      | lm-nav-text-link        | text_to_file.html                               |
      | lm-nav-lm-link          | less_or_more.html                               |
      | lm-footer-linkedin-link | https://www.linkedin.com/in/albentrang/         |
      | lm-footer-github-link   | https://github.com/albentrang/cypress-portfolio |

  Scenario Outline: Check element hover effects
    When I hover over the element with the data-cy attribute "<dataCy>"
    And I see the element's background color change to these RGB values: <r>, <g>, <b>
    And I stop hovering over the element
    Then I should see the element's background color revert back to its original color
    Examples:
      | dataCy           | r   | g   | b   |
      | lm-nav-home-link | 233 | 150 | 122 |
      | lm-nav-calc-link | 233 | 150 | 122 |
      | lm-nav-text-link | 233 | 150 | 122 |
      | lm-nav-lm-link   | 233 | 150 | 122 |
      | less-button      | 0   | 250 | 154 |
      | more-button      | 0   | 250 | 154 |

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
