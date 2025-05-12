const decksPath = './cypress/fixtures/deck_of_cards_api/current_decks_neg.json'

describe('Deck of Cards API Tests (Negative)', () => {
	before(() => {
		cy.checkDecks(decksPath)
	})

	it('Draw a card from a deck that does not exist', function () {
		cy.section('To be completed later')
	})
})
