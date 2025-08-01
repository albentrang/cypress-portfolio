describe('Deck of Cards API Tests (Positive)', () => {
	const orderedDeckKeys = Object.freeze({
		SD: 'singleDeck',
		SDJ: 'singleDeckWithJokers'
	})
	const shuffledDeckKeys = Object.freeze({
		SDS: 'singleDeckShuffled',
		SDSJ: 'singleDeckShuffledWithJokers',
		DDS: 'doubleDeckShuffled',
		DDSJ: 'doubleDeckShuffledWithJokers'
	})
	const partialDeckKeys = Object.freeze({
		PD: 'partialDeck',
		PDOC: 'partialDeckOneCard',
		PDAC: 'partialDeckAllCards'
	})
	const decksPath = 'cypress/fixtures/deck_of_cards_api/current_decks_pos.json'
	const decksFixturePath = 'deck_of_cards_api/current_decks_pos.json'
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

	context('Unshuffled Decks', () => {
		it('Check each card is in order for an unshuffled deck', () => {
			const deckKey = orderedDeckKeys.SD

			cy.drawCardsFromDeck(deckKey, maxCardCount)
			cy.verifyOrderedDeck()
		})

		it('Check each card is in order for an unshuffled deck with jokers', () => {
			const deckKey = orderedDeckKeys.SDJ

			cy.drawCardsFromDeck(deckKey, maxCardCountWithJokers)
			cy.verifyOrderedDeck()
		})
	})

	context('Drawing Cards from Decks', () => {
		/* Example of data-driven testing for drawing cards from decks. 
		It is best used during headless testing because using this test case
		while the browser runs the Cypress tests causes the tests to run
		slower than usual. */
		it.skip('Drawing cards from decks with data-driven testing', () => {
			const fixturePath = 'deck_of_cards_api/draw_cards_from_deck_pos.json'

			cy.fixture(fixturePath).then((drawDeckDataArray) => {
				cy.wrap(drawDeckDataArray).each((drawDeckDataObj) => {
					let deckKey = shuffledDeckKeys[drawDeckDataObj.deckKeyCode]
					let cardsPerDraw = drawDeckDataObj.cardsPerDraw
					let totalDraws = drawDeckDataObj.totalDraws

					cy.verifyAfterDrawCardsFromDeck(deckKey, cardsPerDraw, totalDraws)

					// Shuffle the deck after drawing cards.
					cy.shuffleDeck(deckKey)
				})
			})
		})

		it('Draw 1 card at a time from a shuffled deck 10 times', () => {
			const deckKey = shuffledDeckKeys.SDS
			const cardsPerDraw = 1
			const totalDraws = 10

			cy.verifyAfterDrawCardsFromDeck(deckKey, cardsPerDraw, totalDraws)
		})

		it('Draw 1 card at a time from a shuffled deck with jokers 20 times', () => {
			const deckKey = shuffledDeckKeys.SDSJ
			const cardsPerDraw = 1
			const totalDraws = 20

			cy.verifyAfterDrawCardsFromDeck(deckKey, cardsPerDraw, totalDraws)
		})

		it('Draw 2 card at a time from two shuffled decks until 10 times', () => {
			const deckKey = shuffledDeckKeys.DDS
			const cardsPerDraw = 2
			const totalDraws = 10

			cy.verifyAfterDrawCardsFromDeck(deckKey, cardsPerDraw, totalDraws)
		})

		it('Draw 2 card at a time from a shuffled deck with jokers 20 times', () => {
			const deckKey = shuffledDeckKeys.DDSJ
			const cardsPerDraw = 2
			const totalDraws = 20

			cy.verifyAfterDrawCardsFromDeck(deckKey, cardsPerDraw, totalDraws)
		})

		it('Draw all the cards at once from a shuffled deck', () => {
			const deckKey = shuffledDeckKeys.SDS
			const cardsPerDraw = maxCardCount
			const totalDraws = 1

			cy.verifyAfterDrawCardsFromDeck(deckKey, cardsPerDraw, totalDraws)
		})

		it('Draw all the cards at once from a shuffled deck with jokers', () => {
			const deckKey = shuffledDeckKeys.SDSJ
			const cardsPerDraw = maxCardCount
			const totalDraws = 1

			cy.verifyAfterDrawCardsFromDeck(deckKey, cardsPerDraw, totalDraws)
		})

		it('Draw all the cards at once from two shuffled deck', () => {
			const deckKey = shuffledDeckKeys.DDS
			const cardsPerDraw = maxCardCount * 2
			const totalDraws = 1

			cy.verifyAfterDrawCardsFromDeck(deckKey, cardsPerDraw, totalDraws)
		})

		it('Draw all the cards at once from two shuffled deck with jokers', () => {
			const deckKey = shuffledDeckKeys.DDSJ
			const cardsPerDraw = maxCardCountWithJokers * 2
			const totalDraws = 1

			cy.verifyAfterDrawCardsFromDeck(deckKey, cardsPerDraw, totalDraws)
		})
	})

	context('Shuffle Main Stack of Deck Only', () => {
		it('Shuffle deck without the drawn cards after drawing no cards', () => {
			const deckKey = shuffledDeckKeys.SDS
			const cardsToDraw = 0

			cy.drawCardsFromDeck(deckKey, cardsToDraw)
			cy.shuffleDeck(deckKey, 'true')
			cy.verifyShuffleRemainingAfterDrawingNoCards()
		})

		it('Shuffle deck that has jokers without the drawn cards after drawing no cards', () => {
			const deckKey = shuffledDeckKeys.SDSJ
			const jokersEnabled = true
			const cardsToDraw = 0

			cy.drawCardsFromDeck(deckKey, cardsToDraw)
			cy.shuffleDeck(deckKey, 'true')
			cy.verifyShuffleRemainingAfterDrawingNoCards(jokersEnabled)
		})

		it('Shuffle deck without the drawn cards after drawing 1 card', () => {
			const deckKey = shuffledDeckKeys.SDS
			const cardsToDraw = 1

			cy.drawCardsFromDeck(deckKey, cardsToDraw)
			cy.shuffleDeck(deckKey, 'true')
			cy.verifyShuffleRemaining(deckKey)
		})

		it('Shuffle deck that has jokers without the drawn cards after drawing 1 card', () => {
			const deckKey = shuffledDeckKeys.SDSJ
			const cardsToDraw = 1

			cy.drawCardsFromDeck(deckKey, cardsToDraw)
			cy.shuffleDeck(deckKey, 'true')
			cy.verifyShuffleRemaining(deckKey)
		})

		it('Shuffle deck without the drawn cards after drawing half the cards', () => {
			const deckKey = shuffledDeckKeys.SDS
			const cardsToDraw = maxCardCount / 2

			cy.drawCardsFromDeck(deckKey, cardsToDraw)
			cy.shuffleDeck(deckKey, 'true')
			cy.verifyShuffleRemaining(deckKey)
		})

		it('Shuffle deck that has jokers without the drawn cards after drawing half the cards', () => {
			const deckKey = shuffledDeckKeys.SDSJ
			const cardsToDraw = maxCardCountWithJokers / 2

			cy.drawCardsFromDeck(deckKey, cardsToDraw)
			cy.shuffleDeck(deckKey, 'true')
			cy.verifyShuffleRemaining(deckKey)
		})

		it('Shuffle deck without the drawn cards after drawing all the cards', () => {
			const deckKey = shuffledDeckKeys.SDS
			const cardsToDraw = maxCardCount

			cy.drawCardsFromDeck(deckKey, cardsToDraw)
			cy.shuffleDeck(deckKey, 'true')
			cy.verifyShuffleRemainingAfterDrawingAllCards()
		})

		it('Shuffle deck that has jokers without the drawn cards after drawing all the cards', () => {
			const deckKey = shuffledDeckKeys.SDSJ
			const cardsToDraw = maxCardCountWithJokers
			const jokersEnabled = true

			cy.drawCardsFromDeck(deckKey, cardsToDraw)
			cy.shuffleDeck(deckKey, 'true')
			cy.verifyShuffleRemainingAfterDrawingAllCards(jokersEnabled)
		})

		it('Shuffle two decks without the drawn cards after drawing no cards', () => {
			const deckKey = shuffledDeckKeys.DDS
			const cardsToDraw = 0
			const jokersEnabled = false
			const deckCount = 2

			cy.drawCardsFromDeck(deckKey, cardsToDraw)
			cy.shuffleDeck(deckKey, 'true')
			cy.verifyShuffleRemainingAfterDrawingNoCards(jokersEnabled, deckCount)
		})

		it('Shuffle two decks that has jokers without the drawn cards after drawing no cards', () => {
			const deckKey = shuffledDeckKeys.DDSJ
			const cardsToDraw = 0
			const jokersEnabled = true
			const deckCount = 2

			cy.drawCardsFromDeck(deckKey, cardsToDraw)
			cy.shuffleDeck(deckKey, 'true')
			cy.verifyShuffleRemainingAfterDrawingNoCards(jokersEnabled, deckCount)
		})

		it('Shuffle two decks without the drawn cards after drawing 1 card', () => {
			const deckKey = shuffledDeckKeys.DDS
			const cardsToDraw = 1

			cy.drawCardsFromDeck(deckKey, cardsToDraw)
			cy.shuffleDeck(deckKey, 'true')
			cy.verifyShuffleRemaining(deckKey)
		})

		it('Shuffle two decks that has jokers without the drawn cards after drawing 1 card', () => {
			const deckKey = shuffledDeckKeys.DDSJ
			const cardsToDraw = 1

			cy.drawCardsFromDeck(deckKey, cardsToDraw)
			cy.shuffleDeck(deckKey, 'true')
			cy.verifyShuffleRemaining(deckKey)
		})

		it('Shuffle two decks without the drawn cards after drawing half the card', () => {
			const deckKey = shuffledDeckKeys.DDS
			const cardsToDraw = maxCardCount / 2

			cy.drawCardsFromDeck(deckKey, cardsToDraw)
			cy.shuffleDeck(deckKey, 'true')
			cy.verifyShuffleRemaining(deckKey)
		})

		it('Shuffle two decks that has jokers without the drawn cards after drawing half the cards', () => {
			const deckKey = shuffledDeckKeys.DDSJ
			const cardsToDraw = maxCardCountWithJokers / 2

			cy.drawCardsFromDeck(deckKey, cardsToDraw)
			cy.shuffleDeck(deckKey, 'true')
			cy.verifyShuffleRemaining(deckKey)
		})

		it('Shuffle two decks without the drawn cards after drawing all the cards', () => {
			const deckKey = shuffledDeckKeys.DDS
			const cardsToDraw = maxCardCount * 2
			const jokersEnabled = false
			const deckCount = 2

			cy.drawCardsFromDeck(deckKey, cardsToDraw)
			cy.shuffleDeck(deckKey, 'true')
			cy.verifyShuffleRemainingAfterDrawingAllCards(jokersEnabled, deckCount)
		})

		it('Shuffle two decks that has jokers without the drawn cards after drawing all the cards', () => {
			const deckKey = shuffledDeckKeys.DDSJ
			const cardsToDraw = maxCardCountWithJokers * 2
			const jokersEnabled = true
			const deckCount = 2

			cy.drawCardsFromDeck(deckKey, cardsToDraw)
			cy.shuffleDeck(deckKey, 'true')
			cy.verifyShuffleRemainingAfterDrawingAllCards(jokersEnabled, deckCount)
		})
	})

	context('Partial Decks', () => {
		it('A partial deck has the specified cards where one card is from each suit', () => {
			cy.fixture(decksFixturePath).then((decks) => {
				const deckKey = partialDeckKeys.PD
				const partialDeckCards = decks[deckKey].cards.split(',')
				const cardsExpectedToDraw = partialDeckCards.length

				cy.drawCardsFromDeck(deckKey, cardsExpectedToDraw)
				cy.verifyPartialDeck(partialDeckCards)
			})
		})

		it('A "partial" deck has the specified cards where there is only one card', () => {
			cy.fixture(decksFixturePath).then((decks) => {
				const deckKey = partialDeckKeys.PDOC
				const partialDeckCards = decks[deckKey].cards.split(',')
				const cardsExpectedToDraw = partialDeckCards.length

				cy.drawCardsFromDeck(deckKey, cardsExpectedToDraw)
				cy.verifyPartialDeck(partialDeckCards)
			})
		})

		it('A "partial" deck has the specified cards where all cards, except jokers, are in it', () => {
			cy.fixture(decksFixturePath).then((decks) => {
				const deckKey = partialDeckKeys.PDAC
				const partialDeckCards = decks[deckKey].cards.split(',')
				const cardsExpectedToDraw = partialDeckCards.length

				cy.drawCardsFromDeck(deckKey, cardsExpectedToDraw)
				cy.verifyPartialDeck(partialDeckCards)
			})
		})
	})

	context('Piles', () => {
		it('Draw one card from a one-card pile by count', () => {
			const cardsToDrawFromDeck = 1
			const pileName = 'test_pile'
			const pilesExpected = [{ name: pileName, remaining: cardsToDrawFromDeck }]

			cy.drawCardsFromDeck(shuffledDeckKeys.SDS, cardsToDrawFromDeck)
			cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
				const cardCode = `${drawDeckResp.body.cards[0].code}`
				cy.addCardsToPile(shuffledDeckKeys.SDS, pileName, cardCode)
				cy.verifyAddToPile(pileName, cardsToDrawFromDeck)
				cy.shufflePile(shuffledDeckKeys.SDS, pileName) // Check that shuffling a one-card pile doesn't do anything.
				cy.verifyShufflePile(pileName, cardsToDrawFromDeck)
				cy.listCardsInPile(shuffledDeckKeys.SDS, pileName)
				cy.verifyListingPile(pileName, pilesExpected)
				cy.drawCardsFromPile(
					shuffledDeckKeys.SDS,
					pileName,
					cardsToDrawFromDeck
				)
				cy.verifyDrawFromPile(pileName, cardsToDrawFromDeck)
			})
		})

		it('Draw one card from a one-card pile by its card code', () => {
			const cardsToDrawFromDeck = 1
			const pileName = 'test_pile'
			const pilesExpected = [{ name: pileName, remaining: cardsToDrawFromDeck }]

			cy.drawCardsFromDeck(shuffledDeckKeys.SDS, cardsToDrawFromDeck)
			cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
				const cardCode = `${drawDeckResp.body.cards[0].code}`
				cy.addCardsToPile(shuffledDeckKeys.SDS, pileName, cardCode)
				cy.verifyAddToPile(pileName, cardsToDrawFromDeck)
				cy.listCardsInPile(shuffledDeckKeys.SDS, pileName)
				cy.verifyListingPile(pileName, pilesExpected)
				cy.drawCardsFromPile(
					shuffledDeckKeys.SDS,
					pileName,
					drawDeckResp.body.cards[0].code
				)
				cy.verifyDrawFromPile(pileName, drawDeckResp.body.cards[0].code)
			})
		})

		it('Draw all cards from a whole-deck shuffled pile by count', () => {
			const cardsToDrawFromDeck = maxCardCount
			const pileName = 'test_pile'
			const pilesExpected = [{ name: pileName, remaining: cardsToDrawFromDeck }]

			cy.drawCardsFromDeck(shuffledDeckKeys.SDS, cardsToDrawFromDeck)
			cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
				let cardCodes = ``
				for (let index = 0; index < drawDeckResp.body.cards.length; index++) {
					cardCodes += drawDeckResp.body.cards[index].code
					if (index < drawDeckResp.body.cards.length - 1) {
						cardCodes += `,`
					}
				}
				cy.addCardsToPile(shuffledDeckKeys.SDS, pileName, cardCodes)
				cy.verifyAddToPile(pileName, cardsToDrawFromDeck)
				cy.listCardsInPile(shuffledDeckKeys.SDS, pileName)
				cy.verifyListingPile(pileName, pilesExpected)
				cy.shufflePile(shuffledDeckKeys.SDS, pileName)
				cy.verifyShufflePile(pileName, cardsToDrawFromDeck)
				cy.drawCardsFromPile(
					shuffledDeckKeys.SDS,
					pileName,
					cardsToDrawFromDeck
				)
				cy.verifyDrawFromPile(pileName, cardsToDrawFromDeck)
			})
		})

		it('Draw all cards from a whole-deck shuffled pile by their card codes', () => {
			const cardsToDrawFromDeck = maxCardCountWithJokers
			const pileName = 'test_pile'
			const pilesExpected = [{ name: pileName, remaining: cardsToDrawFromDeck }]

			cy.drawCardsFromDeck(shuffledDeckKeys.SDSJ, cardsToDrawFromDeck)
			cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
				let cardCodes = ``
				for (let index = 0; index < drawDeckResp.body.cards.length; index++) {
					cardCodes += drawDeckResp.body.cards[index].code
					if (index < drawDeckResp.body.cards.length - 1) {
						cardCodes += `,`
					}
				}

				cy.addCardsToPile(shuffledDeckKeys.SDSJ, pileName, cardCodes)
				cy.verifyAddToPile(pileName, cardsToDrawFromDeck)
				cy.listCardsInPile(shuffledDeckKeys.SDSJ, pileName)
				cy.verifyListingPile(pileName, pilesExpected)
				cy.shufflePile(shuffledDeckKeys.SDSJ, pileName)
				cy.verifyShufflePile(pileName, cardsToDrawFromDeck)
				cy.drawCardsFromPile(shuffledDeckKeys.SDSJ, pileName, cardCodes)
				cy.verifyDrawFromPile(pileName, cardCodes)
			})
		})

		it('Put half of the shuffled deck in one pile, shuffle the cards in the first pile, bring half of those cards in the first pile to a second pile, and then draw all cards in the second pile from the bottom of it by card count', () => {
			const cardsToDrawFromDeck = maxCardCount / 2
			const firstPileName = 'first_test_pile'
			const secondPileName = 'second_test_pile'

			cy.drawCardsFromDeck(shuffledDeckKeys.SDS, cardsToDrawFromDeck)
			cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
				let allCardCodes = ``
				let secondCardCodesHalf = ``
				for (let index = 0; index < drawDeckResp.body.cards.length; index++) {
					allCardCodes += drawDeckResp.body.cards[index].code
					if (index < drawDeckResp.body.cards.length - 1) {
						allCardCodes += `,`
					}
					if (
						index >= drawDeckResp.body.cards.length / 2 &&
						index < drawDeckResp.body.cards.length
					) {
						secondCardCodesHalf += drawDeckResp.body.cards[index].code
						if (index < drawDeckResp.body.cards.length - 1) {
							secondCardCodesHalf += `,`
						}
					}
				}

				cy.addCardsToPile(shuffledDeckKeys.SDS, firstPileName, allCardCodes)
				cy.verifyAddToPile(firstPileName, cardsToDrawFromDeck)
				cy.shufflePile(shuffledDeckKeys.SDS, firstPileName)
				cy.verifyShufflePile(firstPileName, cardsToDrawFromDeck)
				cy.addCardsToPile(
					shuffledDeckKeys.SDS,
					secondPileName,
					secondCardCodesHalf
				)
				cy.verifyAddToPile(secondPileName, cardsToDrawFromDeck / 2)
				cy.drawCardsFromPile(
					shuffledDeckKeys.SDS,
					secondPileName,
					cardsToDrawFromDeck / 2,
					'bottom'
				)
				cy.verifyDrawFromPile(secondPileName, cardsToDrawFromDeck / 2)
			})
		})

		it('Put half of the shuffled deck in one pile, bring half of those cards in the first pile to a second pile, shuffle the cards in the second pile, take those cards back to the first pile, shuffle the cards in the first pile, and then draw all cards in the first pile randomly by card count', () => {
			const cardsToDrawFromDeck = maxCardCount / 2
			const firstPileName = 'first_test_pile'
			const secondPileName = 'second_test_pile'

			cy.drawCardsFromDeck(shuffledDeckKeys.SDS, cardsToDrawFromDeck)
			cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
				let allCardCodes = ``
				let secondCardCodesHalf = ``
				for (let index = 0; index < drawDeckResp.body.cards.length; index++) {
					allCardCodes += drawDeckResp.body.cards[index].code
					if (index < drawDeckResp.body.cards.length - 1) {
						allCardCodes += `,`
					}
					if (
						index >= drawDeckResp.body.cards.length / 2 &&
						index < drawDeckResp.body.cards.length
					) {
						secondCardCodesHalf += drawDeckResp.body.cards[index].code
						if (index < drawDeckResp.body.cards.length - 1) {
							secondCardCodesHalf += `,`
						}
					}
				}

				cy.addCardsToPile(shuffledDeckKeys.SDS, firstPileName, allCardCodes)
				cy.verifyAddToPile(firstPileName, cardsToDrawFromDeck)
				cy.addCardsToPile(
					shuffledDeckKeys.SDS,
					secondPileName,
					secondCardCodesHalf
				)
				cy.verifyAddToPile(secondPileName, cardsToDrawFromDeck / 2)
				cy.shufflePile(shuffledDeckKeys.SDS, secondPileName)
				cy.verifyShufflePile(secondPileName, cardsToDrawFromDeck / 2)
				cy.addCardsToPile(
					shuffledDeckKeys.SDS,
					firstPileName,
					secondCardCodesHalf
				)
				cy.verifyAddToPile(firstPileName, cardsToDrawFromDeck)
				cy.shufflePile(shuffledDeckKeys.SDS, firstPileName)
				cy.verifyShufflePile(firstPileName, cardsToDrawFromDeck)
				cy.drawCardsFromPile(
					shuffledDeckKeys.SDS,
					firstPileName,
					cardsToDrawFromDeck,
					'random'
				)
				cy.verifyDrawFromPile(firstPileName, cardsToDrawFromDeck)
			})
		})
	})

	context('Return Cards', () => {
		it('Draw a card from a shuffled deck and then return it to the deck', () => {
			const cardsToDraw = 1

			cy.drawCardsFromDeck(shuffledDeckKeys.SDS, cardsToDraw)
			cy.returnCards(shuffledDeckKeys.SDS)
			cy.verifyReturnCards(maxCardCount)
		})

		it('Draw all cards from a shuffled deck and then return all cards to the deck', () => {
			const cardsToDraw = maxCardCount

			cy.drawCardsFromDeck(shuffledDeckKeys.SDS, cardsToDraw)
			cy.returnCards(shuffledDeckKeys.SDS)
			cy.verifyReturnCards(maxCardCount)
		})

		it('Draw all cards from a shuffled deck with jokers and then return all cards to the deck', () => {
			const cardsToDraw = maxCardCountWithJokers

			cy.drawCardsFromDeck(shuffledDeckKeys.SDSJ, cardsToDraw)
			cy.returnCards(shuffledDeckKeys.SDSJ)
			cy.verifyReturnCards(maxCardCountWithJokers)
		})

		it('Draw a card from a shuffled deck, put it in a pile, and then return it to the deck', () => {
			const cardsToDraw = 1

			cy.drawCardsFromDeck(shuffledDeckKeys.SDS, cardsToDraw)
			cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
				const cardCode = `${drawDeckResp.body.cards[0].code}`
				const pileName = 'test_pile'

				cy.addCardsToPile(shuffledDeckKeys.SDS, pileName, cardCode)
				cy.returnCards(shuffledDeckKeys.SDS, '', pileName)
				cy.verifyReturnCards(maxCardCount, pileName)
			})
		})

		it('Draw all cards from a shuffled deck, put half of them in a pile, and then return all of the pile cards to the deck', () => {
			const cardsToDraw = maxCardCount

			cy.drawCardsFromDeck(shuffledDeckKeys.SDS, cardsToDraw)
			cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
				let cardCodes = ``
				const pileName = 'test_pile'
				const halfDeckLength = drawDeckResp.body.cards.length / 2

				for (let index = 0; index < halfDeckLength; index++) {
					cardCodes += drawDeckResp.body.cards[index].code
					if (index < halfDeckLength - 1) {
						cardCodes += `,`
					}
				}

				cy.addCardsToPile(shuffledDeckKeys.SDS, pileName, cardCodes)
				cy.returnCards(shuffledDeckKeys.SDS, cardCodes, pileName)
				cy.verifyReturnCards(maxCardCount / 2, pileName)
			})
		})

		it('Draw all cards from a shuffled deck with jokers, put all of them in a pile, and then return all of the pile cards to the deck', () => {
			const cardsToDraw = maxCardCountWithJokers

			cy.drawCardsFromDeck(shuffledDeckKeys.SDSJ, cardsToDraw)
			cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
				let cardCodes = ``
				const pileName = 'test_pile'

				for (let index = 0; index < drawDeckResp.body.cards.length; index++) {
					cardCodes += drawDeckResp.body.cards[index].code
					if (index < drawDeckResp.body.cards.length - 1) {
						cardCodes += `,`
					}
				}

				cy.addCardsToPile(shuffledDeckKeys.SDSJ, pileName, cardCodes)
				cy.returnCards(shuffledDeckKeys.SDSJ, cardCodes, pileName)
				cy.verifyReturnCards(maxCardCountWithJokers, pileName)
			})
		})

		it('Draw a card from a shuffled deck and then return it to the deck using its card code', () => {
			const cardsToDraw = 1

			cy.drawCardsFromDeck(shuffledDeckKeys.SDS, cardsToDraw)
			cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
				const cardCode = `${drawDeckResp.body.cards[0].code}`

				cy.returnCards(shuffledDeckKeys.SDS, cardCode)
				cy.verifyReturnCards(maxCardCount)
			})
		})

		it('Draw all cards from a shuffled deck and then return half of them to the deck using their card codes', () => {
			const cardsToDraw = maxCardCount

			cy.drawCardsFromDeck(shuffledDeckKeys.SDS, cardsToDraw)
			cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
				let cardCodes = ``

				for (
					let index = 0;
					index < drawDeckResp.body.cards.length / 2;
					index++
				) {
					cardCodes += drawDeckResp.body.cards[index].code
					if (index < drawDeckResp.body.cards.length - 1) {
						cardCodes += `,`
					}
				}

				cy.returnCards(shuffledDeckKeys.SDS, cardCodes)
				cy.verifyReturnCards(maxCardCount / 2)
			})
		})

		it('Draw all cards from a shuffled deck with jokers and then return half of them to the deck using their card codes', () => {
			const cardsToDraw = maxCardCountWithJokers

			cy.drawCardsFromDeck(shuffledDeckKeys.SDSJ, cardsToDraw)
			cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
				let cardCodes = ``

				for (
					let index = 0;
					index < drawDeckResp.body.cards.length / 2;
					index++
				) {
					cardCodes += drawDeckResp.body.cards[index].code
					if (index < drawDeckResp.body.cards.length - 1) {
						cardCodes += `,`
					}
				}

				cy.returnCards(shuffledDeckKeys.SDSJ, cardCodes)
				cy.verifyReturnCards(maxCardCountWithJokers / 2)
			})
		})

		it('Draw a card from a shuffled deck, put it in a pile, and then return it to the deck using its card code', () => {
			const cardsToDraw = 1

			cy.drawCardsFromDeck(shuffledDeckKeys.SDS, cardsToDraw)
			cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
				const cardCode = `${drawDeckResp.body.cards[0].code}`
				const pileName = 'test_pile'

				cy.addCardsToPile(shuffledDeckKeys.SDS, pileName, cardCode)
				cy.returnCards(shuffledDeckKeys.SDS, cardCode, pileName)
				cy.verifyReturnCards(
					maxCardCount,
					pileName,
					0,
					cardCode,
					shuffledDeckKeys.SDS
				)
			})
		})

		it('Draw all cards from a shuffled deck, put half of them in a pile, and then return half of the pile cards to the deck using their card codes', () => {
			const cardsToDraw = maxCardCount

			cy.drawCardsFromDeck(shuffledDeckKeys.SDS, cardsToDraw)
			cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
				let cardCodes = ``
				const pileName = 'test_pile'
				const halfDeckLength = drawDeckResp.body.cards.length / 2

				for (let index = 0; index < halfDeckLength; index++) {
					cardCodes += drawDeckResp.body.cards[index].code
					if (index < halfDeckLength - 1) {
						cardCodes += `,`
					}
				}

				cy.addCardsToPile(shuffledDeckKeys.SDS, pileName, cardCodes)
				cy.listCardsInPile(shuffledDeckKeys.SDS, pileName)
				cy.get('@recentListPileResp').then((listPileResp) => {
					let pileCardCodes = ``
					const halfPileLength = cardCodes.split(',').length / 2

					for (let index = 0; index < halfPileLength; index++) {
						pileCardCodes += listPileResp.body.piles[pileName].cards[index].code
						if (index < halfPileLength - 1) {
							pileCardCodes += `,`
						}
					}

					cy.returnCards(shuffledDeckKeys.SDS, pileCardCodes, pileName)
					cy.verifyReturnCards(
						halfPileLength,
						pileName,
						halfPileLength,
						pileCardCodes,
						shuffledDeckKeys.SDS
					)
				})
			})
		})

		it('Draw all cards from a shuffled deck with jokers, put them half of them in a pile, and then return half of the pile cards to the deck using their card codes', () => {
			const cardsToDraw = maxCardCountWithJokers

			cy.drawCardsFromDeck(shuffledDeckKeys.SDSJ, cardsToDraw)
			cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
				let cardCodes = ``
				const pileName = 'test_pile'
				const halfDeckLength = drawDeckResp.body.cards.length / 2

				for (let index = 0; index < halfDeckLength; index++) {
					cardCodes += drawDeckResp.body.cards[index].code
					if (index < halfDeckLength - 1) {
						cardCodes += `,`
					}
				}

				cy.addCardsToPile(shuffledDeckKeys.SDSJ, pileName, cardCodes)
				cy.listCardsInPile(shuffledDeckKeys.SDSJ, pileName)
				cy.get('@recentListPileResp').then((listPileResp) => {
					let pileCardCodes = ``
					const halfPileLength = Math.round(cardCodes.split(',').length / 2)

					for (let index = 0; index < halfPileLength; index++) {
						pileCardCodes += listPileResp.body.piles[pileName].cards[index].code
						if (index < halfPileLength - 1) {
							pileCardCodes += `,`
						}
					}

					cy.returnCards(shuffledDeckKeys.SDSJ, pileCardCodes, pileName)
					cy.verifyReturnCards(
						halfPileLength,
						pileName,
						halfPileLength - 1,
						pileCardCodes,
						shuffledDeckKeys.SDSJ
					)
				})
			})
		})
	})
})
