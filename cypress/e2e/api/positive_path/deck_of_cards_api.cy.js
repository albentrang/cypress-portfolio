describe('Deck of Cards API Tests (Positive)', () => {
	const decksPath = 'cypress/fixtures/deck_of_cards_api/current_decks_pos.json'
	const maxCardCount = 52
	const maxCardCountWithJokers = 54

	beforeEach(() => {
		cy.checkDecks(decksPath)
	})

	it('Check each card is in order for an unshuffled deck', function () {
		const deckKey = 'singleDeck'

		cy.drawCardFromDeck(deckKey, maxCardCount)
		cy.verifyOrderedDeck()
	})

	it('Check each card is in order for an unshuffled deck with jokers', function () {
		const deckKey = 'singleDeckWithJokers'

		cy.drawCardFromDeck(deckKey, maxCardCountWithJokers)
		cy.verifyOrderedDeck()
	})
})
