const decksPath = './cypress/fixtures/deck_of_cards_api/current_decks_pos.json'

describe('Deck of Cards API Tests (Positive)', () => {
	before(() => {
		cy.checkDecks(decksPath)
	})

	it('Check each card is in order for an unshuffled deck', function () {
		cy.section('To be completed later')
	})
})
