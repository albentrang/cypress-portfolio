import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Background: Load the text to file page
Given('I visit the text to file page', () => {
	cy.visit('text_to_file.html')
})

// Scenario: Check title
When('I load the text to file page at the correct the sub directory', () => {
	cy.location('pathname').should('eq', `/text_to_file.html`)
})
Then('I should see the title of the web page as {string}', (titleText) => {
	cy.title().should('equal', titleText)
})

// Scenario: Check footer text
When(
	'I see the footer element where the footer text has the data-cy attribute {string}',
	(dataCy) => {
		cy.getByCy(dataCy).should('be.visible').as('footerText')
	}
)
Then(
	'I should see the expected text {string} and the email address {string}',
	(expectedText, emailAddress) => {
		cy.get('@footerText')
			.invoke('text')
			.then((text) => {
				cy.wrap(text)
					.should('contain', expectedText)
					.and('contain', emailAddress)
			})
	}
)

// Scenario: Check links
When(
	'I see clickable text based on the data from the {string} fixture file',
	(fixtureFile) => {
		cy.fixture(`custom_check_links/${fixtureFile}`).as('linkFixture')
	}
)
Then(
	'I should see the correct URL for each link based on the data from the given fixture file',
	() => {
		cy.get('@linkFixture').then((links) => {
			cy.wrap(links).each((link) => {
				cy.getByCy(link.dataCy).should('have.attr', 'href', link.url)
			})
		})
	}
)

// Scenario Outline: Check text area character count going up and down
When('I type {int} characters into the text area', (charsToType) => {
	cy.typeTextToFileArea('A'.repeat(charsToType))
})
When('I delete {int} characters in the text area', (charsToDelete) => {
	cy.deleteTextToFileArea(charsToDelete)
})
Then(
	'I should see the character count in the text area update to {string}',
	(count) => {
		cy.verifyTextToFileAreaCharCount(count)
	}
)

// Scenario Outline: Check file name input character count going up and down
When('I type {int} characters into the file name input', (charsToType) => {
	cy.typeTextToFileNameInput('A'.repeat(charsToType))
})
When('I delete {int} characters in the file name input', (charsToDelete) => {
	cy.deleteTextToFileNameInput(charsToDelete)
})
Then(
	'I should see the character count in the file name input update to {string}',
	(count) => {
		cy.verifyTextToFileNameInputCharCount(count)
	}
)

// Scenario: Go through all the file type selections
When('I see the file type dropdown menu', () => {
	cy.getByCy('file-type-select').should('be.visible').as('fileTypeSelect')
})
Then('I should all the file type options available', () => {
	const optionVals = ['txt', 'md', 'csv', 'json']
	const optionTexts = [
		'Text (.txt)',
		'Markdown (.md)',
		'CSV (.csv)',
		'JSON (.json)'
	]

	cy.get('@fileTypeSelect').find('option').as('fileOptions')

	cy.get('@fileOptions').each((option, i) => {
		cy.wrap(option).invoke('val').should('equal', optionVals[i])
		cy.wrap(option).invoke('text').should('equal', optionTexts[i])
	})
})

// *Common steps for text to file scenarios
When('I type {string} into the text input field', (text) => {
	cy.typeTextToFileArea(text)
})
When(
	'I type the file name {string} into the file name input field',
	(fileName) => {
		cy.typeTextToFileNameInput(fileName)
	}
)
When('I click the download button', () => {
	cy.pressTextToFileDownload()
})

// Scenario Outline: Create and download text file
When('I select the text file type from the dropdown menu', () => {
	cy.selectTextToFileType('txt')
})
Then(
	'I should see a file with the full file name {string}.txt and the file should contain the text {string}',
	(fileName, text) => {
		cy.verifyTextToFileDownload(`${fileName}.txt`, text)
	}
)

// Scenario Outline: Create and download Markdown file
When('I select the markdown file type from the dropdown menu', () => {
	cy.selectTextToFileType('md')
})
Then(
	'I should see a file with the full file name {string}.md and the file should contain the text {string}',
	(fileName, text) => {
		cy.verifyTextToFileDownload(`${fileName}.md`, text)
	}
)

// Scenario Outline: Create and download CSV file
When('I select the CSV file type from the dropdown menu', () => {
	cy.selectTextToFileType('csv')
})
Then(
	'I should see a file with the full file name {string}.csv and the file should contain the text {string}',
	(fileName, text) => {
		cy.verifyTextToFileDownload(`${fileName}.csv`, text)
	}
)

// Scenario Outline: Create and download JSON file
When('I select the JSON file type from the dropdown menu', () => {
	cy.selectTextToFileType('json')
})
When(/^I type JSON "(.+)" into the text input field$/, (text) => {
	cy.typeTextToFileArea(text, true)
})
Then(
	/^I should see a file with the full file name "(.+)".json and the file should contain the text "(.+)"$/,
	(fileName, text) => {
		cy.log(text)
		cy.verifyTextToFileDownload(`${fileName}.json`, text)
	}
)

// *Common step for error message scenarios
When('I see this error message {string}', (errorMessage) => {
	cy.verifyTextToFileErrorMessage(errorMessage)
})
When('I see the error message disappear when I type in the text area', () => {
	cy.verifyTextToFileNoErrorMessage()
})
When(
	'I see the error message disappear when I type in the file name input field',
	() => {
		cy.verifyTextToFileNoErrorMessage(true)
	}
)
When('I clear the text area and file name input field', () => {
	cy.clearTextToFileInputs()
})
