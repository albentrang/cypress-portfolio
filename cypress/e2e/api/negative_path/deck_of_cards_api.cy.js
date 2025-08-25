describe('Deck of Cards API Tests (Negative)', () => {
	const decksPath = 'cypress/fixtures/deck_of_cards_api/current_decks_neg.json'
	const shuffledDeckKeys = Object.freeze({
		SDS: 'singleDeckShuffled',
		SDSJ: 'singleDeckShuffledWithJokers',
		DDS: 'doubleDeckShuffled',
		DDSJ: 'doubleDeckShuffledWithJokers'
	})
	const maxCardCount = 52
	const maxCardCountWithJokers = 54

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
			const deckCount = 0

			cy.createInvalidDeck(deckCount)
		})

		it('Make a new deck with "deck_count" equal to -1', () => {
			const deckCount = -1

			cy.createInvalidDeck(deckCount)
		})
	})

	context('Drawing Cards from Decks', () => {
		it('Draw a card from a deck that does not exist', () => {
			cy.drawCardsFromNoDeck()
		})

		it('Draw 0 cards from a shuffled deck', () => {
			const deckKey = 'singleDeckShuffled'
			const maxCardsExpected = maxCardCount

			cy.drawZeroCardsFromDeck(deckKey, maxCardsExpected)
		})

		it('Draw 0 cards from a shuffled deck with jokers', () => {
			const deckKey = 'singleDeckShuffledWithJokers'
			const maxCardsExpected = maxCardCountWithJokers

			cy.drawZeroCardsFromDeck(deckKey, maxCardsExpected)
		})

		it('Draw 0 cards from two shuffled decks', () => {
			const deckKey = 'doubleDeckShuffled'
			const maxCardsExpected = maxCardCount * 2

			cy.drawZeroCardsFromDeck(deckKey, maxCardsExpected)
		})

		it('Draw 0 cards from two shuffled decks with jokers', () => {
			const deckKey = 'doubleDeckShuffledWithJokers'
			const maxCardsExpected = maxCardCountWithJokers * 2

			cy.drawZeroCardsFromDeck(deckKey, maxCardsExpected)
		})

		it('Draw 53 cards from a shuffled deck', () => {
			const deckKey = 'singleDeckShuffled'
			const maxCardsExpected = maxCardCount

			cy.drawOneOverMaxCardsFromDeck(deckKey, maxCardsExpected)
		})

		it('Draw 55 cards with jokers from a shuffled deck', () => {
			const deckKey = 'singleDeckShuffledWithJokers'
			const maxCardsExpected = maxCardCountWithJokers

			cy.drawOneOverMaxCardsFromDeck(deckKey, maxCardsExpected)
		})

		it('Draw 105 cards from two shuffled decks', () => {
			const deckKey = 'doubleDeckShuffled'
			const maxCardsExpected = maxCardCount * 2

			cy.drawOneOverMaxCardsFromDeck(deckKey, maxCardsExpected)
		})

		it('Draw 109 cards from two shuffled decks with jokers', () => {
			const deckKey = 'doubleDeckShuffledWithJokers'
			const maxCardsExpected = maxCardCountWithJokers * 2

			cy.drawOneOverMaxCardsFromDeck(deckKey, maxCardsExpected)
		})
	})

	context('Drawing Cards from Piles', () => {
		it('Draw 1 card from a pile that has no cards in it from a single shuffled deck', () => {
			cy.todo('Test not implemented')
		})

		it('Draw 53 cards from a pile that only has 52 cards in it from a single shuffled deck', () => {
			cy.todo('Test not implemented')
		})

		it('Draw 55 cards from a pile that only has 54 cards in it from a single shuffled deck with jokers', () => {
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
