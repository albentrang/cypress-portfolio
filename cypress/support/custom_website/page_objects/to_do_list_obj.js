let instance

/**
 * Singleton object representing the To Do List page of my custom website.
 */
class ToDoListPage {
	#maxTasks
	#maxTags
	#maxTagLength
	#maxDescLength

	constructor() {
		if (!instance) {
			instance = this
		}

		this.#maxTasks = 20
		this.#maxTags = 5
		this.#maxTagLength = 20
		this.#maxDescLength = 50
	}

	/**
	 * Maximum number of tasks allowed.
	 * @returns {number}
	 */
	get maxTasks() {
		return this.#maxTasks
	}

	/**
	 * Maximum number of tags per task.
	 * @returns {number}
	 */
	get maxTags() {
		return this.#maxTags
	}

	/**
	 * Maximum length of a tag.
	 * @returns {number}
	 */
	get maxTagLength() {
		return this.#maxTagLength
	}

	/**
	 * Maximum length of a task description.
	 * @returns {number}
	 */
	get maxDescLength() {
		return this.#maxDescLength
	}

	/**
	 * Gets the search bar element.
	 * @returns {Cypress.Chainable}
	 */
	get searchBar() {
		return cy.getByCy('search-bar')
	}

	/**
	 * Gets the clear search button element.
	 * @returns {Cypress.Chainable}
	 */
	get clearSearchButton() {
		return cy.getByCy('clear-search-btn')
	}

	/**
	 * Gets the add task button element.
	 * @returns {Cypress.Chainable}
	 */
	get addTaskButton() {
		return cy.getByCy('add-task-btn')
	}

	/**
	 * Gets the sort by highest priority button element.
	 * @returns {Cypress.Chainable}
	 */
	get sortHighestButton() {
		return cy.getByCy('sort-highest-btn')
	}

	/**
	 * Gets the sort by lowest priority button element.
	 * @returns {Cypress.Chainable}
	 */
	get sortLowestButton() {
		return cy.getByCy('sort-lowest-btn')
	}

	/**
	 * Gets the filename input element.
	 * @returns {Cypress.Chainable}
	 */
	get filenameInput() {
		return cy.getByCy('filename-input')
	}

	/**
	 * Gets the download button element.
	 * @returns {Cypress.Chainable}
	 */
	get downloadButton() {
		return cy.getByCy('download-btn')
	}

	/**
	 * Gets the to-do list element.
	 * @returns {Cypress.Chainable}
	 */
	get todoList() {
		return cy.getByCy('todo-list')
	}

	/**
	 * Gets all the task elements.
	 * @returns {Cypress.Chainable}
	 */
	get allTasks() {
		return this.todoList.children()
	}

	/**
	 * Gets all the description input elements for the tasks.
	 * @returns {Cypress.Chainable}
	 */
	get allTaskDescriptions() {
		return this.allTasks.startByCy('desc-input-')
	}

	/**
	 * Gets all the priority select elements for the tasks.
	 * @returns {Cypress.Chainable}
	 */
	get allTaskPriorities() {
		return this.allTasks.startByCy('priority-select-')
	}

	/**
	 * Gets the reset button element.
	 * @returns {Cypress.Chainable}
	 */
	get resetButton() {
		return cy.getByCy('reset-btn')
	}

	/**
	 * Gets the reset popup text element.
	 * @returns {Cypress.Chainable}
	 */
	get resetPopupText() {
		return cy.getByCy('reset-popup-text')
	}

	/**
	 * Gets the confirm reset button element.
	 * @returns {Cypress.Chainable}
	 */
	get confirmResetButton() {
		return cy.getByCy('confirm-reset-btn')
	}

	/**
	 * Gets the cancel reset button element.
	 * @returns {Cypress.Chainable}
	 */
	get cancelResetButton() {
		return cy.getByCy('cancel-reset-btn')
	}

	/**
	 * Selects a task element by its index.
	 * @param {number} taskIdx - The task index starting at 0.
	 * @returns {Cypress.Chainable}
	 */
	selectTask(taskIdx) {
		return cy.getByCy(`task-${taskIdx}`)
	}

	/**
	 * Selects the drag handle for a task by its index.
	 * @param {number} taskIdx - The task index starting at 0.
	 * @returns {Cypress.Chainable}
	 */
	selectDragHandle(taskIdx) {
		return cy.getByCy(`drag-handle-${taskIdx}`)
	}

	/**
	 * Selects the task number element by its index.
	 * @param {number} taskIdx - The task index starting at 0.
	 * @returns {Cypress.Chainable}
	 */
	selectTaskNumber(taskIdx) {
		return cy.getByCy(`task-number-${taskIdx}`)
	}

	/**
	 * Selects the description input for a task by its index.
	 * @param {number} taskIdx - The task index starting at 0.
	 * @returns {Cypress.Chainable}
	 */
	selectTaskDescription(taskIdx) {
		return cy.getByCy(`desc-input-${taskIdx}`)
	}

	/**
	 * Selects the priority select element for a task by its index.
	 * @param {number} taskIdx - The task index starting at 0.
	 * @returns {Cypress.Chainable}
	 */
	selectTaskPriority(taskIdx) {
		return cy.getByCy(`priority-select-${taskIdx}`)
	}

	/**
	 * Selects the delete button for a task by its index.
	 * @param {number} taskIdx - The task index starting at 0.
	 * @returns {Cypress.Chainable}
	 */
	selectTaskDeleteButton(taskIdx) {
		return cy.getByCy(`delete-btn-${taskIdx}`)
	}

