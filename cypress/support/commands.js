import DeckHandler from './deck_handler'

const currentDecksPosPath = 'deck_of_cards_api/current_decks_pos.json'

// Custom commands for the Deck of Cards API project.
Cypress.Commands.addAll({
	checkDecks(decksPath) {
		DeckHandler.checkDecks(decksPath)
	},
	drawCardFromDeck(deckKey, drawCount) {
		cy.fixture(currentDecksPosPath).then((decks) => {
			DeckHandler.drawCardFromDeck(decks[deckKey], drawCount)
		})
	},
	shuffleDeck() {},
	addCardsToPile() {},
	listCardsInPile() {},
	drawCardFromPile() {},
	shufflePile() {},
	returnCards() {}
})
