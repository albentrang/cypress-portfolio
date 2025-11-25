Feature: Calculator
	Background: Load the calculator page
		Given I visit the calculator page

	Scenario: Check title
		When I load the calculator page at the correct the sub directory
		Then I should see the title of the web page as "Calculator"

	Scenario Outline: Check text
		When I see an element with the data-cy attribute "<dataCy>"
		Then I should see the expected text "<expText>" from that element
		Examples:
			| dataCy             | expText                                                 |
			| calc-nav-home-link | Home                                                    |
			| calc-nav-calc-link | Calculator                                              |
			| calc-header        | Calculator                                              |
			| calc-tagline       | A simple calculator app to test simple math operations! |

	Scenario: Check footer text
		When I see the footer element where the footer text has the data-cy attribute "calc-footer-text"
		Then I should see the expected text "© 2025 by Alben Trang" and the email address "albentrang@gmail.com"

	Scenario Outline: Check links
		When I see clickable text with the data-cy attribute "<dataCy>"
		Then I should expect the link to reference the correct URL "<url>" of the custom website or an external website
		Examples:
			| dataCy                    | url                                             |
			| calc-nav-home-link        | index.html                                      |
			| calc-nav-calc-link        | calculator.html                                 |
			| calc-footer-linkedin-link | https://www.linkedin.com/in/albentrang/         |
			| calc-footer-github-link   | https://github.com/albentrang/cypress-portfolio |

	Scenario Outline: Check element hover effects
		When I hover over the element with the data-cy attribute "<dataCy>"
		Then I should see the element's background color change to these RGB values: <r>, <g>, <b>
		Examples:
			| dataCy             | r   | g   | b   |
			| calc-nav-home-link | 233 | 150 | 122 |
			| calc-nav-calc-link | 233 | 150 | 122 |
			| btn-clear          | 0   | 0   | 0   |
			| btn-clear-entry    | 0   | 0   | 0   |
			| btn-modulo         | 0   | 0   | 0   |
			| btn-divide         | 0   | 0   | 0   |
			| btn-7              | 0   | 0   | 0   |
			| btn-8              | 0   | 0   | 0   |
			| btn-9              | 0   | 0   | 0   |
			| btn-multiply       | 0   | 0   | 0   |
			| btn-4              | 0   | 0   | 0   |
			| btn-5              | 0   | 0   | 0   |
			| btn-6              | 0   | 0   | 0   |
			| btn-subtract       | 0   | 0   | 0   |
			| btn-1              | 0   | 0   | 0   |
			| btn-2              | 0   | 0   | 0   |
			| btn-3              | 0   | 0   | 0   |
			| btn-add            | 0   | 0   | 0   |
			| btn-sign-change    | 0   | 0   | 0   |
			| btn-0              | 0   | 0   | 0   |
			| btn-decimal        | 0   | 0   | 0   |
			| btn-equals         | 0   | 0   | 0   |

	Scenario: Cannot modify calculator display directly
		When I try to type directly into the calculator display with the data-cy attribute "calc-display"
		Then I should see that the value of the calculator display remains unchanged at "0"

	Scenario Outline: Add two numbers using the calculator
		When I enter "<num1>" and "<num2>" and press +
		And I press =
		Then I should see the calculator display show "<result>"
		Examples:
			| num1       | num2       | result     |
			| 1          | 2          | 3          |
			| 0          | 0          | 0          |
			| -1         | 1          | 0          |
			| 9999999999 | 1          | 9999999999 |
			| 1234567890 | 987654321  | 2222222211 |
			| -999999999 | 1          | -999999998 |
			| 0.1        | 0.2        | 0.3        |
			| 99999999.9 | 0.1        | 100000000  |
			| -0.1       | -0.2       | -0.3       |
			| 123456789  | 876543211  | 1000000000 |
			| 0          | 9999999999 | 9999999999 |
			| -999999999 | 999999999  | 0          |
			| 5          | -5         | 0          |
			| 0.00000001 | 0.00000009 | 0.0000001  |
			| -0.0000001 | -0.0000009 | -0.000001  |
			| 9999999999 | 9999999999 | 9999999999 |

	Scenario Outline: Subtract two numbers using the calculator
		When I enter "<num1>" and "<num2>" and press -
		And I press =
		Then I should see the calculator display show "<result>"
		Examples:
			| num1       | num2       | result     |
			| 5          | 2          | 3          |
			| 0          | 0          | 0          |
			| -1         | 1          | -2         |
			| 9999999999 | 1          | 9999999998 |
			| 1234567890 | 987654321  | 246913569  |
			| -999999999 | 1          | -999999999 |
			| 0.3        | 0.2        | 0.1        |
			| 100000000  | 0.1        | 99999999.9 |
			| -0.3       | -0.2       | -0.1       |
			| 123456789  | 87654321   | 35802468   |
			| 0          | 9999999999 | -999999999 |
			| -999999999 | 999999999  | -999999999 |
			| 5          | -5         | 10         |
			| 0.0000001  | 0.00000009 | 0.00000001 |
			| -0.000001  | -0.0000009 | -0.0000001 |
			| 9999999999 | 9999999999 | 0          |

	Scenario Outline: Multiply two numbers using the calculator
		When I enter "<num1>" and "<num2>" and press x
		And I press =
		Then I should see the calculator display show "<result>"
		Examples:
			| num1       | num2       | result     |
			| 2          | 3          | 6          |
			| -2         | 3          | -6         |
			| 0          | 1234567890 | 0          |
			| 1          | 9999999999 | 9999999999 |
			| 9999999999 | 1          | 9999999999 |
			| -999999999 | 1          | -999999999 |
			| 0.1        | 0.2        | 0.02       |
			| 0.00000001 | 100000000  | 1          |
			| 9999999999 | 2          | 9999999999 |
			| -999999999 | -2         | 1999999998 |
			| 123456789  | 87654321   | 9999999999 |
			| 0.0000001  | 0.0000001  | 0          |
			| -0.0000001 | 0.0000001  | 0          |
			| 9999999999 | 9999999999 | 9999999999 |
			| 1000000000 | 10         | 9999999999 |
			| 999999999  | 10         | 9999999990 |
			| 1.23456789 | 9.87654321 | 12.1932631 |

	Scenario Outline: Divide two numbers using the calculator
		When I enter "<num1>" and "<num2>" and press ÷
		And I press =
		Then I should see the calculator display show "<result>"
		Examples:
			| num1        | num2       | result     |
			| 10          | 2          | 5          |
			| 1           | 3          | 0.33333333 |
			| 1           | 6          | 0.16666666 |
			| 1000000000  | 1          | 1000000000 |
			| 9999999999  | 1          | 9999999999 |
			| 9999999999  | 9          | 1111111111 |
			| 9999999999  | 9999999999 | 1          |
			| -999999999  | 1          | -999999999 |
			| 1           | -2         | -0.5       |
			| -1          | -2         | 0.5        |
			| 0           | 1          | 0          |
			| 1           | 0          | NaN        |
			| 0.00000001  | 1          | 0.00000001 |
			| 1           | 0.00000001 | 100000000  |
			| 1234567890  | 2          | 617283945  |
			| 1.23456789  | 3          | 0.41152263 |
			| 9999999999  | 3          | 3333333333 |
			| 9999999999  | 9999999998 | 1          |
			| 0.00000001  | 10         | 0          |
			| -0.00000001 | 10         | 0          |

	Scenario Outline: Get the remainder of two numbers using the calculator
		When I enter "<num1>" and "<num2>" and press %
		And I press =
		Then I should see the calculator display show "<result>"
		Examples:
			| num1        | num2        | result     |
			| 10          | 3           | 1          |
			| 1000000000  | 3           | 1          |
			| 9999999999  | 2           | 1          |
			| 9999999999  | 9999999998  | 1          |
			| 9999999999  | 9999999999  | 0          |
			| 1234567890  | 1000000000  | 234567890  |
			| 1           | 0.3         | 0.1        |
			| 0.12345678  | 0.1         | 0.02345678 |
			| 0.00000001  | 0.00000009  | 0.00000001 |
			| -10         | 3           | -1         |
			| 10          | -3          | 1          |
			| -10         | -3          | -1         |
			| 0           | 3           | 0          |
			| 3           | 0           | NaN        |
			| 9999999999  | 1           | 0          |
			| 1           | 9999999999  | 1          |
			| 0.00000001  | 1           | 0.00000001 |
			| 1           | 0.00000001  | 0.00000001 |
			| -0.00000001 | 0.00000001  | 0          |
			| 0.00000001  | -0.00000001 | 0          |
