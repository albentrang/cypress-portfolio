const decksPath = './cypress/fixtures/deck_of_cards_api/current_decks_neg.json'

describe('Deck of Cards API Tests (Negative)', () => {
	before(() => {
		cy.checkDecks(decksPath)
	})
})
