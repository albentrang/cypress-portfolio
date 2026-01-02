let instance

/**
 * Singleton object representing the Text to File page of my custom website.
 */
class TextToFilePage {
	#maxTextAreaLength
	#maxFileNameLength

	constructor() {
		if (!instance) {
			instance = this
		}
		this.#maxTextAreaLength = 300
		this.#maxFileNameLength = 30
	}

	/**
	 * Get the maximum allowed length for the text area.
	 * @returns {number} The maximum length for the text area.
	 */
	get maxTextAreaLength() {
		return this.#maxTextAreaLength
	}

	/**
	 * Get the maximum allowed length for the file name input.
	 * @returns {number} The maximum length for the file name input.
	 */
	get maxFileNameLength() {
		return this.#maxFileNameLength
	}

	/**
	 * Type into the text area.
	 * @param {string} text - The text to type into the text area.
	 */
	typeIntoTextArea(text) {
		cy.getByCy('text-input-area').focus()
		cy.realType(text)
	}

	/**
	 * Delete characters from the text area.
	 * @param {number} charCount - The number of characters to delete. Needs to be greater than 0.
	 */
	deleteFromTextArea(charCount) {
		if (charCount > 0) {
			cy.realType('{backspace}'.repeat(charCount))
		}
	}

	/**
	 * Type into the file name input field.
	 * @param {string} fileName - The file name to type into the input field.
	 */
	typeIntoFileNameInput(fileName) {
		cy.getByCy('file-name-input').focus()
		cy.realType(fileName)
	}

	/**
	 * Delete characters from the file name input field.
	 * @param {number} charCount - The number of characters to delete. Needs to be greater than 0.
	 */
	deleteFromFileNameInput(charCount) {
		if (charCount > 0) {
			cy.getByCy('file-name-input').focus()
			cy.realType('{backspace}'.repeat(charCount))
		}
	}

	/**
	 * Select a file type from the dropdown menu.
	 * @param {string} fileVal - The value of the file type to select (e.g., 'txt', 'md', 'csv', or 'json').
	 */
	selectFileType(fileVal) {
		cy.getByCy('file-type-select').select(fileVal)
	}

	/**
	 * Click the download button.
	 */
	clickDownloadButton() {
		cy.getByCy('download-btn').click()
	}
}

export default Object.freeze(new TextToFilePage())
