import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Background: Load the Less or More page
Given('I visit the Less or More page', () => {
	cy.visit('less_or_more.html')
})

// Scenario: Check title
When('I load the Less or More page at the correct sub directory', () => {
	cy.location('pathname').should('eq', `/less_or_more.html`)
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

// Scenario Outline: Check links
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
