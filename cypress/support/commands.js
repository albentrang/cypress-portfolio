import DeckHandler from './deck_handler'
import CalculatorPage from './custom_website/page_objects/calculator_obj'
import TextToFilePage from './custom_website/page_objects/text_to_file_obj'

const decksPosFixturePath = 'deck_of_cards_api/current_decks_pos.json'
const decksNegFixturePath = 'deck_of_cards_api/current_decks_neg.json'
const cyDownloadsFolder = Cypress.config('downloadsFolder')

// General custom commands for different projects.
/**
 * Get an element using its data-cy attribute.
 * @param {string} cyVal The value of the data-cy attribute.
 */
Cypress.Commands.add('getByCy', (cyVal, args = {}) => {
	return cy.get(`[data-cy="${cyVal}"]`, args)
})

// Custom commands for the Deck of Cards API project.
Cypress.Commands.addAll({
	// The command for the beforeEach() method for checking if decks are initialized.
	/**
	 * Command to check if decks exist. Otherwise, create the decks
	 * defined in the given file.
	 * @param {string} decksPath Path from the project to the decks file.
	 */
	checkDecks(decksPath) {
		cy.section('Checking decks if they exist or not')
		cy.readFile(decksPath).then((decksJson) => {
			/* Utilize arrays instead of objects because it's easier for Cypress to handle.
			 * Each deck array has the name of the original object as deck[0], and
			 * the actual object is deck[1].
			 */
			cy.wrap(Object.entries(decksJson)).each((deck) => {
				const deckName = deck[0]
				const deckObj = deck[1]
				const checkDeckApiOptions = {
					url: `api/deck/${deckObj.id}/`,
					failOnStatusCode: false
				}

				// Use an API call to check if the deck exists.
				cy.api(checkDeckApiOptions).then((checkResp) => {
					if (checkResp.body.success) {
						let expectedRemaining
						let apiUrl = `api/deck/${deckObj.id}/`
						let cyStepText = ``

						if (deckObj.cards) {
							expectedRemaining = deckObj.cards.split(',').length
						} else if (deckObj.jokersEnabled) {
							expectedRemaining = DeckHandler.maxCardCountWithJokers
						} else {
							expectedRemaining = DeckHandler.maxCardCount
						}

						if (deckObj.shuffled) {
							if (deckObj.deckCount) {
								expectedRemaining *= deckObj.deckCount
							}
							apiUrl += `shuffle/`
							cyStepText = `Shuffle deck of cards`
						} else {
							apiUrl += `return/`
							cyStepText = `Return drawn cards to deck`
						}

						// Shuffle or return to set the decks to their original stacks.
						cy.step(cyStepText)
						cy.api(apiUrl).then((initializeDeckResp) => {
							const actualRemaining = initializeDeckResp.body.remaining

							cy.step(`Verify deck ${deckObj.id} is at a full stack`)
							cy.wrap(actualRemaining).should('equal', expectedRemaining)
						})
					} else {
						DeckHandler.createNewDeck(deckObj)

						// Update the deck ID for the specified object in the fixture file.
						cy.get('@newDeckResp').then((newDeckResp) => {
							let objCopy = {}
							deckObj.id = newDeckResp.body.deck_id
							Object.defineProperty(objCopy, `${deckName}`, {
								value: { ...deckObj }
							})
							cy.writeFile(decksPath, Object.assign(decksJson, objCopy))
						})
					}
				})
			})
		})
	},
	// Positive testing commands
	/**
	 * Command to draw a card from a deck.
	 * @param {string} deckKey The key (deck name) defined from a decks file.
	 * @param {number} drawCount Number of cards to draw.
	 */
	drawCardsFromDeck(deckKey, drawCount) {
		cy.fixture(decksPosFixturePath).then((decks) => {
			DeckHandler.drawCardsFromDeck(decks[deckKey].id, drawCount)

			cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
				cy.step('Initial verifications for drawing deck card successfully')
				cy.commonApiVerifications(drawDeckResp, decks[deckKey].id)
			})
		})
	},
	/**
	 * Command to shuffle a deck.
	 * @param {string} deckKey The key (deck name) defined from a decks file.
	 * @param {string} [remaining] Set this to true to shuffle cards only in
	 * main stack while ignoring any piles or drawn cards (optional).
	 */
	shuffleDeck(deckKey, remaining = ``) {
		cy.fixture(decksPosFixturePath).then((decks) => {
			DeckHandler.shuffleDeck(decks[deckKey].id, remaining)

			cy.get('@recentShuffleDeckResp').then((shuffleResp) => {
				cy.commonApiVerifications(shuffleResp, decks[deckKey].id)
				cy.wrap(shuffleResp.body.shuffled).should('equal', true)
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
				const pileActual = addPileResp.body.piles[pileName]

				cy.step('Initial verifications for adding cards to a pile successfully')
				cy.commonApiVerifications(addPileResp, decks[deckKey].id)
				cy.wrap(pileActual).should('have.key', 'remaining')
			})
		})
	},
	/**
	 * Command to shuffle a pile from a deck.
	 * @param {string} deckKey The key (deck name) defined from a decks file.
	 * @param {string} pileName Name of the pile that's part of the given deck.
	 */
	shufflePile(deckKey, pileName) {
		cy.fixture(decksPosFixturePath).then((decks) => {
			DeckHandler.shufflePile(decks[deckKey].id, pileName)

			cy.get('@recentShufflePileResp').then((shufflePileResp) => {
				const pileActual = shufflePileResp.body.piles[pileName]

				cy.step('Initial verifications for shuffling pile cards successfully')
				cy.commonApiVerifications(shufflePileResp, decks[deckKey].id)
				cy.wrap(pileActual).should('have.key', 'remaining')
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
				cy.step('Initial verifications for listing pile cards successfully')
				cy.commonApiVerifications(listPileResp, decks[deckKey].id)
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
	 * @param {string} [drawAct] Set as either "bottom" to draw a card from the bottom
	 * of the pile or "random" to draw a random card from a pile (optional).
	 */
	drawCardsFromPile(deckKey, pileName, cardsToGet, drawAct = '') {
		cy.fixture(decksPosFixturePath).then((decks) => {
			const deckId = decks[deckKey].id

			DeckHandler.drawCardsFromPile(deckId, pileName, cardsToGet, drawAct)

			cy.get('@recentDrawPileResp').then((drawPileResp) => {
				const pileActual = drawPileResp.body.piles[pileName]

				cy.step('Initial verifications for drawing pile cards successfully')
				cy.commonApiVerifications(drawPileResp, decks[deckKey].id)
				cy.wrap(pileActual).should('have.key', 'remaining')
			})
		})
	},
	/**
	 * Command to return the cards that are drawn back to the deck.
	 * @param {string} deckKey The key (deck name) defined from a decks file.
	 * @param {string} [cards] The cards to be put in the pile as a
	 * comma-separated string of card codes (optional).
	 */
	returnDrawnCards(deckKey, cards = '') {
		cy.fixture(decksPosFixturePath).then((decks) => {
			DeckHandler.returnDrawnCards(decks[deckKey].id, cards)

			cy.get('@recentReturnCardsResp').then((returnCardsResp) => {
				cy.step('Initial verifications for returning drawn cards successfully')
				cy.commonApiVerifications(returnCardsResp, decks[deckKey].id)
			})
		})
	},
	/**
	 * Command to return the cards that are in a pile back to the deck.
	 * @param {string} deckKey The key (deck name) defined from a decks file.
	 * @param {string} pileName Name of the pile that's part of the given deck.
	 * @param {string} [cards] The cards to be put in the pile as a
	 * comma-separated string of card codes (optional).
	 */
	returnPileCards(deckKey, pileName, cards = '') {
		cy.fixture(decksPosFixturePath).then((decks) => {
			DeckHandler.returnPileCards(decks[deckKey].id, pileName, cards)

			cy.get('@recentReturnCardsResp').then((returnCardsResp) => {
				cy.step('Initial verifications for returning cards successfully')
				cy.commonApiVerifications(returnCardsResp, decks[deckKey].id)
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
	 * Command to both draw cards from a deck and verify each unique card is less than or equal to the number
	 * of decks from the entire deck. If the tests are meant to check the function to draw cards from a deck,
	 * use this command by itself.
	 * @param {string} deckKey The key (deck name) defined from a decks file.
	 * @param {number} cardsPerDraw The number of cards to draw each time.
	 * @param {number} totalDraws: The number of times to draw cards from the deck.
	 */
	verifyAfterDrawCardsFromDeck(deckKey, cardsPerDraw, totalDraws) {
		// Set up the alias for the cards that will be verified.
		cy.wrap([]).as('verifiedCardCodes')

		cy.fixture(decksPosFixturePath).then((decks) => {
			let deckCount
			let deckTypeMaxCards
			let maxCardsExpected

			if (typeof decks[deckKey].deckCount === 'number') {
				deckCount = decks[deckKey].deckCount
			} else {
				deckCount = 1
			}

			if (decks[deckKey].jokersEnabled === true) {
				deckTypeMaxCards = 54
			} else {
				deckTypeMaxCards = 52
			}

			maxCardsExpected = deckTypeMaxCards * deckCount

			for (let i = 0; i < totalDraws; i++) {
				cy.drawCardsFromDeck(deckKey, cardsPerDraw)

				cy.section(`Verifications for drawing shuffled deck cards`)
				cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
					cy.get('@verifiedCardCodes').then((knownCardCodes) => {
						for (const card of drawDeckResp.body.cards) {
							knownCardCodes.push(card.code)
						}

						const remainingActual = drawDeckResp.body.remaining
						const remainingExpected = maxCardsExpected - knownCardCodes.length

						cy.wrap(drawDeckResp.body.cards).each((card) => {
							let numOfCurrentCard = 0
							for (const knownCode of knownCardCodes) {
								if (knownCode === card.code) {
									numOfCurrentCard += 1
								}
							}

							cy.step(`Verifying at most ${deckCount} of ${card.code} cards`)
							cy.wrap(numOfCurrentCard).should('be.lte', deckCount)
						})

						cy.step('Verify remaining cards')
						cy.wrap(remainingActual).should('equal', remainingExpected)
						cy.wrap(knownCardCodes).as('verifiedCardCodes')
					})
				})
			}
		})
	},
	/**
	 * Command to verify that shuffling the main stack of the deck after drawing
	 * no cards should have the deck at its full number of cards.
	 * @param {boolean} [jokers] Set this to true if joker cards are in the deck.
	 * @param {number} [drawCount] The number of cards that have been drawn at once.
	 */
	verifyShuffleRemainingAfterDrawingNoCards(jokers = false, deckCount = 1) {
		cy.section(`Verify shuffling main stack with ${deckCount} deck(s)`)
		cy.get('@recentShuffleDeckResp').then((shuffleResp) => {
			const remainingActual = shuffleResp.body.remaining
			let remainingExpected

			if (jokers === true) {
				remainingExpected = DeckHandler.maxCardCountWithJokers * deckCount

				cy.step(`Verify shuffle main stack that has jokers with no cards drawn`)
				cy.wrap(remainingActual).should('equal', remainingExpected)
			} else {
				remainingExpected = DeckHandler.maxCardCount * deckCount

				cy.step(`Verify shuffle main stack with no cards drawn`)
				cy.wrap(remainingActual).should('equal', remainingExpected)
			}
		})
	},
	/**
	 * Command to verify that shuffling the main stack of the deck after drawing
	 * all the cards should have no cards in the main stack.
	 * @param {boolean} [jokers] Set this to true if joker cards are in the deck.
	 * @param {number} [drawCount] The number of cards that have been drawn at once.
	 */
	verifyShuffleRemainingAfterDrawingAllCards(jokers = false, deckCount = 1) {
		cy.section(`Verify shuffling main stack with ${deckCount} deck(s)`)
		cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
			let cardsExpected

			if (jokers === true) {
				cardsExpected = DeckHandler.maxCardCountWithJokers * deckCount

				cy.step('Verify shuffle main stack with jokers with max cards drawn')
				cy.wrap(drawDeckResp.body.cards).should('have.length', cardsExpected)
			} else {
				cardsExpected = DeckHandler.maxCardCount * deckCount

				cy.step('Verify shuffle main stack with max cards drawn')
				cy.wrap(drawDeckResp.body.cards).should('have.length', cardsExpected)
			}

			cy.step('Verify draw card response shows remaining cards as 0')
			cy.wrap(drawDeckResp.body.remaining).should('equal', 0)
			cy.get('@recentShuffleDeckResp').then((shuffleResp) => {
				cy.step('Verify main stack has no cards left')
				cy.wrap(shuffleResp.body.remaining).should('equal', 0)
			})
		})
	},
	/**
	 * Command to verify that shuffling a deck without the drawn cards should
	 * not have those cards in the main stack.
	 * @param {string} deckKey The key (deck name) defined from a decks file.
	 */
	verifyShuffleRemaining(deckKey) {
		cy.section(`Verifications for shuffling the deck without drawn cards`)
		cy.get('@recentShuffleDeckResp').then((shuffleResp) => {
			const cardsToDrawFromMain = shuffleResp.body.remaining

			cy.get('@recentDrawDeckResp').then((initialDrawDeckResp) => {
				cy.drawCardsFromDeck(deckKey, cardsToDrawFromMain)
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
			const pileRemainingActual = addPileResp.body.piles[pileName].remaining

			cy.step(`Check remaining cards in pile ${pileName}`)
			cy.wrap(pileRemainingActual).should('equal', pileRemainingExpected)
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
		cy.get('@recentShufflePileResp').then((shufflePileResp) => {
			const pileRemainingActual = shufflePileResp.body.piles[pileName].remaining

			cy.step(`Check remaining cards in pile ${pileName}`)
			cy.wrap(pileRemainingActual).should('equal', pileRemainingExpected)
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
				cy.wrap(listPileResp.body.piles[pileToList].cards).each((card, idx) => {
					cy.wrap(card.code).should('equal', drawResp.body.cards[idx].code)
				})
				cy.step('Check remaining cards in each pile of the current deck')
				cy.wrap(allPilesExpected).each((pileExpected) => {
					const remaining = listPileResp.body.piles[pileExpected.name].remaining

					cy.wrap(remaining).should('equal', pileExpected.remaining)
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
	 * Command to check that the returned drawn cards are put back to the deck
	 * based on the remaining number of cards in the deck.
	 * @param {number} deckRemainingExpected The remaining number of cards expected
	 * after returning cards to the deck.
	 */
	verifyReturnDrawnCards(deckRemainingExpected) {
		cy.section('Verifications for returning drawn cards')
		cy.get('@recentReturnCardsResp').then((returnCardsResp) => {
			const deckRemaining = returnCardsResp.body.remaining

			cy.step('Check remaining cards in the deck')
			cy.wrap(deckRemaining).should('equal', deckRemainingExpected)
		})
	},
	/**
	 * Command to check that the returned pile cards are put back to the deck.
	 * It checks the remaining cards in the pile.
	 * @param {string} pileName The name of the pile that had its cards returned
	 * to the deck.
	 * @param {number} [pileRemainingExpected = 0]  The expected remaining number of
	 * cards in the pile after returning cards to the deck (optional).
	 */
	verifyReturnPileCards(pileName, pileRemainingExpected = 0) {
		cy.section('Verifications for returning pile cards')
		cy.get('@recentReturnCardsResp').then((returnCardsResp) => {
			const pileRemainingActual = returnCardsResp.body.piles[pileName].remaining

			cy.step(`Check remaining cards in pile ${pileName}`)
			cy.wrap(pileRemainingActual).should('equal', pileRemainingExpected)
		})
	},
	/**
	 * Command to check that the returned pile cards are put back to the deck.
	 * It checks the card codes that have been returned to the deck are not
	 * in the pile anymore.
	 * @param {string} deckKey The key (deck name) of the deck that had its cards
	 * returned to it.
	 * @param {string} pileName The name of the pile that had its cards returned
	 * to the deck.
	 * @param {string} cardsReturned The cards that were returned to the deck
	 * as a comma-separated string of card codes.
	 */
	verifyReturnPileCardCodes(deckKey, pileName, cardsReturned) {
		// List the current pile's cards first to see its current cards.
		cy.listCardsInPile(deckKey, pileName)
		cy.section('Verifications for returning pile cards by card codes')
		cy.get('@recentListPileResp').then((listPileResp) => {
			const cardsReturnedArray = cardsReturned.split(',')

			cy.step(`Check specified cards returned from pile ${pileName}`)
			cy.wrap(listPileResp.body.piles[pileName].cards).each((card) => {
				cy.wrap(cardsReturnedArray).should('not.include', card.code)
			})
		})
	},
	/**
	 * Helper command to create a string of card codes from an array of cards.
	 * This command will also create a string of card codes for the second half.
	 * @param {Array} cardsArray The array of card objects from either an API response
	 * from drawing cards from a deck or pile.
	 * @param {number} lengthOfCardsNeeded The length (number) of cards needed for the test.
	 */
	createCardCodeStrings(cardsArray, lengthOfCardsNeeded) {
		let allCardCodes = ''
		let secondCardCodesHalf = ''

		for (let idx = 0; idx < lengthOfCardsNeeded; idx++) {
			allCardCodes += cardsArray[idx].code

			// Add a comma after each card code except for the last one.
			if (idx < lengthOfCardsNeeded - 1) {
				allCardCodes += `,`
			}

			// Add the second half of the cards to a separate string.
			if (idx >= lengthOfCardsNeeded / 2 && idx < lengthOfCardsNeeded) {
				secondCardCodesHalf += cardsArray[idx].code

				// Add a comma after each card code except for the last one.
				if (idx < lengthOfCardsNeeded - 1) {
					secondCardCodesHalf += `,`
				}
			}
		}

		// Wrap the strings of card codes as aliases.
		cy.wrap(allCardCodes).as('allCardCodes')
		cy.wrap(secondCardCodesHalf).as('secondCardCodesHalf')
	},
	/**
	 * Helper command to verify common Deck of Cards API response body key value pairs.
	 * @param {Object} response The response with these common key value pairs:
	 * status: 200, statusText: "OK", body.success: true, and body.deck_id: deckId.
	 * @param {string} deckId The used deck's ID.
	 */
	commonApiVerifications(response, deckId) {
		cy.wrap(response.status).should('equal', 200)
		cy.wrap(response.statusText).should('equal', 'OK')
		cy.wrap(response.body.success).should('equal', true)
		cy.wrap(response.body.deck_id).should('equal', deckId)
	},
	// Negative testing commands
	/**
	 * Command to verify error handling for trying to make a new deck
	 * with a deck count at 0 or less.
	 * @param {object} deckObj An object with these key value pairs:
	 * deckCount: [number of decks that's 0 or less],
	 * shuffled: [boolean to have the new deck shuffled or not],
	 * jokersEnabled: [boolean to have jokers in the deck or not]
	 */
	createInvalidDeck(deckObj) {
		const errorExpected = 'The min number of Decks is 1.'

		DeckHandler.createNewDeck(deckObj, true)

		cy.section('Verify error handling for creating invalid deck')
		cy.get('@newDeckResp').then((newDeckResp) => {
			cy.wrap(newDeckResp.status).should('equal', 200)
			cy.wrap(newDeckResp.statusText).should('equal', 'OK')
			cy.wrap(newDeckResp.body.success).should('equal', false)
			cy.wrap(newDeckResp.body.error).should('equal', errorExpected)
		})
	},
	/**
	 * Command to verify error handling for drawing a card
	 * from a deck that does not exist.
	 */
	drawCardsFromNoDeck() {
		const errorExpected = 'Deck ID does not exist.'
		const deckKey = '0'
		const drawCount = 1

		DeckHandler.drawCardsFromDeck(deckKey, drawCount, true)

		cy.section('Verify error handling for drawing card from no deck')
		cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
			cy.commonNegativeApiVerifications(drawDeckResp, errorExpected)
		})
	},
	/**
	 * Command to verify error handling for drawing zero deck cards.
	 * @param {string} deckKey The valid key (deck name) defined from a decks file.
	 * @param {number} maxCardsExpected The max cards expected in a deck.
	 */
	drawZeroCardsFromDeck(deckKey, maxCardsExpected) {
		const cardsToDraw = 0

		cy.fixture(decksNegFixturePath).then((decks) => {
			DeckHandler.drawCardsFromDeck(decks[deckKey].id, cardsToDraw, true)

			cy.section('Verify error handling for drawing 0 deck cards')
			cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
				cy.wrap(drawDeckResp.status).should('equal', 200)
				cy.wrap(drawDeckResp.statusText).should('equal', 'OK')
				cy.wrap(drawDeckResp.body.success).should('equal', true)
				cy.wrap(drawDeckResp.body.deck_id).should('equal', decks[deckKey].id)
				cy.wrap(drawDeckResp.body.cards).should('have.length', 0)
				cy.wrap(drawDeckResp.body.remaining).should('equal', maxCardsExpected)
			})
		})
	},
	/**
	 * Command to verify error handling for drawing one-over-max deck cards.
	 * @param {string} deckKey The valid key (deck name) defined from a decks file.
	 * @param {number} maxCardsExpected The max cards expected in a deck.
	 * This method will handle adding 1 extra card to draw.
	 */
	drawOneOverMaxFromDeck(deckKey, maxCardsExpected) {
		const cardsToDraw = maxCardsExpected + 1
		const errorExpected = `Not enough cards remaining to draw ${cardsToDraw} additional`

		cy.fixture(decksNegFixturePath).then((decks) => {
			DeckHandler.drawCardsFromDeck(decks[deckKey].id, cardsToDraw, true)

			cy.section('Verify error handling for drawing one-over-max deck cards')
			cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
				cy.wrap(drawDeckResp.status).should('equal', 200)
				cy.wrap(drawDeckResp.statusText).should('equal', 'OK')
				cy.wrap(drawDeckResp.body.success).should('equal', false)
				cy.wrap(drawDeckResp.body.deck_id).should('equal', decks[deckKey].id)
				cy.wrap(drawDeckResp.body.remaining).should('equal', 0)
				cy.wrap(drawDeckResp.body.error).should('equal', errorExpected)
			})
		})
	},
	/**
	 * Command to verify error handling for not using the "cards" query parameter
	 * when adding cards to a pile.
	 * @param {string} deckKey The key (deck name) defined from a decks file.
	 * @param {string} pileName Name of the pile that's part of the given deck.
	 */
	addNoCardsToPile(deckKey, pileName) {
		const errorExpected = 'You must specify cards to add to the pile.'

		cy.fixture(decksNegFixturePath).then((decks) => {
			const addPileCardsUrl = `api/deck/${decks[deckKey].id}/pile/${pileName}/add/`
			const apiOptions = { url: addPileCardsUrl, failOnStatusCode: false }

			cy.api(apiOptions).then((response) => {
				cy.section('Verify error handling for adding no pile cards')
				cy.commonNegativeApiVerifications(response, errorExpected)
			})
		})
	},
	/**
	 * Command to verify error handling for one-over-max pile cards.
	 * @param {string} deckKey The key (deck name) defined from a decks file.
	 * @param {string} pileName Name of the pile that's part of the given deck.
	 * @param {number} cardsToGet The invalid number of cards to draw.
	 * @param {string} drawAct Set as either "bottom" to draw a card from the bottom
	 * of the pile or "random" to draw a random card from a pile (optional).
	 */
	drawOneOverMaxFromPile(deckKey, pileName, cardsToGet, drawAct = '') {
		const errorExpected = `Not enough cards remaining to draw ${cardsToGet} additional`

		cy.fixture(decksPosFixturePath).then((decks) => {
			const deckId = decks[deckKey].id

			DeckHandler.drawCardsFromPile(deckId, pileName, cardsToGet, drawAct, true)

			cy.section('Verify error handling for drawing one-over-max pile cards')
			cy.get('@recentDrawPileResp').then((recentDrawPileResp) => {
				cy.commonNegativeApiVerifications(recentDrawPileResp, errorExpected)
			})
		})
	},
	/**
	 * Helper command to verify common negative Deck of Cards API response body key value pairs.
	 * @param {object} response The response with these common key value pairs:
	 * status: 404, statusText: "Not Found", body.success: false,
	 * and body.error: errorExpected.
	 * @param {string} errorExpected The expected error message in the response body.
	 */
	commonNegativeApiVerifications(response, errorExpected) {
		cy.wrap(response.status).should('equal', 404)
		cy.wrap(response.statusText).should('equal', 'Not Found')
		cy.wrap(response.body.success).should('equal', false)
		cy.wrap(response.body.error).should('equal', errorExpected)
	}
})

// Custom commands for the custom website project.
Cypress.Commands.addAll({
	/**
	 * Enter numbers and actions into the calculator.
	 * @param {string[]} numStrings At least one number string.
	 * @param {string[]} actions The actions to perform between the numbers. There is one fewer action than numbers.
	 */
	calcEnterNumsAndActions(numStrings, actions) {
		const numCount = numStrings.length
		const actionCount = actions.length

		for (let i = 0; i < numCount; i++) {
			const numStr = numStrings[i]
			CalculatorPage.enterNumber(numStr)

			if (i < actionCount) {
				cy.calcEnterAction(actions[i])
			}
		}
	},
	/**
	 * Command to press an action button on the calculator.
	 * @param {string} action The action to perform.
	 */
	calcEnterAction(action) {
		switch (action.toLocaleLowerCase()) {
			case 'add':
				CalculatorPage.pressAdd()
				break
			case 'subtract':
				CalculatorPage.pressSubtract()
				break
			case 'multiply':
				CalculatorPage.pressMultiply()
				break
			case 'divide':
				CalculatorPage.pressDivide()
				break
			case 'modulo':
				CalculatorPage.pressModulo()
				break
			case 'decimal':
				CalculatorPage.pressDecimal()
				break
			case 'signchange':
				CalculatorPage.pressSignChange()
				break
			case 'clear':
				CalculatorPage.pressClear()
				break
			case 'clearentry':
				CalculatorPage.pressClearEntry()
				break
			case 'equals':
				CalculatorPage.pressEquals()
				break
			default:
				throw new Error(`Unknown action: ${action}`)
		}
	},
	/**
	 * Command to verify the calculator result.
	 * @param {string} expectedResult The expected result string.
	 */
	verifyCalcResult(expectedResult) {
		CalculatorPage.getDisplayResult().then((displayText) => {
			cy.wrap(displayText).should('equal', expectedResult)
		})
	},
	/**
	 * Command to type text into the Text to File text area.
	 * @param {string} textToType The text to type into the text area.
	 * @param {boolean} isJson Whether the text is JSON.
	 */
	typeTextToFileArea(textToType, isJson = false) {
		const maxTextLen = TextToFilePage.maxTextAreaLength

		// Remove any backslashes added by the Cucumber feature file.
		if (isJson) {
			textToType = textToType.replace(/\\/g, '')
		}

		TextToFilePage.typeIntoTextArea(textToType, isJson)

		// Replace the {enter} placeholder with actual new line characters for verification.
		textToType = textToType.replace(/{enter}/g, '\n')

		if (textToType.length > maxTextLen) {
			// Get the first 300 characters only.
			const first300Chars = textToType.substring(0, maxTextLen)

			TextToFilePage.textArea.should('have.value', first300Chars)
		} else {
			TextToFilePage.textArea.should('have.value', textToType)
		}
	},
	/**
	 * Command to delete text from the Text to File text area.
	 * @param {number} charCount The number of characters to delete.
	 */
	deleteTextToFileArea(charCount) {
		// Store the current text area content length.
		TextToFilePage.textArea.invoke('val').as('beforeText')
		cy.get('@beforeText').then((text) => {
			const currentLength = text.length
			const expLength = Math.max(0, currentLength - charCount)

			TextToFilePage.deleteFromTextArea(charCount)

			// Verify the new text area content length.
			TextToFilePage.textArea.invoke('val').as('afterText')
			cy.get('@afterText').then((afterText) => {
				cy.wrap(afterText.length).should('equal', expLength)
			})
		})
	},
	/**
	 * Command to type text into the Text to File file name input.
	 * @param {string} fileName The file name to type into the input.
	 */
	typeTextToFileNameInput(fileName) {
		const maxInputLen = TextToFilePage.maxFileNameLength

		TextToFilePage.typeIntoFileNameInput(fileName)
		if (fileName.length > maxInputLen) {
			// Get the first 30 characters only.
			const first30Chars = fileName.substring(0, maxInputLen)
			TextToFilePage.fileNameInput.should('have.value', first30Chars)
		} else {
			TextToFilePage.fileNameInput.should('have.value', fileName)
		}
	},
	/**
	 * Command to delete text from the Text to File file name input.
	 * @param {number} charCount The number of characters to delete.
	 */
	deleteTextToFileNameInput(charCount) {
		// Store the current file name input content length.
		TextToFilePage.fileNameInput.invoke('val').as('beforeFileName')
		cy.get('@beforeFileName').then((fileName) => {
			const currentLength = fileName.length
			const expLength = Math.max(0, currentLength - charCount)
			TextToFilePage.deleteFromFileNameInput(charCount)

			// Verify the new file name input content length.
			TextToFilePage.fileNameInput.invoke('val').as('afterFileName')
			cy.get('@afterFileName').then((afterFileName) => {
				cy.wrap(afterFileName.length).should('equal', expLength)
			})
		})
	},
	/**
	 * Command to clear the Text to File text area and file name input.
	 */
	clearTextToFileInputs() {
		TextToFilePage.clearTextAreaAndFileNameInput()
		TextToFilePage.textArea.should('have.value', '')
		TextToFilePage.fileNameInput.should('have.value', '')
	},
	/**
	 * Command to select the Text to File file type from the dropdown menu.
	 * @param {string} fileVal The file type value to select.
	 */
	selectTextToFileType(fileVal) {
		TextToFilePage.selectFileType(fileVal)

		TextToFilePage.fileTypeSelect.find('option:selected').as('selectedOption')
		cy.get('@selectedOption').should('have.value', fileVal)
	},
	/**
	 * Command to press the Text to File "Download" button.
	 */
	pressTextToFileDownload() {
		TextToFilePage.clickDownloadButton()
	},
	/**
	 * Command to verify the character count shown for the Text to File text area.
	 * @param {number} expectedCount The expected character count.
	 */
	verifyTextToFileAreaCharCount(expectedCount) {
		const expLabel = `Enter your text (${expectedCount}/300):`

		TextToFilePage.textInputLabel.should('have.text', expLabel)
	},
	/**
	 * Command to verify the character count for the file name input.
	 * @param {number} expectedCount The expected character count.
	 */
	verifyTextToFileNameInputCharCount(expectedCount) {
		const expLabel = `Enter file name (${expectedCount}/30):`

		TextToFilePage.fileNameInputLabel.should('have.text', expLabel)
	},
	/**
	 * Command to verify the downloaded file name and content.
	 * @param {string} expectedFileName The expected file name with its extension of the downloaded file.
	 * @param {string} expectedFileContent The expected content of the downloaded file.
	 */
	verifyTextToFileDownload(expectedFileName, expectedFileContent) {
		// Verify the file is downloaded with the expected file name and content.
		const filePath = `${cyDownloadsFolder}/${expectedFileName}`

		// Replace the {enter} placeholder with actual new line characters for verification.
		expectedFileContent = expectedFileContent.replace(/{enter}/g, '\n')

		cy.readFile(filePath, { timeout: 5000 }).then((fileContent) => {
			// Stringify JSON content for comparison if the selected file type was JSON.
			if (expectedFileName.endsWith('.json')) {
				// Remove any backslashes added by the Cucumber feature file.
				const expectedJson = JSON.parse(expectedFileContent.replace(/\\/g, ''))

				cy.wrap(fileContent).should('deep.equal', expectedJson)
			} else {
				cy.wrap(fileContent).should('equal', expectedFileContent)
			}
		})
	},
	/**
	 * Command to verify an error message is shown on the Text to File page.
	 * @param {string} expectedErrorMsg The expected error message shown.
	 */
	verifyTextToFileErrorMessage(expectedErrorMsg) {
		TextToFilePage.errorMessage
			.should('be.visible')
			.and('have.text', expectedErrorMsg)
	},
	/**
	 * Command to verify no error message is shown on the Text to File page.
	 * @param {boolean} typeInFileName Set to true to type in the file name input. Otherwise, type in the text area instead.
	 */
	verifyTextToFileNoErrorMessage(typeInFileName = false) {
		if (typeInFileName) {
			TextToFilePage.fileNameInput.focus()
		} else {
			TextToFilePage.textArea.focus()
		}
		cy.realType('A')
		TextToFilePage.errorMessage.should('not.be.visible')
	}
})