	/**
	 * Selects the add tag button for a task by its index.
	 * @param {number} taskIdx - The task index starting at 0.
	 * @returns {Cypress.Chainable}
	 */
	selectTaskAddTagButton(taskIdx) {
		return cy.getByCy(`add-tag-btn-${taskIdx}`)
	}

	/**
	 * Selects the add tag input for a task by its index.
	 * @param {number} taskIdx - The task index starting at 0.
	 * @returns {Cypress.Chainable}
	 */
	selectTaskAddTagInput(taskIdx) {
		return cy.getByCy(`add-tag-input-${taskIdx}`)
	}

	/**
	 * Selects a tag element for a task by task and tag index.
	 * @param {number} taskIdx - The task index starting at 0.
	 * @param {number} tagIdx - The tag index starting at 0.
	 * @returns {Cypress.Chainable}
	 */
	selectTaskTag(taskIdx, tagIdx) {
		return cy.getByCy(`tag-${taskIdx}-${tagIdx}`)
	}

	/**
	 * Selects the remove button for a tag by task and tag index.
	 * @param {number} taskIdx - The task index starting at 0.
	 * @param {number} tagIdx - The tag index starting at 0.
	 * @returns {Cypress.Chainable}
	 */
	selectTaskTagRemoveButton(taskIdx, tagIdx) {
		return cy.getByCy(`remove-tag-btn-${taskIdx}-${tagIdx}`)
	}

	/**
	 * Type text into the search bar.
	 * @param {string} text - The text to type.
	 * @param {boolean} [clear=false] - Whether to clear the search bar before typing.
	 */
	typeInSearchBar(text, clear = false) {
		if (clear) {
			this.searchBar.clear()
		}
		if (text) {
			this.searchBar.type(text)
		}
	}

	/**
	 * Clicks the clear search button.
	 */
	clickClearSearch() {
		this.clearSearchButton.click()
	}

	/**
	 * Clicks the Add Task button.
	 */
	clickAddTask() {
		this.addTaskButton.click()

		// Set an alias for the new task's index number, starting at 0, to use in later steps.
		this.todoList
			.children()
			.last()
			.invoke('attr', 'data-cy')
			.then((dataCyVal) => {
				const taskIdx = parseInt(dataCyVal.split('-')[1])
				cy.wrap(taskIdx).as('newTaskIdx')
			})
	}

	/**
	 * Clicks the sort by highest priority button.
	 */
	clickSortHighest() {
		this.sortHighestButton.click()
	}

	/**
	 * Clicks the sort by lowest priority button.
	 */
	clickSortLowest() {
		this.sortLowestButton.click()
	}

	/**
	 * Types a filename and clicks the download button.
	 * @param {string} filename - The filename to use for the download.
	 * @param {boolean} [clear=false] - Whether to clear the filename input before typing.
	 */
	downloadToDoList(filename, clear = false) {
		if (clear) {
			this.filenameInput.clear()
		}
		if (filename) {
			this.filenameInput.type(filename)
		}
		this.downloadButton.click()
	}

	/**
	 * Drags a task from one position to another.
	 * @param {number} fromTaskNum - The task number to drag from.
	 * @param {number} toTaskNum - The task number to drag to.
	 */
	dragAndDropTask(fromTaskNum, toTaskNum) {
		this.selectDragHandle(fromTaskNum).trigger('mousedown', { which: 1 })
		this.selectTask(toTaskNum)
			.trigger('mousemove')
			.trigger('mouseup', { force: true })
	}

	/**
	 * Types a description for a task.
	 * @param {number} taskIdx - The task index starting at 0.
	 * @param {string} description - The description to type.
	 * @param {boolean} [clear=false] - Whether to clear the description input before typing.
	 */
	typeTaskDescription(taskIdx, description, clear = false) {
		const descInput = this.selectTaskDescription(taskIdx)
		if (clear) {
			descInput.clear()
		}
		if (description) {
			descInput.type(description)
		}
	}

	/**
	 * Chooses a priority for a task.
	 * @param {number} taskIdx - The task index starting at 0.
	 * @param {string} priority - The priority to select that's "Low", "Medium", "High", or "Critical".
	 */
	chooseTaskPriority(taskIdx, priority) {
		this.selectTaskPriority(taskIdx).select(priority)
	}

	/**
	 * Clicks the delete button for a task.
	 * @param {number} taskIdx - The task index starting at 0.
	 */
	clickDeleteTask(taskIdx) {
		this.selectTaskDeleteButton(taskIdx).click()
	}

	/**
	 * Clicks the add tag button and types a tag for a task.
	 * @param {number} taskIdx - The task index starting at 0.
	 * @param {string} tag - The tag to add. Can start with a "#" but doesn't have to, and it's handled in the website's JavaScript code.
	 */
	addTag(taskIdx, tag) {
		if (tag) {
			this.selectTaskAddTagInput(taskIdx).type(tag)
			this.selectTaskAddTagButton(taskIdx).click()
		}
	}

	/**
	 * Clicks the remove button for a tag.
	 * @param {number} taskIdx - The task index starting at 0.
	 * @param {number} tagIdx - The tag index starting at 0.
	 */
	clickRemoveTag(taskIdx, tagIdx) {
		this.selectTaskTagRemoveButton(taskIdx, tagIdx).click()
	}

	/**
	 * Clicks the reset button and either confirms or cancels the reset action.
	 * @param {boolean} [confirm=true] - Whether to confirm the reset action (true) or cancel it (false).
	 */
	clickReset(confirm = true) {
		this.resetButton.click()
		if (confirm) {
			this.confirmResetButton.click()
		} else {
			this.cancelResetButton.click()
		}
	}
}

export default Object.freeze(new ToDoListPage())
