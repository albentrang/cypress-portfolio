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

// *Common step for adding 20 tasks in multiple scenarios
When(
	'I add 20 to do items with the text "Task num" where num is the task number from 1 to 20',
	() => {
		const taskDescs = Array.from({ length: 20 }, (_, i) => `Task ${i + 1}`)

		cy.wrap(taskDescs).each((desc) => {
			cy.addToDoItem(desc)
		})
	}
)

// Scenario: Add 20 to do items
Then(
	'I should see all 20 new to do items with the correct text and task numbers in the list of to do items',
	() => {
		for (let i = 1; i <= 20; i++) {
			cy.verifyToDoTask(i, `Task ${i}`, 'Low')
		}
	}
)
Then(
	'I should see that the Add button is disabled after adding the 20th to do item',
	() => {
		cy.verifyAddButtonStatus(false)
	}
)

// *Common step for using a fixture to add tasks in multiple scenarios
When('I add tasks based on the fixture {string}', (fixtureFile) => {
	cy.addMultipleToDoItems(fixtureFile)
})

// *Common step for deleting a task in multiple scenarios
When('I delete task {int}', (taskNum) => {
	cy.deleteToDoItem(taskNum)
})

// Scenario: Delete a to do item and check that the task numbers update
Then(
	'I should see that task {int} with the description {string} is gone',
	(taskNum, taskDesc) => {
		cy.verifyTaskDeleted(taskNum, taskDesc)
	}
)
Then(
	'The first task is still there with the description "Task 1", and the third task is now the second task with the description "Task 3" in the list of to do items',
	() => {
		cy.verifyToDoTask(1, 'Task 1', 'High')
		cy.verifyToDoTask(2, 'Task 3', 'Low')
	}
)
Then(
	'I should see that the Reset button is still visible when there are still tasks in the list',
	() => {
		cy.verifyResetButtonStatus(true)
	}
)

// Scenario: Add 20 to do items and then delete one
Then('I should see that task {int} is gone', (taskNum) => {
	cy.verifyTaskDeleted(taskNum)
})
Then(
	'I should see that the Add button is enabled again after deleting a task from the list',
	() => {
		cy.verifyAddButtonStatus(true)
	}
)

// Scenario: Delete all to do items individually and check that the list is empty
Then(
	'I should see that there are no tasks displayed in the list of to do items',
	() => {
		cy.verifyTaskCount(0)
	}
)
Then(
	'I should see that the Reset button is hidden when there are no tasks in the list',
	() => {
		cy.verifyResetButtonStatus(false)
	}
)
