describe('Deck of Cards API Tests (Positive)', () => {
	const decksPath = 'cypress/fixtures/deck_of_cards_api/current_decks_pos.json'
	const maxCardCount = 52
	const maxCardCountWithJokers = 54

	before(() => {
		cy.checkDecks(decksPath)
	})

	it.only('Check each card is in order for an unshuffled deck', function () {
		cy.drawCardFromDeck('singleDeck', maxCardCount)
		cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
			cy.wrap(drawDeckResp.body.success).should('equal', true)
			cy.fixture('deck_of_cards_api/ordered_deck.json').then((orderedDeck) => {
				cy.wrap(drawDeckResp.body.cards).each((card, idx) => {
					cy.wrap(card.code).should('equal', orderedDeck[idx].code)
					cy.wrap(card.image).should('equal', orderedDeck[idx].image)
					cy.wrap(card.images.svg).should('equal', orderedDeck[idx].images.svg)
					cy.wrap(card.images.png).should('equal', orderedDeck[idx].images.png)
					cy.wrap(card.value).should('equal', orderedDeck[idx].value)
					cy.wrap(card.suit).should('equal', orderedDeck[idx].suit)
				})
			})
		})
	})

	it('Check each card is in order for an unshuffled deck with jokers', function () {
		cy.drawCardFromDeck('singleDeckWithJokers', maxCardCountWithJokers)
		cy.get('@recentDrawResp').then((drawResp) => {
			cy.wrap(drawResp.body.success).should('deep.equal', true)
		})
	})
})
