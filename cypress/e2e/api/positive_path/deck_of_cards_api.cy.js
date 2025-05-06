const decksPath = './cypress/fixtures/deck_of_cards_api/current_decks_pos.json'

describe('Deck of Cards API Tests (Positive)', () => {
	before(() => {
		cy.checkDecks(decksPath)
	})
})
