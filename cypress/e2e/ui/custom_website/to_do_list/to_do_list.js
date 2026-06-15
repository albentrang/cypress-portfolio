import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Background: Load the To Do List page
Given('I visit the To Do List page', () => {
	cy.visit('to_do_list.html')
})
Given('I click the Reset button to clear any existing tasks', () => {
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

// Scenario: Add an empty task, Scenario: Add a task
When('I add a task with {string} as the description', (taskDesc) => {
	cy.addTask(taskDesc)
})
Then('I should see {int} tasks in the list of tasks', (taskCount) => {
	cy.verifyTaskCount(taskCount)
})
Then(
	'I should see the task number is {string}, the task description is {string}, and the priority is {string}',
	(taskNum, description, priority) => {
		cy.verifyToDoTask(taskNum, description, priority)
	}
)
Then('There are no tags displayed for task {int}', (taskNum) => {
	cy.verifyTags(taskNum, [])
})

// *Common step for adding 20 tasks in multiple scenarios
When(
	'I add 20 tasks with the text "Task num" where num is the task number from 1 to 20',
	() => {
		const taskDescs = Array.from({ length: 20 }, (_, i) => `Task ${i + 1}`)

		cy.wrap(taskDescs).each((desc) => {
			cy.addTask(desc)
		})
	}
)

// Scenario: Add 20 tasks
Then(
	'I should see all 20 new tasks with the correct text and task numbers in the list of tasks',
	() => {
		for (let i = 1; i <= 20; i++) {
			cy.verifyToDoTask(i, `Task ${i}`, 'Low')
		}
	}
)
Then(
	'I should see that the Add button is disabled after adding the 20th task',
	() => {
		cy.verifyAddButtonStatus(false)
	}
)

// *Common step for using a fixture to add tasks in multiple scenarios
When('I add tasks based on the fixture {string}', (fixtureFile) => {
	cy.addMultipleTasks(fixtureFile)
})

// *Common step for deleting a task in multiple scenarios
When('I delete task {int}', (taskNum) => {
	cy.deleteTask(taskNum)
})
Then(
	'I should see that task {int} with the description {string} is gone',
	(taskNum, taskDesc) => {
		cy.verifyTaskDeleted(taskNum, taskDesc)
	}
)
Then(
	'I should see that the Reset button is still visible when there are still tasks in the list',
	() => {
		cy.verifyResetButtonStatus(true)
	}
)

// Scenario: Delete the first task and check that the task numbers update
Then(
	'The second task is now the first task with the description "Task 2", and the third task is now the second task with the description "Task 3" in the list of tasks',
	() => {
		cy.verifyToDoTask(1, 'Task 2', 'Low')
		cy.verifyToDoTask(2, 'Task 3', 'Low')
	}
)

// Scenario: Delete a task in the middle and check that the task numbers update
Then(
	'The first task is still there with the description "Task 1", and the third task is now the second task with the description "Task 3" in the list of tasks',
	() => {
		cy.verifyToDoTask(1, 'Task 1', 'High')
		cy.verifyToDoTask(2, 'Task 3', 'Low')
	}
)

// Scenario: Delete the last task and check that the task numbers update
Then(
	'The first task is still there with the description "Task 1", and the second task is still there with the description "Task 2" in the list of tasks',
	() => {
		cy.verifyToDoTask(1, 'Task 1', 'High')
		cy.verifyToDoTask(2, 'Task 2', 'Low')
	}
)

// Scenario: Add 20 tasks and then delete one
Then('I should see that task {int} is gone', (taskNum) => {
	cy.verifyTaskDeleted(taskNum)
})
Then(
	'I should see that the Add button is enabled again after deleting a task from the list',
	() => {
		cy.verifyAddButtonStatus(true)
	}
)

// Scenario: Delete all tasks individually and check that the list is empty
Then(
	'I should see that there are no tasks displayed in the list of tasks',
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

// *Common step for searching for tasks in multiple scenarios
When('I search for tasks with the keyword {string}', (keyword) => {
	cy.searchTasks(keyword)
})

// Scenario: Search for tasks with the word "a"
Then(
	'I should see {int} tasks that contain the {string} in their descriptions while ignoring casing',
	(count, keyword) => {
		cy.verifyTaskCountAfterSearch(count, keyword)
	}
)

// *Common steps for adding a task with description and tags in multiple scenarios
When(
	'I add a task with the text {string} and the tags {string}',
	(text, tags) => {
		cy.addTask(text, 'Low', tags)
	}
)
Then(
	'I should see task {int} with the text {string} and the tags {string} in the list of tasks',
	(taskNum, text, tags) => {
		cy.verifyToDoTask(taskNum, text, 'Low')
		cy.verifyTags(taskNum, tags.split(' '))
	}
)

// Scenario: Add a task with five tags
Then(
	'I should see that the Add Tag button is disabled after adding the 5th tag on task {int}',
	(taskNum) => {
		cy.verifyAddTagButtonStatus(taskNum, false)
	}
)

// *Common steps for deleting tags from a task in multiple scenarios
When('I delete the tag {int} from task {int}', (tagIdx, taskNum) => {
	cy.deleteTaskTag(taskNum, tagIdx)
})
When('I add the tag {string} to task {int}', (tag, taskNum) => {
	cy.addTaskTag(taskNum, tag)
})
Then('I should see only {int} tags for task {int}', (tagCount, taskNum) => {
	cy.verifyTagCount(taskNum, tagCount)
})
Then(
	'I should see that the tag {string} is no longer displayed for task {int}',
	(tag, taskNum) => {
		cy.verifyTagDeleted(taskNum, tag)
	}
)
Then(
	'I should see that the Add Tag button is enabled again for task {int}',
	(taskNum) => {
		cy.verifyAddTagButtonStatus(taskNum, true)
	}
)

// *Common steps for searching for tasks with specific tags in multiple scenarios
Then(
	'Each task contains at least one tag that has the text {string} while ignoring casing and the hashtag symbol',
	(tag) => {
		cy.verifyTasksContainTag(tag)
	}
)

// Scenario: Sort tasks by priority from low to high
When('I click the sort button to sort by priority from low to high', () => {
	cy.sortTasksByLowestPriority()
})
Then(
	'I should see the tasks from {string} sorted by priority and alphabetically from low to high in the list of tasks',
	(fixtureFile) => {
		cy.verifySortedTasks(fixtureFile, 'asc')
	}
)

// Scenario: Sort tasks by priority from high to low
When('I click the sort button to sort by priority from high to low', () => {
	cy.sortTasksByHighestPriority()
})
Then(
	'I should see the tasks from {string} sorted by priority and alphabetically from high to low in the list of tasks',
	(fixtureFile) => {
		cy.verifySortedTasks(fixtureFile, 'desc')
	}
)

// *Common steps for downloading the list of tasks as a JSON file in multiple scenarios
When('I click the Download button', () => {
	cy.downloadTasks()
})
Then(
	'I should see a JSON file named {string} downloaded to my computer that contains all the information from {string}',
	(filename, fixtureFile) => {
		cy.verifyToDoListDownload(filename, fixtureFile)
	}
)

// Scenario Outline: Download the to do list with a specific file name as a JSON file
When(
	'I enter the file name {string} in the file name input field and click the Download button',
	(fileName) => {
		cy.downloadTasks(fileName)
	}
)
