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

// Scenario Outline: Check text
When('I see an element with the data-cy attribute {string}', (dataCy) => {
	cy.getByCy(dataCy).should('be.visible').as('element')
})
Then(
	'I should expect the link to reference the correct URL {string} of the custom website or an external website',
	(url) => {
		cy.get('@clickableText').should('have.attr', 'href', url)
	}
)

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

// Scenario Outline: Check links
When('I see clickable text with the data-cy attribute {string}', (dataCy) => {
	cy.getByCy(dataCy).should('be.visible').as('clickableText')
})
Then('I should see the expected text {string} from that element', (expText) => {
	cy.get('@element')
		.invoke('text')
		.then((text) => {
			cy.wrap(text.trim()).should('equal', expText)
		})
})

// Scenario Outline: Check hover effects
When(
	'I hover over the element with the data-cy attribute {string}',
	(dataCy) => {
		cy.getByCy(dataCy).as('anchorElement')
	}
)
Then(
	"I should see the element's background color change to these RGB values: {int}, {int}, {int}",
	(r, g, b) => {
		const hoverColor = `rgb(${r}, ${g}, ${b})`

		cy.get('@anchorElement').realHover()
		cy.get('@anchorElement').should('have.css', 'background-color', hoverColor)
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

// Scenario Outline: Create and download text file
When('I type {string} into the text input field', (text) => {
	cy.typeTextToFileArea(text)
})
When(
	'I type the file name {string} into the file name input field',
	(fileName) => {
		cy.typeTextToFileNameInput(fileName)
	}
)
When('I select the text file type from the dropdown menu', () => {
	cy.selectTextToFileType('txt')
})
When('I click the download button', () => {
	cy.pressTextToFileDownload()
})
Then(
	'I should see a file with the full file name {string}.txt and the file should contain the text {string}',
	(fileName, text) => {
		cy.verifyTextToFileDownload(`${fileName}.txt`, text)
	}
)

// Scenario: Error message for invalid input and removing it
When('I see an error message {string}', (errorMessage) => {
	cy.verifyTextToFileErrorMessage(errorMessage)
})
Then(
	'I should see the error message disappear when I type in the text area',
	() => {
		cy.verifyTextToFileNoErrorMessage()
	}
)
