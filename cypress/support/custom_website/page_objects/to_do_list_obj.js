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
		return cy.getByCy('clear-search-button')
	}

	/**
	 * Gets the add task button element.
	 * @returns {Cypress.Chainable}
	 */
	get addTaskButton() {
		return cy.getByCy('add-task-button')
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
	 * Selects a task element by its number.
	 * @param {number} taskNum - The task number.
	 * @returns {Cypress.Chainable}
	 */
	selectTask(taskNum) {
		return cy.getByCy(`task-${taskNum}`)
	}

	/**
	 * Selects the drag handle for a task by its number.
	 * @param {number} taskNum - The task number.
	 * @returns {Cypress.Chainable}
	 */
	selectDragHandle(taskNum) {
		return cy.getByCy(`drag-handle-${taskNum}`)
	}

	/**
	 * Selects the task number element by its number.
	 * @param {number} taskNum - The task number.
	 * @returns {Cypress.Chainable}
	 */
	selectTaskNumber(taskNum) {
		return cy.getByCy(`task-number-${taskNum}`)
	}

	/**
	 * Selects the description input for a task by its number.
	 * @param {number} taskNum - The task number.
	 * @returns {Cypress.Chainable}
	 */
	selectTaskDescription(taskNum) {
		return cy.getByCy(`desc-input-${taskNum}`)
	}

	/**
	 * Selects the priority select element for a task by its number.
	 * @param {number} taskNum - The task number.
	 * @returns {Cypress.Chainable}
	 */
	selectTaskPriority(taskNum) {
		return cy.getByCy(`priority-select-${taskNum}`)
	}

	/**
	 * Selects the delete button for a task by its number.
	 * @param {number} taskNum - The task number.
	 * @returns {Cypress.Chainable}
	 */
	selectTaskDeleteButton(taskNum) {
		return cy.getByCy(`delete-btn-${taskNum}`)
	}

	/**
	 * Selects the add tag button for a task by its number.
	 * @param {number} taskNum - The task number.
	 * @returns {Cypress.Chainable}
	 */
	selectTaskAddTagButton(taskNum) {
		return cy.getByCy(`add-tag-btn-${taskNum}`)
	}

	/**
	 * Selects the add tag input for a task by its number.
	 * @param {number} taskNum - The task number.
	 * @returns {Cypress.Chainable}
	 */
	selectTaskAddTagInput(taskNum) {
		return cy.getByCy(`add-tag-input-${taskNum}`)
	}

	/**
	 * Selects a tag element for a task by task and tag number.
	 * @param {number} taskNum - The task number.
	 * @param {number} tagNum - The tag number.
	 * @returns {Cypress.Chainable}
	 */
	selectTaskTag(taskNum, tagNum) {
		return cy.getByCy(`tag-${taskNum}-${tagNum}`)
	}

	/**
	 * Selects the remove button for a tag by task and tag number.
	 * @param {number} taskNum - The task number.
	 * @param {number} tagNum - The tag number.
	 * @returns {Cypress.Chainable}
	 */
	selectTaskTagRemoveButton(taskNum, tagNum) {
		return cy.getByCy(`remove-tag-btn-${taskNum}-${tagNum}`)
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
		this.searchBar.type(text)
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
		this.filenameInput.type(filename)
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
	 * @param {number} taskNum - The task number.
	 * @param {string} description - The description to type.
	 * @param {boolean} [clear=false] - Whether to clear the description input before typing.
	 */
	typeTaskDescription(taskNum, description, clear = false) {
		const descInput = this.selectTaskDescription(taskNum)
		if (clear) {
			descInput.clear()
		}
		descInput.type(description)
	}

	/**
	 * Chooses a priority for a task.
	 * @param {number} taskNum - The task number.
	 * @param {string} priority - The priority to select (e.g., 'Low', 'Medium', 'High').
	 */
	chooseTaskPriority(taskNum, priority) {
		this.selectTaskPriority(taskNum).select(priority)
	}

	/**
	 * Clicks the delete button for a task.
	 * @param {number} taskNum - The task number.
	 */
	clickDeleteTask(taskNum) {
		this.selectTaskDeleteButton(taskNum).click()
	}

	/**
	 * Clicks the add tag button and types a tag for a task.
	 * @param {number} taskNum - The task number.
	 * @param {string} tag - The tag to add.
	 */
	clickAddTag(taskNum, tag) {
		this.selectTaskAddTagButton(taskNum).click()
		this.selectTaskAddTagInput(taskNum).type(tag)
	}

	/**
	 * Clicks the remove button for a tag.
	 * @param {number} taskNum - The task number.
	 * @param {number} tagNum - The tag number.
	 */
	clickRemoveTag(taskNum, tagNum) {
		this.selectTaskTagRemoveButton(taskNum, tagNum).click()
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
