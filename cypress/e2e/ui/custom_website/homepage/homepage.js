import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('I visit the homepage', () => {
	cy.visit('')
})

When('I load the homepage at the correct the sub directory', () => {
	cy.location('pathname').should('eq', `/`)
})

Then('I should see the title of the web page as {string}', (titleText) => {
	cy.title().should('equal', titleText)
})

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

When('I see an element with the data-cy attribute {string}', (dataCy) => {
	cy.getByCy(dataCy).should('be.visible').as('element')
})

Then(
	'I should expect the link to reference the correct URL {string} of the custom website or an external website',
	(url) => {
		cy.get('@clickableText').should('have.attr', 'href', url)
	}
)

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
