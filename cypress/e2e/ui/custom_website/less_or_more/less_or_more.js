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
