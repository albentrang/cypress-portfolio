import DeckHandler from './deck_handler'

const decksPosFixturePath = 'deck_of_cards_api/current_decks_pos.json'
// const decksNegFixturePath = 'deck_of_cards_api/current_decks_neg.json'

// Custom commands for the Deck of Cards API project.
Cypress.Commands.addAll({
	// The command for the beforeEach() method for checking if decks are initialized.
	/**
	 * Command to check if decks exist. Otherwise, create the decks
	 * defined in the given file.
	 * @param {string} decksPath Path from the project to the decks file.
	 */
	checkDecks(decksPath) {
		cy.section('Checking decks still exist or not')
		DeckHandler.checkDecks(decksPath)
	},
	// Positive commands
	/**
	 * Command to draw a card from a deck.
	 * @param {string} deckKey The key (deck name) defined from a decks file.
	 * @param {number} drawCount Number of cards to draw.
	 */
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
	/**
	 * Command to reshuffle a deck.
	 * @param {string} deckKey The key (deck name) defined from a decks file.
	 * @param {string} [remaining] Set this to true to shuffle cards only in
	 * main stack while ignoring any piles or drawn cards (optional).
	 */
	reshuffleDeck(deckKey, remaining = ``) {
		cy.fixture(decksPosFixturePath).then((decks) => {
			DeckHandler.reshuffleDeck(decks[deckKey].id, remaining)
			cy.get('@recentReshuffleDeckResp').then((reshuffleResp) => {
				cy.step('Initial verifications for reshuffling a deck successfully')
				cy.wrap(reshuffleResp.status).should('equal', 200)
				cy.wrap(reshuffleResp.statusText).should('equal', 'OK')
				cy.wrap(reshuffleResp.body.success).should('equal', true)
				cy.wrap(reshuffleResp.body.deck_id).should('equal', decks[deckKey].id)
				cy.wrap(reshuffleResp.body.shuffled).should('equal', true)
			})
		})
	},
	/**
	 * Command to add specific drawn cards to a pile from a deck.
	 * @param {string} deckKey The key (deck name) defined from a decks file.
	 * @param {string} pileName Name of the pile that's part of the given deck.
	 * @param {string} cards Cards specified as a string of comma-separated card codes.
	 */
	addCardsToPile(deckKey, pileName, cards) {
		cy.fixture(decksPosFixturePath).then((decks) => {
			DeckHandler.addCardsToPile(decks[deckKey].id, pileName, cards)
			cy.get('@recentAddPileResp').then((addPileResp) => {
				cy.step('Initial verifications for adding cards to a pile successfully')
				cy.wrap(addPileResp.status).should('equal', 200)
				cy.wrap(addPileResp.statusText).should('equal', 'OK')
				cy.wrap(addPileResp.body.success).should('equal', true)
				cy.wrap(addPileResp.body.deck_id).should('equal', decks[deckKey].id)
				cy.wrap(addPileResp.body.piles[pileName]).should(
					'have.key',
					'remaining'
				)
			})
		})
	},
	/**
	 * Command to reshuffled a pile from a deck.
	 * @param {string} deckKey The key (deck name) defined from a decks file.
	 * @param {string} pileName Name of the pile that's part of the given deck.
	 */
	reshufflePile(deckKey, pileName) {
		cy.fixture(decksPosFixturePath).then((decks) => {
			DeckHandler.reshufflePile(decks[deckKey].id, pileName)
			cy.get('@recentReshufflePileResp').then((reshufflePileResp) => {
				cy.step(
					'Initial verifications for shuffling cards in a pile successfully'
				)
				cy.wrap(reshufflePileResp.status).should('equal', 200)
				cy.wrap(reshufflePileResp.statusText).should('equal', 'OK')
				cy.wrap(reshufflePileResp.body.success).should('equal', true)
				cy.wrap(reshufflePileResp.body.deck_id).should(
					'equal',
					decks[deckKey].id
				)
				cy.wrap(reshufflePileResp.body.piles[pileName]).should(
					'have.key',
					'remaining'
				)
			})
		})
	},
	/**
	 * Command to list cards in a pile from a deck.
	 * @param {string} deckKey The key (deck name) defined from a decks file.
	 * @param {string} pileName Name of the pile that's part of the given deck.
	 */
	listCardsInPile(deckKey, pileName) {
		cy.fixture(decksPosFixturePath).then((decks) => {
			DeckHandler.listCardsInPile(decks[deckKey].id, pileName)
			cy.get('@recentListPileResp').then((listPileResp) => {
				cy.step(
					'Initial verifications for listing cards for a pile successfully'
				)
				cy.wrap(listPileResp.status).should('equal', 200)
				cy.wrap(listPileResp.statusText).should('equal', 'OK')
				cy.wrap(listPileResp.body.success).should('equal', true)
				cy.wrap(listPileResp.body.deck_id).should('equal', decks[deckKey].id)
				cy.wrap(listPileResp.body.piles).should('have.key', pileName)
			})
		})
	},
	/**
	 * Command to draw cards in a pile from a deck by using card codes or card count.
	 * @param {string} deckKey The key (deck name) defined from a decks file.
	 * @param {string} pileName Name of the pile that's part of the given deck.
	 * @param {string | number} cardsToGet Either get specific cards from a pile using
	 * a string of comma-separated card codes or some number of cards using a number.
	 * @param {string} [drawMethod] Set as either "bottom" to draw a card from the bottom
	 * of the pile or "random" to draw a random card from a pile (optional).
	 */
	drawCardFromPile(deckKey, pileName, cardsToGet, drawMethod = '') {
		cy.fixture(decksPosFixturePath).then((decks) => {
			DeckHandler.drawCardFromPile(
				decks[deckKey].id,
				pileName,
				cardsToGet,
				drawMethod
			)
			cy.get('@recentDrawPileResp').then((drawPileResp) => {
				cy.step(
					'Initial verifications for drawing cards from a pile successfully'
				)
				cy.wrap(drawPileResp.status).should('equal', 200)
				cy.wrap(drawPileResp.statusText).should('equal', 'OK')
				cy.wrap(drawPileResp.body.success).should('equal', true)
				cy.wrap(drawPileResp.body.deck_id).should('equal', decks[deckKey].id)
				cy.wrap(drawPileResp.body.piles[pileName]).should(
					'have.key',
					'remaining'
				)
			})
		})
	},
	/**
	 * Command to return the cards that are either drawn or in a pile back to the deck.
	 * @param {string} deckKey The key (deck name) defined from a decks file.
	 * @param {string} [cards] The cards to be put in the pile as a
	 * comma-separated string of card codes (optional).
	 * @param {string} [pileName] Name of the pile that's part of the given deck (optional).
	 */
	returnCards(deckKey, cards = '', pileName = '') {
		cy.fixture(decksPosFixturePath).then((decks) => {
			DeckHandler.returnCards(decks[deckKey].id, cards, pileName)
			cy.get('@recentReturnCardsResp').then((returnCardsResp) => {
				cy.step('Initial verifications for returning cards successfully')
				cy.wrap(returnCardsResp.status).should('equal', 200)
				cy.wrap(returnCardsResp.statusText).should('equal', 'OK')
				cy.wrap(returnCardsResp.body.success).should('equal', true)
				cy.wrap(returnCardsResp.body.deck_id).should('equal', decks[deckKey].id)
			})
		})
	},
	/**
	 * Command to check an ordered deck.
	 */
	verifyOrderedDeck() {
		const orderedDeckPath = 'deck_of_cards_api/ordered_deck.json'

		cy.section('Verifications for ordered deck')
		cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
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
	/**
	 * Command to verify each unique card is less than or equal to the number
	 * of decks from the entire deck.
	 * @param {number} [deckCount=1] The number of decks in the entire given deck.
	 * @param {number} [maxCardsExpected=52] The total number of cards from the given deck.
	 */
	verifyCardsDrawn(deckCount = 1, maxCardsExpected = 52) {
		cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
			cy.section(`Verifications for drawing shuffled deck cards`)
			cy.get('@verifiedCardCodes').then((knownCardCodes) => {
				for (const card of drawDeckResp.body.cards) {
					knownCardCodes.push(card.code)
				}
				cy.wrap(drawDeckResp.body.cards).each((card) => {
					let numOfCurrentCard = 0
					for (const knownCode of knownCardCodes) {
						if (knownCode === card.code) {
							numOfCurrentCard += 1
						}
					}

					cy.step(`Verifying ${deckCount} of ${card.code} cards`)
					cy.wrap(numOfCurrentCard).should('be.lte', deckCount)
					cy.step('Verify remaining cards')
				})
				cy.wrap(drawDeckResp.body.remaining).should(
					'equal',
					maxCardsExpected - knownCardCodes.length
				)
				cy.wrap(knownCardCodes).as('verifiedCardCodes')
			})
		})
	},
	/**
	 * Command to verify that reshuffling the main stack of the deck and drawing
	 * no cards should have the deck at its full number of cards.
	 * @param {boolean} [jokers] Set this to true if joker cards are in the deck.
	 * @param {number} [drawCount] The number of cards that have been drawn at once.
	 */
	verifyReshuffleRemainingNoDrawnCards(jokers = false, deckCount = 1) {
		cy.section(
			`Verifications for reshuffling the main stack only that has ${deckCount} deck(s) only`
		)
		cy.get('@recentReshuffleDeckResp').then((reshuffleResp) => {
			if (jokers === true) {
				cy.step(
					`Verify reshuffle main stack that has jokers with no cards drawn`
				)
				cy.wrap(reshuffleResp.body.remaining).should(
					'equal',
					DeckHandler.maxCardCountWithJokers * deckCount
				)
			} else {
				cy.step(`Verify reshuffle main stack with no cards drawn`)
				cy.wrap(reshuffleResp.body.remaining).should(
					'equal',
					DeckHandler.maxCardCount * deckCount
				)
			}
		})
	},
	/**
	 * Command to verify that reshuffling the main stack of the deck and drawing
	 * all cards should have no cards in the main stack.
	 * @param {boolean} [jokers] Set this to true if joker cards are in the deck.
	 * @param {number} [drawCount] The number of cards that have been drawn at once.
	 */
	verifyReshuffleRemainingAllDrawnCards(jokers = false, deckCount = 1) {
		cy.section(
			`Verifications for reshuffling the main stack only that has ${deckCount} deck(s) only`
		)
		cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
			if (jokers === true) {
				cy.step(
					'Verify reshuffle main stack that has jokers with max number of cards drawn'
				)
				cy.wrap(drawDeckResp.body.cards).should(
					'have.length',
					DeckHandler.maxCardCountWithJokers * deckCount
				)
			} else {
				cy.step('Verify reshuffle main stack with max number of cards drawn')
				cy.wrap(drawDeckResp.body.cards).should(
					'have.length',
					DeckHandler.maxCardCount * deckCount
				)
			}
			cy.step('Verify draw card response shows remaining cards as 0')
			cy.wrap(drawDeckResp.body.remaining).should('equal', 0)
			cy.get('@recentReshuffleDeckResp').then((reshuffleResp) => {
				cy.step('Verify main stack has no cards left')
				cy.wrap(reshuffleResp.body.remaining).should('equal', 0)
			})
		})
	},
	/**
	 * Command to verify that reshuffling a deck without the drawn cards should
	 * not have those cards in the main stack.
	 * @param {string} deckKey The key (deck name) defined from a decks file.
	 */
	verifyRemainingCards(deckKey) {
		cy.section(`Verifications for reshuffling the deck without drawn cards`)
		cy.get('@recentReshuffleDeckResp').then((reshuffleResp) => {
			const cardsToDrawFromMain = reshuffleResp.body.remaining
			cy.get('@recentDrawDeckResp').then((initialDrawDeckResp) => {
				cy.drawCardFromDeck(deckKey, cardsToDrawFromMain)
				cy.get('@recentDrawDeckResp').then((remainingDrawDeckResp) => {
					cy.wrap(remainingDrawDeckResp.body.cards).should(
						'not.have.all.deep.keys',
						initialDrawDeckResp.body.cards
					)
				})
			})
		})
	},
	/**
	 * Command to check a partial deck has the cards set from.
	 * @param {string[]} cardsExpected The array of card codes expected.
	 */
	verifyPartialDeck(cardsExpected) {
		cy.section('Verifications for partial deck')

		cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
			cy.wrap(drawDeckResp.body.cards).each((card, idx) => {
				cy.step(`Verifing card ${card.code} at index ${idx}`)
				cy.wrap(card.code).should('equal', cardsExpected[idx])
			})
			cy.step('Verify all cards are drawn')
			cy.wrap(drawDeckResp.body.remaining).should('equal', 0)
		})
	},
	/**
	 * Command to check a pile has the expected remaining cards in it
	 * after adding cards to the pile.
	 * @param {string} pileName The name of the pile being checked.
	 * @param {number} pileRemainingExpected The expected number of
	 * remaining cards in the given pile.
	 */
	verifyAddToPile(pileName, pileRemainingExpected) {
		cy.section('Verifications for adding cards to a pile')
		cy.get('@recentAddPileResp').then((addPileResp) => {
			cy.step(`Check remaining cards in pile ${pileName}`)
			cy.wrap(addPileResp.body.piles[pileName].remaining).should(
				'equal',
				pileRemainingExpected
			)
		})
	},
	/**
	 * Command to check a pile has the expected remaining cards in it
	 * after shuffling cards in the pile.
	 * @param {string} pileName The name of the pile being checked.
	 * @param {number} pileRemainingExpected The expected number of
	 * remaining cards in the given pile.
	 */
	verifyShufflePile(pileName, pileRemainingExpected) {
		cy.section('Verifications for shuffling cards in a pile')
		cy.get('@recentReshufflePileResp').then((shufflePileResp) => {
			cy.step(`Check remaining cards in pile ${pileName}`)
			cy.wrap(shufflePileResp.body.piles[pileName].remaining).should(
				'equal',
				pileRemainingExpected
			)
		})
	},
	/**
	 * Command to check a pile that has listed all of its cards while also
	 * checking all piles associated with the deck and their remaining cards.
	 * Note: assume all the cards drawn from the main deck have been added
	 * all at once to the pile to be listed.
	 * @param {string} pileToList The pile that has listed its cards.
	 * @param {Object[]} allPilesExpected All of the piles and their remaining
	 * cards associated with the deck being used.
	 */
	verifyListingPile(pileToList, allPilesExpected) {
		cy.section('Verifications for listing cards in a pile')
		cy.get('@recentListPileResp').then((listPileResp) => {
			cy.step(`Check listed cards in pile ${pileToList}`)
			cy.get('@recentDrawDeckResp').then((drawResp) => {
				cy.wrap(listPileResp.body.piles[pileToList].cards).each(
					(card, index) => {
						cy.wrap(card.code).should('equal', drawResp.body.cards[index].code)
					}
				)
				cy.step('Check remaining cards in each pile of the current deck')
				cy.wrap(allPilesExpected).each((pileExpected) => {
					cy.wrap(listPileResp.body.piles[pileExpected.name].remaining).should(
						'equal',
						pileExpected.remaining
					)
				})
			})
		})
	},
	/**
	 * Command to check a pile and the drawn cards. If the cards drawn
	 * used a string of comma-separated card codes, then it will check
	 * for the same cards drawn from the pile. If a number of cards
	 * were drawn, then it will check for the number of cards drawn
	 * and the remaining number of cards in the pile.
	 * @param {string} pileName The pile that had its cards drawn.
	 * @param {string | number} cardsDrawn Either a string of comman-
	 * separated card codes or the number of cards drawn from the given
	 * pile.
	 */
	verifyDrawFromPile(pileName, cardsDrawn) {
		cy.section('Verifications for drawing cards from a pile')
		cy.get('@recentDrawPileResp').then((drawPileResp) => {
			switch (typeof cardsDrawn) {
				case 'string': {
					const cardCodesArray = cardsDrawn.split(',')
					cy.wrap(drawPileResp.body.cards).each((card, index) => {
						cy.wrap(card.code).should('equal', cardCodesArray[index])
					})
					break
				}
				case 'number': {
					// There needed to have been cards to draw from the pile in the first place.
					cy.get('@recentAddPileResp').then((addPileResp) => {
						/* Check that the remaining cards in the pile is at least 0 and equal 
						to the remaining cards of the pile from the last request to add
						cards to the pile minus the cards drawn from the pile. */
						cy.wrap(drawPileResp.body.piles[pileName].remaining)
							.should('be.greaterThan', -1)
							.and(
								'equal',
								addPileResp.body.piles[pileName].remaining - cardsDrawn
							)
					})
					break
				}
				default: {
					throw new TypeError(
						`The 'cardsDrawn' variable ${cardsDrawn} is not a string or number.`
					)
				}
			}
		})
	},
	/**
	 * Command to check that the returned cards are put back to the deck
	 * based on the remaining number of cards in it and in the same order.
	 * Optionally, it can also check the remaining cards of a pile after
	 * it had its cards returned to the deck.
	 * @param {number} deckRemainingExpected The remaining number of cards expected
	 * after returning cards to the deck.
	 * @param {string} [pileName] The name of the pile that had its cards returned
	 * to the deck (optional).
	 * @param {number} [pileRemainingExpected = 0] The expected remaining number of
	 * cards in the pile after returning cards to the deck (optional).
	 * @param {string} [cardsReturned] The cards that were returned to the deck
	 * as a comma-separated string of card codes (optional).
	 * @param {string} [deckId] The ID of the deck that had its cards returned
	 * to it (optional).
	 */
	verifyReturnCards(
		deckRemainingExpected,
		pileName = '',
		pileRemainingExpected = 0,
		cardsReturned = '',
		deckId = ''
	) {
		cy.section('Verifications for returning cards')
		cy.get('@recentReturnCardsResp').then((returnCardsResp) => {
			if (pileName) {
				if (cardsReturned && deckId) {
					const cardsReturnedArray = cardsReturned.split(',')

					cy.step(`Check specified cards returned from pile ${pileName}`)
					cy.listCardsInPile(deckId, pileName)
					cy.get('@recentListPileResp').then((listPileResp) => {
						cy.wrap(listPileResp.body.piles[pileName].cards).each((card) => {
							cy.wrap(cardsReturnedArray).should('not.include', card.code)
						})
					})
				}

				cy.step(`Check remaining cards in pile ${pileName}`)
				cy.wrap(returnCardsResp.body.piles[pileName].remaining).should(
					'equal',
					pileRemainingExpected
				)
			}

			cy.step('Check remaining cards in the deck')
			cy.wrap(returnCardsResp.body.remaining).should(
				'equal',
				deckRemainingExpected
			)
		})
	},
	// Negative commands
	/**
	 * Command to verify error handling for drawing a card
	 * from a deck that does not exist.
	 */
	drawCardFromNoDeck() {
		DeckHandler.drawCardFromDeck('0', 1)
	}
})
