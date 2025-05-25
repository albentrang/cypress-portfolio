describe('Deck of Cards API Tests (Positive)', () => {
	const deckKeys = [
		'singleDeck',
		'singleDeckWithJokers',
		'singleDeckShuffled',
		'singleDeckShuffledWithJokers',
		'doubleDeckShuffled',
		'doubleDeckShuffledWithJokers'
	]
	const decksPath = 'cypress/fixtures/deck_of_cards_api/current_decks_pos.json'
	const maxCardCount = 52
	const maxCardCountWithJokers = 54

	beforeEach(() => {
		cy.checkDecks(decksPath)
	})

	it('Check each card is in order for an unshuffled deck', function () {
		const deckKey = deckKeys[0]
		cy.drawCardFromDeck(deckKey, maxCardCount)
		cy.verifyOrderedDeck()
	})

	it('Check each card is in order for an unshuffled deck with jokers', function () {
		cy.drawCardFromDeck(deckKeys[1], maxCardCountWithJokers)
		cy.verifyOrderedDeck()
	})

	it('Draw 1 card at a time from a shuffled deck until 10 cards are drawn', function () {
		cy.wrap([]).as('verifiedCardCodes')
		for (let i = 0; i < 10; i++) {
			cy.drawCardFromDeck(deckKeys[2], 1)
			cy.verifyShuffledDeck()
		}
	})

	it('Draw 1 card at a time from a shuffled deck with jokers until 10 cards are drawn', function () {
		cy.wrap([]).as('verifiedCardCodes')
		for (let i = 0; i < 10; i++) {
			cy.drawCardFromDeck(deckKeys[3], 1)
			cy.verifyShuffledDeck(1, maxCardCountWithJokers)
		}
	})

	it('Draw 2 card at a time from two shuffled decks until 20 cards are drawn', function () {
		cy.wrap([]).as('verifiedCardCodes')
		for (let i = 0; i < 20; i += 2) {
			cy.drawCardFromDeck(deckKeys[4], 2)
			cy.verifyShuffledDeck(2, maxCardCount * 2)
		}
	})

	it('Draw 2 card at a time from a shuffled deck with jokers until 20 cards are drawn', function () {
		cy.wrap([]).as('verifiedCardCodes')
		for (let i = 0; i < 20; i += 2) {
			cy.drawCardFromDeck(deckKeys[5], 2)
			cy.verifyShuffledDeck(2, maxCardCountWithJokers * 2)
		}
	})

	it('Draw all the cards at once from a shuffled deck', function () {
		cy.wrap([]).as('verifiedCardCodes')
		cy.drawCardFromDeck(deckKeys[2], maxCardCount)
		cy.verifyShuffledDeck(1, maxCardCount)
	})

	it('Draw all the cards at once from a shuffled deck with jokers', function () {
		cy.wrap([]).as('verifiedCardCodes')
		cy.drawCardFromDeck(deckKeys[3], maxCardCountWithJokers)
		cy.verifyShuffledDeck(1, maxCardCountWithJokers)
	})

	it('Draw all the cards at once from two shuffled deck', function () {
		cy.wrap([]).as('verifiedCardCodes')
		cy.drawCardFromDeck(deckKeys[4], maxCardCount * 2)
		cy.verifyShuffledDeck(2, maxCardCount * 2)
	})

	it('Draw all the cards at once from two shuffled deck with jokers', function () {
		cy.wrap([]).as('verifiedCardCodes')
		cy.drawCardFromDeck(deckKeys[5], maxCardCountWithJokers * 2)
		cy.verifyShuffledDeck(2, maxCardCountWithJokers * 2)
	})
})
