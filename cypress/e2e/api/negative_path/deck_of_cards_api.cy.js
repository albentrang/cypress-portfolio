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

	context('Making a New Deck', () => {
		it('Make a new deck with "deck_count" equal to 0', () => {
			cy.todo('Test not implemented')
		})

		it('Make a new deck with "deck_count" equal to -1', () => {
			cy.todo('Test not implemented')
		})
	})

	context('Drawing Cards from Decks', () => {
		it('Draw a card from a deck that does not exist', () => {
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

		it('Draw -1 cards from a shuffled deck', () => {
			cy.todo('Test not implemented')
		})

		it('Draw -1 cards from a shuffled deck with jokers', () => {
			cy.todo('Test not implemented')
		})

		it('Draw -1 cards from two shuffled decks', () => {
			cy.todo('Test not implemented')
		})

		it('Draw -1 cards from two shuffled decks with jokers', () => {
			cy.todo('Test not implemented')
		})

		it('Draw 0 cards from a shuffled deck', () => {
			cy.todo('Test not implemented')
		})

		it('Draw 0 cards from a shuffled deck with jokers', () => {
			cy.todo('Test not implemented')
		})

		it('Draw 0 cards from two shuffled decks', () => {
			cy.todo('Test not implemented')
		})

		it('Draw 0 cards from two shuffled decks with jokers', () => {
			cy.todo('Test not implemented')
		})

		it('Draw 53 cards from a shuffled deck', () => {
			cy.todo('Test not implemented')
		})

		it('Draw 55 cards with jokers from a shuffled deck', () => {
			cy.todo('Test not implemented')
		})

		it('Draw 105 cards from two shuffled decks', () => {
			cy.todo('Test not implemented')
		})

		it('Draw 109 cards from two shuffled decks with jokers', () => {
			cy.todo('Test not implemented')
		})
	})

	context('Drawing Cards from Piles', () => {
		it('Draw -1 cards from a pile', () => {
			cy.todo('Test not implemented')
		})

		it('Draw 5 cards from a pile that only has 4 cards in it', () => {
			cy.todo('Test not implemented')
		})
	})

	context('Adding No Specified Cards', () => {
		it('Add no specified cards to a pile', () => {
			cy.todo('Test not implemented')
		})

		it('Add no specified cards when returning drawn cards', () => {
			cy.todo('Test not implemented')
		})

		it('Add no specified cards when returning drawn cards from a pile', () => {
			cy.todo('Test not implemented')
		})
	})
})
