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
