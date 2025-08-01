describe('Deck of Cards API Tests (Negative)', () => {
	const decksPath = 'cypress/fixtures/deck_of_cards_api/current_decks_neg.json'
	const shuffledDeckKeys = Object.freeze({
		SDS: 'singleDeckShuffled',
		SDSJ: 'singleDeckShuffledWithJokers',
		DDS: 'doubleDeckShuffled',
		DDSJ: 'doubleDeckShuffledWithJokers'
	})
	// const maxCardCount = 52
	// const maxCardCountWithJokers = 54

	before(() => {
		cy.checkDecks(decksPath)
	})

	beforeEach(() => {
		cy.section('Shuffle the shuffled decks to their full stacks')
		for (let key in shuffledDeckKeys) {
			cy.shuffleDeck(`${shuffledDeckKeys[key]}`)
		}
		cy.section('Beginning the test case')
	})

	it('Draw a card from a deck that does not exist', function () {
		cy.drawCardsFromNoDeck()
		cy.step('Verify error handling for drawing card from no deck')
		cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
			cy.wrap(drawDeckResp.status).should('equal', 404)
			cy.wrap(drawDeckResp.statusText).should('equal', 'Not Found')
			cy.wrap(drawDeckResp.body.success).should('equal', false)
			cy.wrap(drawDeckResp.body.error).should(
				'equal',
				'Deck ID does not exist.'
			)
		})
	})
})
