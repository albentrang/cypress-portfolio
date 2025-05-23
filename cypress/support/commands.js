import DeckHandler from './deck_handler'

const decksPosFixturePath = 'deck_of_cards_api/current_decks_pos.json'
// const decksNegFixturePath = 'deck_of_cards_api/current_decks_neg.json'

// Custom commands for the Deck of Cards API project.
Cypress.Commands.addAll({
	// The command for the beforeEach() method for checking if decks are initialized
	checkDecks(decksPath) {
		DeckHandler.checkDecks(decksPath)
	},
	// Positive commands
	drawCardFromDeck(deckKey, drawCount) {
		cy.fixture(decksPosFixturePath).then((decks) => {
			DeckHandler.drawCardFromDeck(decks[deckKey].id, drawCount)
			cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
				cy.step('Initial verifications for drawing deck card successfully')
				cy.wrap(drawDeckResp.status).should('equal', 200)
				cy.wrap(drawDeckResp.statusText).should('equal', 'OK')
				cy.wrap(drawDeckResp.body.success).should('equal', true)
				cy.wrap(drawDeckResp.body.deck_id).should('equal', decks[deckKey].id)
			})
		})
	},
	reshuffleDeck(deckKey, remaining = ``) {
		cy.fixture(decksPosFixturePath).then((decks) => {
			DeckHandler.reshuffleDeck(decks[deckKey].id, remaining)
		})
	},
	addCardsToPile(deckKey, pileName, cards) {
		cy.fixture(decksPosFixturePath).then((decks) => {
			DeckHandler.addCardsToPile(decks[deckKey].id, pileName, cards)
		})
	},
	listCardsInPile(deckKey, pileName) {
		cy.fixture(decksPosFixturePath).then((decks) => {
			DeckHandler.listCardsInPile(decks[deckKey].id, pileName)
		})
	},
	drawCardFromPile(deckKey, pileName, drawMethod, cardsToGet) {
		cy.fixture(decksPosFixturePath).then((decks) => {
			DeckHandler.drawCardFromPile(
				decks[deckKey].id,
				pileName,
				drawMethod,
				cardsToGet
			)
		})
	},
	reshufflePile(deckKey, pileName) {
		cy.fixture(decksPosFixturePath).then((decks) => {
			DeckHandler.reshufflePile(decks[deckKey].id, pileName)
		})
	},
	returnCards(deckKey, cards, pileName) {
		cy.fixture(decksPosFixturePath).then((decks) => {
			DeckHandler.returnCards(decks[deckKey].id, cards, pileName)
		})
	},
	verifyOrderedDeck() {
		const orderedDeckPath = 'deck_of_cards_api/ordered_deck.json'

		cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
			cy.section('Verifications for ordered deck')
			cy.fixture(orderedDeckPath).then((orderedDeck) => {
				cy.wrap(drawDeckResp.body.cards).each((card, idx) => {
					cy.step(`Verifing card ${card.code} at index ${idx}`)
					cy.wrap(card.code).should('equal', orderedDeck[idx].code)
					cy.wrap(card.image).should('equal', orderedDeck[idx].image)
					cy.wrap(card.images.svg).should('equal', orderedDeck[idx].images.svg)
					cy.wrap(card.images.png).should('equal', orderedDeck[idx].images.png)
					cy.wrap(card.value).should('equal', orderedDeck[idx].value)
					cy.wrap(card.suit).should('equal', orderedDeck[idx].suit)
				})
				cy.step('Verify all cards are drawn')
				cy.wrap(drawDeckResp.body.remaining).should('equal', 0)
			})
		})
	},
	// Negative commands
	drawCardFromNoDeck() {
		DeckHandler.drawCardFromDeck('0', 1, true)
	}
})
