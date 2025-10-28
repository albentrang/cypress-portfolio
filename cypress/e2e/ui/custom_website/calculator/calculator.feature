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
			| calc-footer-text   | © Alben Trang 2025                                      |

	Scenario Outline: Check links
		When I see clickable text with the data-cy attribute "<dataCy>"
		Then I should expect the link to reference the correct URL "<url>" of the custom website or an external website
		Examples:
			| dataCy                    | url                                             |
			| calc-nav-home-link        | /                                               |
			| calc-nav-calc-link        | calculator.html                                 |
			| calc-footer-linkedin-link | https://www.linkedin.com/in/albentrang/         |
			| calc-footer-github-link   | https://github.com/albentrang/cypress-portfolio |
