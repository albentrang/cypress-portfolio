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
		// Alias the element to be hovered over
		cy.getByCy(dataCy).as('anchorElement')

		// Record the original background color before hover
		cy.get('@anchorElement')
			.invoke('css', 'background-color')
			.as('originalBgColor')

		// Perform the hover action
		cy.get('@anchorElement').realHover()
	}
)
When(
	"I see the element's background color change to these RGB values: {int}, {int}, {int}",
	(r, g, b) => {
		const hoverColor = `rgb(${r}, ${g}, ${b})`

		cy.get('@anchorElement').should('have.css', 'background-color', hoverColor)
	}
)
When('I stop hovering over the element', () => {
	// Move the mouse to the top left corner to stop hovering
	cy.get('body').realMouseMove(0, 0)
})
Then(
	"I should see the element's background color revert back to its original color",
	() => {
		cy.get('@originalBgColor').then((originalColor) => {
			cy.get('@anchorElement').should(
				'have.css',
				'background-color',
				originalColor
			)
		})
	}
)

// Scenario: Check initial page state
When('I load the initial state of the Less or More page', () => {
	// The page is already loaded in the Background step, so we can just verify that we're on the correct page
	cy.location('pathname').should('eq', `/less_or_more.html`)
})
Then(
	'I should see the left number, the question marks, the Less and More buttons, and the scores at 0',
	() => {
		cy.verifyLessOrMoreInitialState()
	}
)

// *Common step for all game playing scenarios
Then(
	'I should see the expected final score and high score are displayed',
	() => {
		cy.verifyLessOrMoreGuesses()
	}
)

// Scenario: Guess less a number of times times
When(
	'I play the Less or More game by making {int} number of guesses with the Less button',
	(guessNum) => {
		cy.lessOrMoreGuessLess(guessNum)
	}
)

// Scenario: Guess more a number of times times
When(
	'I play the Less or More game by making {int} number of guesses with the More button',
	(guessNum) => {
		cy.lessOrMoreGuessMore(guessNum)
	}
)

// Scenario: Alternate guesses a number of times times
When(
	'I play the Less or More game by making {int} number of guesses by alternating between the Less and More buttons',
	(guessNum) => {
		cy.lessOrMoreGuessAlternating(guessNum)
	}
)

// Scenario: Guess optimally a number of times times
When(
	'I play the Less or More game by making {int} number of guesses by clicking the Less button if the left number is 5 or more or clicking the More button if the left number is 4 or less',
	(guessNum) => {
		cy.lessOrMoreGuessOptimal(guessNum)
	}
)

// Scenario: Guess randomly a number of times times
When(
	'I play the Less or More game by making {int} number of guesses randomly',
	(guessNum) => {
		cy.lessOrMoreGuessRandom(guessNum)
	}
)
