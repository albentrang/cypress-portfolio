let instance

/**
 * Singleton for handling and executing the methods available for the
 * Deck of Cards API.
 */
class DeckHandler {
	constructor() {
		if (!instance) {
			instance = this
		}
	}

	/**
	 * Checks if the given list of decks that were created are
	 * still available. If not, create those decks using each
	 * deck's defined attributes.
	 * @param {string} path The file path that goes to the file
	 * containing an object with other objects for the decks
	 * to be used.
	 */
	checkDecks(path) {
		// Read the decks saved on the given fixture file.
		cy.readFile(path).then((decksJson) => {
			/* Utilize arrays instead of objects because it's easier for Cypress to handle.
			 * Each deck array has the name of the original object as deck[0], and
			 * the actual object is deck[1].
			 */
			cy.wrap(Object.entries(decksJson)).each((deck) => {
				// Use an API call to check if the deck exists.
				cy.api({
					url: `api/deck/${deck[1].id}/`,
					failOnStatusCode: false
				}).then((response) => {
					if (response.body.success) {
						// Shuffle or return the drawn cards to the deck.
						if (deck[1].shuffled) {
							cy.step('Shuffle deck with drawn cards')
							cy.api(`api/deck/${deck[1].id}/shuffle/`)
						} else {
							cy.step('Return drawn cards to deck')
							cy.api(`api/deck/${deck[1].id}/return/`)
						}
					} else {
						// Make a new deck and save its deck ID.
						cy.step('Make new deck')
						let newDeckUrl = 'api/deck/new/'

						// Additional sub directory for shuffling the new deck.
						if (deck[1].shuffled) {
							newDeckUrl += 'shuffle/'
						}

						// Query parameters for multiple decks and/or enabling joker cards.
						if (deck[1].deckCount > 0 && deck[1].jokersEnabled) {
							newDeckUrl += `?deck_count=${deck[1].deckCount}&jokers_enabled=true`
						} else if (deck[1].deckCount > 0) {
							newDeckUrl += `?deck_count=${deck[1].deckCount}`
						} else if (deck[1].jokersEnabled) {
							newDeckUrl += `?jokers_enabled=true`
						}

						// Update the deck ID for the specified object in the fixture file.
						cy.api(newDeckUrl).then((newDeckResp) => {
							let objCopy = {}
							deck[1].id = newDeckResp.body.deck_id
							Object.defineProperty(objCopy, `${deck[0]}`, {
								value: { ...deck[1] }
							})
							cy.writeFile(path, Object.assign(decksJson, objCopy))
						})
					}
				})
			})
		})
	}

	/**
	 * Draw a card from a deck based on the given deck ID and card count.
	 * @param {string} deckId The ID of the deck.
	 * @param {number} drawCount The number of cards to be drawn as a
	 * positive, whole number.
	 */
	drawCardFromDeck(deckId, drawCount) {
		const drawDeckCardUrl = `api/deck/${deckId}/draw/?count=${Math.trunc(drawCount)}`
		const apiOptions = { url: drawDeckCardUrl, failOnStatusCode: false }

		cy.step(`Drawing ${drawCount} card(s) from deck ID ${deckId}`)
		cy.api(apiOptions).as('recentDrawDeckResp')
	}

	/**
	 * Reshuffle a deck of cards.
	 * @param {string} deckId The ID of the deck.
	 * @param {string} [remaining] Set this to true to shuffle cards only in
	 * main stack while ignoring any piles or drawn cards (optional).
	 */
	reshuffleDeck(deckId, remaining = ``) {
		let reshuffleDeckUrl = `api/deck/${deckId}/shuffle/`
		/* The string for "remaining" can be omitted the query parameter
		or set as any string for testing positive and negative scenarios. */
		if (remaining) {
			reshuffleDeckUrl += `?remaining=${remaining}`
		}
		cy.step(`Reshuffle deck ID ${deckId} with 'remaining' set to ${remaining}`)
		cy.api(reshuffleDeckUrl).as('recentReshuffleDeckResp')
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
		cy.api(addPileCardsUrl).as('@recentAddPileResp')
	}

	/**
	 * List the cards in a pile from a deck.
	 * @param {string} deckId The ID of the deck.
	 * @param {string} pileName The name of the pile from the deck.
	 */
	listCardsInPile(deckId, pileName) {
		const listPileCardsUrl = `api/deck/${deckId}/pile/${pileName}/list/`
		cy.step(`Listing cards in pile ${pileName} from deck id ${deckId}`)
		cy.api(listPileCardsUrl).as('@recentListPileResp')
	}

	/**
	 * Draw cards in a pile from a deck by using card codes or card count.
	 * @param {string} deckId The ID of the deck.
	 * @param {string} pileName The name of the pile from the deck.
	 * @param {string} drawMethod Set as either "bottom" to draw a card from the bottom
	 * of the pile or "random" to draw a random card from a pile.
	 * @param {string | number} cardsToGet Either get specific cards from a pile using
	 * a string of comma-separated card codes or some number of cards using a number.
	 */
	drawCardFromPile(deckId, pileName, drawMethod, cardsToGet) {
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
	 * Reshuffled a pile from a deck.
	 * @param {string} deckId The ID of the deck.
	 * @param {string} pileName The name of the pile from the deck.
	 */
	reshufflePile(deckId, pileName) {
		const reshufflePileUrl = `api/deck/${deckId}/pile/${pileName}/shuffle/`
		cy.step(`Reshuffle pile ${pileName} from deck id ${deckId}`)
		cy.api(reshufflePileUrl).as('recentReshufflePileResp')
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
