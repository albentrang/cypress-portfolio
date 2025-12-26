Feature: Text to File Downloader

	Background: Load the text to file page
		Given I visit the text to file page

	Scenario: Check title
		When I load the text to file page at the correct the sub directory
		Then I should see the title of the web page as "Text to File Downloader"

	Scenario Outline: Check text
		When I see an element with the data-cy attribute "<dataCy>"
		Then I should see the expected text "<expText>" from that element
		Examples:
			| dataCy             | expText                                     |
			| text-nav-home-link | Home                                        |
			| text-nav-calc-link | Calculator                                  |
			| text-nav-text-link | Text to File                                |
			| text-header        | Text to File Downloader                     |
			| text-tagline       | Turn text into different files to download! |
			| text-input-label   | Enter your text (0/300):                    |
			| file-name-label    | Enter file name (0/30):                     |
			| file-type-label    | Choose file type:                           |
			| download-btn       | Download                                    |


	Scenario: Check footer text
		When I see the footer element where the footer text has the data-cy attribute "text-footer-text"
		Then I should see the expected text "© 2025 by Alben Trang" and the email address "albentrang@gmail.com"

	Scenario Outline: Check links
		When I see clickable text with the data-cy attribute "<dataCy>"
		Then I should expect the link to reference the correct URL "<url>" of the custom website or an external website
		Examples:
			| dataCy                    | url                                             |
			| text-nav-home-link        | index.html                                      |
			| text-nav-calc-link        | calculator.html                                 |
			| text-nav-text-link        | text_to_file.html                               |
			| text-footer-linkedin-link | https://www.linkedin.com/in/albentrang/         |
			| text-footer-github-link   | https://github.com/albentrang/cypress-portfolio |

	Scenario Outline: Check element hover effects
		When I hover over the element with the data-cy attribute "<dataCy>"
		Then I should see the element's background color change to these RGB values: <r>, <g>, <b>
		Examples:
			| dataCy             | r   | g   | b   |
			| text-nav-home-link | 233 | 150 | 122 |
			| text-nav-calc-link | 233 | 150 | 122 |
			| text-nav-text-link | 233 | 150 | 122 |
			| download-btn       | 0   | 100 | 0   |

	@skip
	Scenario Outline: Check character count going up and down
		When I type <charsToType> characters into the text input field
		And I delete <charsToDelete> characters
		Then I should see the character count update to "<count>"
		Examples:
			| charsToType | charsToDelete | count |
			| 18          | 5             | 13    |

	@skip
	Scenario Outline: Create and download text file
		When I type "<text>" into the text input field
		And I delete <charsToDelete> characters
		And I select the text file type from the dropdown menu
		And I click the download button
		Then I should see a file download dialog box with the file name "text.txt"

	@skip
	Scenario: Check file type selection
		When I select a file type from the dropdown menu
		Then I should see the selected file type displayed in the dropdown menu

	@skip
	Scenario: Error message for invalid input and removing it
		When I try to download a file with no characters in the text area
		And I should see an error message "Please enter some text to convert to a file."
		Then I should see the error message disappear when I type in the text area
