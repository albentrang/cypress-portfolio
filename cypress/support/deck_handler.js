let instance

/**
 * Singleton for handling and executing the methods available for the
 * Deck of Cards API.
 */
class DeckHandler {
	#maxCardCount
	#maxCardCountWithJokers

	constructor() {
		if (!instance) {
			instance = this
		}

		this.#maxCardCount = 52
		this.#maxCardCountWithJokers = 54
	}

	get maxCardCount() {
		return this.#maxCardCount
	}

	get maxCardCountWithJokers() {
		return this.#maxCardCountWithJokers
	}

	/**
	 * Create a new deck of cards or a partial deck based on the given
	 * properties in the deck object.
	 * @param {object} deckObj The deck object containing the properties.
	 */
	createNewDeck(deckObj) {
		let newDeckUrl = 'api/deck/new/'

		if (deckObj.cards) {
			// Make a new partial deck using the card IDs in the 'cards' attribute and save its deck ID.
			cy.step('Make new partial deck')
			newDeckUrl += `?cards=${deckObj.cards}`
		} else {
			cy.step('Make new deck')

			// Additional sub directory for shuffling the new deck.
			if (deckObj.shuffled) {
				newDeckUrl += 'shuffle/'
			}

			// Query parameters for multiple decks and/or enabling joker cards.
			if (deckObj.deckCount > 0 && deckObj.jokersEnabled) {
				newDeckUrl += `?deck_count=${deckObj.deckCount}&jokers_enabled=true`
			} else if (deckObj.deckCount > 0) {
				newDeckUrl += `?deck_count=${deckObj.deckCount}`
			} else if (deckObj.jokersEnabled) {
				newDeckUrl += `?jokers_enabled=true`
			}
		}

		cy.api(newDeckUrl).as('newDeckResp')
	}

	/**
	 * Draw a card from a deck based on the given deck ID and card count.
	 * @param {string} deckId The ID of the deck.
	 * @param {number} drawCount The number of cards to be drawn as a
	 * positive, whole number.
	 */
	drawCardsFromDeck(deckId, drawCount) {
		const drawDeckCardUrl = `api/deck/${deckId}/draw/?count=${Math.trunc(drawCount)}`
		const apiOptions = { url: drawDeckCardUrl, failOnStatusCode: false }

		cy.step(`Drawing ${drawCount} card(s) from deck ID ${deckId}`)
		cy.api(apiOptions).as('recentDrawDeckResp')
	}

	/**
	 * Shuffle a deck of cards.
	 * @param {string} deckId The ID of the deck.
	 * @param {string} [remaining] Set this to true to shuffle cards only in
	 * main stack while ignoring any piles or drawn cards (optional).
	 */
	shuffleDeck(deckId, remaining = ``) {
		let shuffleDeckUrl = `api/deck/${deckId}/shuffle/`

		/* The string for "remaining" can be omitted the query parameter
		or set as any string for testing positive and negative scenarios. */
		if (remaining) {
			shuffleDeckUrl += `?remaining=${remaining}`
		}

		cy.step(`Shuffle deck ID ${deckId} with 'remaining' set to ${remaining}`)
		cy.api(shuffleDeckUrl).as('recentShuffleDeckResp')
	}

	/**
	 * Add cards to a pile for a deck.
	 * @param {string} deckId The ID of the deck.
	 * @param {string} pileName The name of the pile from the deck.
	 * @param {string} cards The cards to be put in the pile as a
	 * comma-separated string of card codes.
	 */
	addCardsToPile(deckId, pileName, cards) {
		const addPileCardsUrl = `api/deck/${deckId}/pile/${pileName}/add/?cards=${cards}`

		cy.step(`Adding cards ${cards} from deck id ${deckId} in pile ${pileName}`)
		cy.api(addPileCardsUrl).as('recentAddPileResp')
	}

	/**
	 * Shuffle a pile from a deck.
	 * @param {string} deckId The ID of the deck.
	 * @param {string} pileName The name of the pile from the deck.
	 */
	shufflePile(deckId, pileName) {
		const shufflePileUrl = `api/deck/${deckId}/pile/${pileName}/shuffle/`

		cy.step(`Shuffle pile ${pileName} from deck id ${deckId}`)
		cy.api(shufflePileUrl).as('recentShufflePileResp')
	}

	/**
	 * List the cards in a pile from a deck.
	 * @param {string} deckId The ID of the deck.
	 * @param {string} pileName The name of the pile from the deck.
	 */
	listCardsInPile(deckId, pileName) {
		const listPileCardsUrl = `api/deck/${deckId}/pile/${pileName}/list/`

		cy.step(`Listing cards in pile ${pileName} from deck id ${deckId}`)
		cy.api(listPileCardsUrl).as('recentListPileResp')
	}

	/**
	 * Draw cards in a pile from a deck by using card codes or card count.
	 * @param {string} deckId The ID of the deck.
	 * @param {string} pileName The name of the pile from the deck.
	 * @param {string | number} cardsToGet Either get specific cards from a pile using
	 * a string of comma-separated card codes or some number of cards using a number.
	 * @param {string} [drawMethod] Set as either "bottom" to draw a card from the bottom
	 * of the pile or "random" to draw a random card from a pile (optional).
	 */
	drawCardsFromPile(deckId, pileName, cardsToGet, drawMethod = '') {
		let drawPileCardUrl = `api/deck/${deckId}/pile/${pileName}/draw/`

		if (drawMethod) {
			drawPileCardUrl += `${drawMethod}/`
		}

		switch (typeof cardsToGet) {
			case 'string':
				drawPileCardUrl += `?cards=${cardsToGet}`
				break
			case 'number':
				drawPileCardUrl += `?count=${Math.trunc(cardsToGet)}`
				break
		}

		cy.step(`Draw card(s) from deck id ${deckId} in pile ${pileName}`)
		cy.api(drawPileCardUrl).as('recentDrawPileResp')
	}

	/**
	 * Return the cards that are either drawn or in a pile back to the deck.
	 * @param {string} deckId The ID of the deck.
	 * @param {string} [cards] The cards to be put in the pile as a
	 * comma-separated string of card codes (optional).
	 * @param {string} [pileName] The name of the pile from the deck (optional).
	 */
	returnCards(deckId, cards = '', pileName = '') {
		let returnCardsUrl = `api/deck/${deckId}/`

		if (pileName) {
			returnCardsUrl += `pile/${pileName}/`
		}

		returnCardsUrl += 'return/'

		if (cards) {
			returnCardsUrl += `?cards=${cards}`
		}

		cy.step(`Return cards to deck id ${deckId}`)
		cy.api(returnCardsUrl).as('recentReturnCardsResp')
	}
}

export default Object.freeze(new DeckHandler())
