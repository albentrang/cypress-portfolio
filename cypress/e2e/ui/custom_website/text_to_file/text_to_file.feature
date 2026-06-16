Feature: Text to File Downloader
	Background: Load the text to file page
		Given I visit the text to file page

	Scenario: Check title
		When I load the text to file page at the correct the sub directory
		Then I should see the title of the web page as "Text to File Downloader"

	Scenario: Check footer text
		When I see the footer element where the footer text has the data-cy attribute "text-footer-text"
		Then I should see the expected text "© 2025 by Alben Trang" and the email address "albentrang@gmail.com"

	Scenario: Check links
		When I see clickable text based on the data from the "text_to_file.json" fixture file
		Then I should see the correct URL for each link based on the data from the given fixture file

	Scenario Outline: Check text area character count going up and down
		When I type <charsToType> characters into the text area
		And I delete <charsToDelete> characters in the text area
		Then I should see the character count in the text area update to "<count>"
		Examples:
			| charsToType | charsToDelete | count |
			| 1           | 0             | 1     |
			| 1           | 1             | 0     |
			| 1           | 2             | 0     |
			| 10          | 0             | 10    |
			| 18          | 5             | 13    |
			| 50          | 25            | 25    |
			| 100         | 0             | 100   |
			| 150         | 75            | 75    |
			| 200         | 100           | 100   |
			| 300         | 0             | 300   |
			| 301         | 0             | 300   |
			| 300         | 50            | 250   |

	Scenario Outline: Check file name input character count going up and down
		When I type <charsToType> characters into the file name input
		And I delete <charsToDelete> characters in the file name input
		Then I should see the character count in the file name input update to "<count>"
		Examples:
			| charsToType | charsToDelete | count |
			| 1           | 0             | 1     |
			| 1           | 1             | 0     |
			| 1           | 2             | 0     |
			| 5           | 0             | 5     |
			| 10          | 3             | 7     |
			| 15          | 7             | 8     |
			| 20          | 0             | 20    |
			| 25          | 10            | 15    |
			| 30          | 0             | 30    |
			| 31          | 0             | 30    |
			| 30          | 5             | 25    |

	Scenario: Go through all the file type selections
		When I see the file type dropdown menu
		Then I should all the file type options available

	Scenario Outline: Create and download text file
		When I type "<text>" into the text input field
		And I type the file name "<fileName>" into the file name input field
		And I select the text file type from the dropdown menu
		And I click the download button
		Then I should see a file with the full file name "<fileName>".txt and the file should contain the text "<text>"
		Examples:
			| text                      | fileName    |
			| Hello, World!             | textTest    |
			| This is{enter}a test.     | textEnter   |
			| Test	tabs	here.           | textTabs    |
			| Special chars: !@#$%^&*() | textSpecial |
			| Emojis: 😊🎉              | textEmoji   |

	Scenario Outline: Create and download Markdown file
		When I type "<text>" into the text input field
		And I type the file name "<fileName>" into the file name input field
		And I select the markdown file type from the dropdown menu
		And I click the download button
		Then I should see a file with the full file name "<fileName>".md and the file should contain the text "<text>"
		Examples:
			| text                      | fileName  |
			| # Hello                   | mdtest    |
			| # Title{enter}## Subtitle | mdEnter   |
			| Test	tabs	here.           | mdTabs    |
			| Special chars: !@#$%^&*() | mdSpecial |
			| Emojis: 😊🎉              | mdEmoji   |

	Scenario Outline: Create and download CSV file
		When I type "<text>" into the text input field
		And I type the file name "<fileName>" into the file name input field
		And I select the CSV file type from the dropdown menu
		And I click the download button
		Then I should see a file with the full file name "<fileName>".csv and the file should contain the text "<text>"
		Examples:
			| text                                          | fileName   |
			| name,age,city{enter}Alben,30,NYC              | csvtest    |
			| product,price,quantity{enter}Pen,,10          | csvEmpty   |
			| item,amount{enter}Book,15.99{enter}Notebook,5 | csvMulti   |
			| Test	{enter}tabs                              | csvTabs    |
			| Special chars{enter}!@#$%^&*()                | csvSpecial |
			| Emojis{enter}😊🎉{enter}🚀⭐                   | csvEmoji   |

	Scenario Outline: Create and download JSON file
		When I type JSON "<text>" into the text input field
		And I type the file name "<fileName>" into the file name input field
		And I select the JSON file type from the dropdown menu
		And I click the download button
		Then I should see a file with the full file name "<fileName>".json and the file should contain the text "<text>"
		Examples:
			| text                                                                                                           | fileName    |
			| {"name": "Alben"}                                                                                              | jsontest    |
			| ["red", "blue", "green"]                                                                                       | jsonList    |
			| {"name": "Alben", "age": 30, "place": {"state": "NY", "city": "New York"}, "colors": ["red", "blue", "green"]} | jsonComplex |
			| {"specialChars": "!@#$%^&*()"}                                                                                 | jsonSpecial |
			| {"emojis": ["😊", "🎉", "🚀", "⭐"]}                                                                            | jsonEmoji   |

	Scenario: Error message for invalid text area input, removing it, and successful download afterward
		When I click the download button
		* I see this error message "Please enter some text to convert to a file."
		* I see the error message disappear when I type in the text area
		* I clear the text area and file name input field
		* I type "Testing after error..." into the text input field
		* I type the file name "textAfterError" into the file name input field
		* I click the download button
		Then I should see a file with the full file name "textAfterError".txt and the file should contain the text "Testing after error..."

	Scenario: Error message for invalid file name input, removing it, and successful download afterward
		When I type "Sample text" into the text input field
		* I click the download button
		* I see this error message "Please enter the name for the file."
		* I see the error message disappear when I type in the file name input field
		* I clear the text area and file name input field
		* I type "Testing after error..." into the text input field
		* I type the file name "textAfterError" into the file name input field
		* I click the download button
		Then I should see a file with the full file name "textAfterError".txt and the file should contain the text "Testing after error..."

	Scenario: Error message for invalid file name characters, removing it, and successful download afterward
		When I type "Sample text" into the text input field
		* I type the file name "invalid/file*name?" into the file name input field
		* I click the download button
		* I see this error message "Please enter a valid file name (alphanumeric, hyphens, underscores)."
		* I see the error message disappear when I type in the file name input field
		* I clear the text area and file name input field
		* I type "Testing after error..." into the text input field
		* I type the file name "textAfterError" into the file name input field
		* I click the download button
		Then I should see a file with the full file name "textAfterError".txt and the file should contain the text "Testing after error..."

	Scenario: Error message for invalid CSV text area input, removing it, and successful download afterward
		When I type "name,age,city{enter}Alben,30" into the text input field
		* I type the file name "csvErrorFile" into the file name input field
		* I select the CSV file type from the dropdown menu
		* I click the download button
		* I see this error message "Please enter valid CSV. Ensure each column has the same number of values separated by commas."
		* I see the error message disappear when I type in the text area
		* I clear the text area and file name input field
		* I type "name,age,city{enter}Alben,30,New York" into the text input field
		* I type the file name "csvAfterError" into the file name input field
		* I click the download button
		Then I should see a file with the full file name "csvAfterError".csv and the file should contain the text "name,age,city{enter}Alben,30,New York"

	Scenario: Error message for invalid JSON text area input, removing it, and successful download afterward
		When I type JSON "asdf" into the text input field
		* I type the file name "jsonErrorFile" into the file name input field
		* I select the JSON file type from the dropdown menu
		* I click the download button
		* I see this error message "Please enter valid JSON. Ensure proper JSON syntax."
		* I see the error message disappear when I type in the text area
		* I clear the text area and file name input field
		* I type JSON "{\"name\": \"Alben\"}" into the text input field
		* I type the file name "jsonAfterError" into the file name input field
		* I click the download button
		Then I should see a file with the full file name "jsonAfterError".json and the file should contain the text "{\"name\": \"Alben\"}"
