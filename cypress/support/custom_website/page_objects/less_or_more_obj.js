let instance

/**
 * Singleton object representing the Less or More game page of my custom website.
 */
class LessOrMorePage {
	constructor() {
		if (!instance) {
			instance = this
		}
	}

	/**
	 * Gets the game status text element.
	 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
	 */
	get gameStatus() {
		return cy.getByCy('game-status-text')
	}

	/**
	 * Gets the left number element.
	 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
	 */
	get leftNumber() {
		return cy.getByCy('left-number')
	}

	/**
	 * Gets the right number element.
	 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
	 */
	get rightNumber() {
		return cy.getByCy('right-number')
	}

	/**
	 * Gets the comparison symbol element.
	 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
	 */
	get comparisonSymbol() {
		return cy.getByCy('comparison-symbol')
	}

	/**
	 * Gets the Less button element.
	 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
	 */
	get lessButton() {
		return cy.getByCy('less-button')
	}

	/**
	 * Gets the More button element.
	 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
	 */
	get moreButton() {
		return cy.getByCy('more-button')
	}

	/**
	 * Gets the Next button element.
	 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
	 */
	get nextButton() {
		return cy.getByCy('next-button')
	}

	/**
	 * Gets the score text element.
	 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
	 */
	get score() {
		return cy.getByCy('score-label')
	}

	/**
	 * Gets the score number element.
	 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
	 */
	get scoreNum() {
		return cy.getByCy('score-num')
	}

	/**
	 * Gets the high score text element.
	 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
	 */
	get highScore() {
		return cy.getByCy('high-score-label')
	}

	/**
	 * Gets the high score number element.
	 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
	 */
	get highScoreNum() {
		return cy.getByCy('high-score-num')
	}

	/**
	 * Clicks the Less button to make a guess.
	 */
	pressGuessLess() {
		this.lessButton.click()
	}

	/**
	 * Clicks the More button to make a guess.
	 */
	pressGuessMore() {
		this.moreButton.click()
	}

	/**
	 * Clicks the Next button to proceed to the next round.
	 */
	pressNext() {
		this.nextButton.click()
	}
}

export default Object.freeze(new LessOrMorePage())
