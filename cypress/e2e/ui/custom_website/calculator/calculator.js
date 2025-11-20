import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Background: Load the calculator page
Given('I visit the calculator page', () => {
	cy.visit('calculator.html')
})

// Scenario: Check title
When('I load the calculator page at the correct the sub directory', () => {
	cy.location('pathname').should('eq', `/calculator.html`)
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

// Scenario: Cannot modify calculator display directly
When(
	'I try to type directly into the calculator display with the data-cy attribute {string}',
	(dataCy) => {
		cy.getByCy(dataCy).as('calcDisplay')
		cy.get('@calcDisplay').should('have.attr', 'readonly')
	}
)
Then(
	'I should see that the value of the calculator display remains unchanged at {string}',
	(expectedValue) => {
		cy.get('@calcDisplay').should('have.value', expectedValue)
	}
)

// Scenario Outline: Add two numbers using the calculator
When('I enter {string} and {string} and press +', (num1, num2) => {
	// Helper to click calculator buttons for a given string
	function clickNumber(str) {
		for (const char of str) {
			if (char === '.') {
				cy.getByCy('btn-decimal').realClick()
			} else if (char >= '0' && char <= '9') {
				cy.getByCy(`btn-${char}`).realClick()
			}
		}

		// Add negative sign
		if (str.startsWith('-')) {
			cy.getByCy('btn-sign-change').realClick()
			str = str.slice(1)
		}
	}

	clickNumber(num1)
	cy.getByCy('btn-add').realClick()
	clickNumber(num2)
})

When('I press =', () => {
	cy.getByCy('btn-equals').realClick()
})

Then('I should see the calculator display show {string}', (result) => {
	cy.getByCy('calc-display').should('have.value', result)
})
