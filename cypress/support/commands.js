// Custom commands for the Deck of Cards API project.
Cypress.Commands.addAll({
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
						if (deck[1].shuffle) {
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
						if (deck[1].shuffle) {
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
})
