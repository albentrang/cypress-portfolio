import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Background: Load the To Do List page
Given('I visit the To Do List page', () => {
	cy.visit('to_do_list.html')
})
Given('I click the Reset button to clear any existing to do items', () => {
	// Use querySelector to check if the Reset button is present before trying to click it, since it's only there when there are existing tasks.
	cy.document().then((doc) => {
		const resetButton = doc.querySelector('[data-cy="reset-button"]')
		if (resetButton) {
			cy.getByCy('reset-button').click()
		}
	})
})

// Scenario: Check title
When('I load the To Do List page at the correct sub directory', () => {
	cy.location('pathname').should('eq', `/to_do_list.html`)
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

// Scenario: Add an empty to do item, Scenario: Add a to do item
When('I add a to do item with {string} as the description', (taskDesc) => {
	cy.addToDoItem(taskDesc)
})
Then('I should see {int} task in the list of to do items', (taskCount) => {
	cy.verifyTaskCount(taskCount)
})
Then(
	'I should see the task number is {string}, the task description is {string}, and the priority is {string}',
	(taskNum, description, priority) => {
		cy.verifyToDoTask(taskNum, description, priority)
	}
)
Then('There are no tags displayed for to do item {int}', (taskNum) => {
	cy.verifyTags(taskNum, [])
})
