describe('Deck of Cards API Tests (Positive)', () => {
	const deckKeys = ['singleDeck', 'singleDeckWithJokers']
	const shuffledDeckKeys = [
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
		cy.drawCardFromDeck(deckKeys[0], maxCardCount)
		cy.verifyOrderedDeck()
	})

	it('Check each card is in order for an unshuffled deck with jokers', function () {
		cy.drawCardFromDeck(deckKeys[1], maxCardCountWithJokers)
		cy.verifyOrderedDeck()
	})

	it('Draw 1 card at a time from a shuffled deck until 10 cards are drawn', function () {
		cy.wrap([]).as('verifiedCardCodes')
		for (let i = 0; i < 10; i++) {
			cy.drawCardFromDeck(shuffledDeckKeys[0], 1)
			cy.verifyShuffledDeck()
		}
	})

	it('Draw 1 card at a time from a shuffled deck with jokers until 10 cards are drawn', function () {
		cy.wrap([]).as('verifiedCardCodes')
		for (let i = 0; i < 10; i++) {
			cy.drawCardFromDeck(shuffledDeckKeys[1], 1)
			cy.verifyShuffledDeck(1, maxCardCountWithJokers)
		}
	})

	it('Draw 2 card at a time from two shuffled decks until 20 cards are drawn', function () {
		cy.wrap([]).as('verifiedCardCodes')
		for (let i = 0; i < 20; i += 2) {
			cy.drawCardFromDeck(shuffledDeckKeys[2], 2)
			cy.verifyShuffledDeck(2, maxCardCount * 2)
		}
	})

	it('Draw 2 card at a time from a shuffled deck with jokers until 20 cards are drawn', function () {
		cy.wrap([]).as('verifiedCardCodes')
		for (let i = 0; i < 20; i += 2) {
			cy.drawCardFromDeck(shuffledDeckKeys[3], 2)
			cy.verifyShuffledDeck(2, maxCardCountWithJokers * 2)
		}
	})

	it('Draw all the cards at once from a shuffled deck', function () {
		cy.wrap([]).as('verifiedCardCodes')
		cy.drawCardFromDeck(shuffledDeckKeys[0], maxCardCount)
		cy.verifyShuffledDeck(1, maxCardCount)
	})

	it('Draw all the cards at once from a shuffled deck with jokers', function () {
		cy.wrap([]).as('verifiedCardCodes')
		cy.drawCardFromDeck(shuffledDeckKeys[1], maxCardCountWithJokers)
		cy.verifyShuffledDeck(1, maxCardCountWithJokers)
	})

	it('Draw all the cards at once from two shuffled deck', function () {
		cy.wrap([]).as('verifiedCardCodes')
		cy.drawCardFromDeck(shuffledDeckKeys[2], maxCardCount * 2)
		cy.verifyShuffledDeck(2, maxCardCount * 2)
	})

	it('Draw all the cards at once from two shuffled deck with jokers', function () {
		cy.wrap([]).as('verifiedCardCodes')
		cy.drawCardFromDeck(shuffledDeckKeys[3], maxCardCountWithJokers * 2)
		cy.verifyShuffledDeck(2, maxCardCountWithJokers * 2)
	})

	it.only('Reshuffle deck without the drawn cards after drawing no cards', function () {
		cy.reshuffleDeck(shuffledDeckKeys[0], 'true')
		cy.verifyRemainingCards()
	})

	it.only('Reshuffle deck that has jokers without the drawn cards after drawing no cards', function () {
		cy.reshuffleDeck(shuffledDeckKeys[1], 'true')
		cy.verifyRemainingCards(true)
	})

	it.only('Reshuffle deck without the drawn cards after drawing 1 card', function () {
		const cardsToDraw = 1
		cy.drawCardFromDeck(shuffledDeckKeys[0], cardsToDraw)
		cy.reshuffleDeck(shuffledDeckKeys[0], 'true')
		cy.verifyRemainingCards(false, cardsToDraw)
	})

	it.only('Reshuffle deck without the drawn cards after drawing half the card', function () {
		const cardsToDraw = maxCardCount / 2
		cy.drawCardFromDeck(shuffledDeckKeys[0], cardsToDraw)
		cy.reshuffleDeck(shuffledDeckKeys[0], 'true')
		cy.verifyRemainingCards(false, cardsToDraw)
	})

	it.only('Reshuffle two decks without the drawn cards after 1 card', function () {
		const cardsToDraw = 1
		cy.drawCardFromDeck(shuffledDeckKeys[2], cardsToDraw)
		cy.reshuffleDeck(shuffledDeckKeys[2], 'true')
		cy.verifyRemainingCards(false, cardsToDraw, 2)
	})

	it.only('Reshuffle two decks without the drawn cards after drawing half the cards', function () {
		const cardsToDraw = maxCardCount / 2
		cy.drawCardFromDeck(shuffledDeckKeys[2], cardsToDraw)
		cy.reshuffleDeck(shuffledDeckKeys[0], 'true')
		cy.verifyRemainingCards(false, cardsToDraw, 2)
	})
})
