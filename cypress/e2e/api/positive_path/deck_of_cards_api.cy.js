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
		PD: 'partialDeck'
	})
	const decksPath = 'cypress/fixtures/deck_of_cards_api/current_decks_pos.json'
	const decksFixturePath = 'deck_of_cards_api/current_decks_pos.json'
	const maxCardCount = 52
	const maxCardCountWithJokers = 54

	before(() => {
		cy.checkDecks(decksPath)
	})

	beforeEach(() => {
		cy.section('Reshuffle the shuffled decks to their full stacks')
		for (let key in shuffledDeckKeys) {
			cy.reshuffleDeck(`${shuffledDeckKeys[key]}`)
		}
		cy.section('Beginning the test case')
	})

	context('Unshuffled Decks', () => {
		it('Check each card is in order for an unshuffled deck', () => {
			cy.drawCardFromDeck(orderedDeckKeys.SD, maxCardCount)
			cy.verifyOrderedDeck()
		})

		it('Check each card is in order for an unshuffled deck with jokers', () => {
			cy.drawCardFromDeck(orderedDeckKeys.SDJ, maxCardCountWithJokers)
			cy.verifyOrderedDeck()
		})
	})

	context('Drawing Cards', () => {
		it('Draw 1 card at a time from a shuffled deck until 10 cards are drawn', () => {
			cy.wrap([]).as('verifiedCardCodes')
			for (let i = 0; i < 10; i++) {
				cy.drawCardFromDeck(shuffledDeckKeys.SDS, 1)
				cy.verifyCardsDrawn()
			}
		})

		it('Draw 1 card at a time from a shuffled deck with jokers until 10 cards are drawn', () => {
			cy.wrap([]).as('verifiedCardCodes')
			for (let i = 0; i < 10; i++) {
				cy.drawCardFromDeck(shuffledDeckKeys.SDSJ, 1)
				cy.verifyCardsDrawn(1, maxCardCountWithJokers)
			}
		})

		it('Draw 2 card at a time from two shuffled decks until 20 cards are drawn', () => {
			cy.wrap([]).as('verifiedCardCodes')
			for (let i = 0; i < 20; i += 2) {
				cy.drawCardFromDeck(shuffledDeckKeys.DDS, 2)
				cy.verifyCardsDrawn(2, maxCardCount * 2)
			}
		})

		it('Draw 2 card at a time from a shuffled deck with jokers until 20 cards are drawn', () => {
			cy.wrap([]).as('verifiedCardCodes')
			for (let i = 0; i < 20; i += 2) {
				cy.drawCardFromDeck(shuffledDeckKeys.DDSJ, 2)
				cy.verifyCardsDrawn(2, maxCardCountWithJokers * 2)
			}
		})

		it('Draw all the cards at once from a shuffled deck', () => {
			cy.wrap([]).as('verifiedCardCodes')
			cy.drawCardFromDeck(shuffledDeckKeys.SDS, maxCardCount)
			cy.verifyCardsDrawn(1, maxCardCount)
		})

		it('Draw all the cards at once from a shuffled deck with jokers', () => {
			cy.wrap([]).as('verifiedCardCodes')
			cy.drawCardFromDeck(shuffledDeckKeys.SDSJ, maxCardCountWithJokers)
			cy.verifyCardsDrawn(1, maxCardCountWithJokers)
		})

		it('Draw all the cards at once from two shuffled deck', () => {
			cy.wrap([]).as('verifiedCardCodes')
			cy.drawCardFromDeck(shuffledDeckKeys.DDS, maxCardCount * 2)
			cy.verifyCardsDrawn(2, maxCardCount * 2)
		})

		it('Draw all the cards at once from two shuffled deck with jokers', () => {
			cy.wrap([]).as('verifiedCardCodes')
			cy.drawCardFromDeck(shuffledDeckKeys.DDSJ, maxCardCountWithJokers * 2)
			cy.verifyCardsDrawn(2, maxCardCountWithJokers * 2)
		})
	})

	context('Reshuffle Main Stack of Deck Only', () => {
		it('Reshuffle deck without the drawn cards after drawing no cards', () => {
			cy.reshuffleDeck(shuffledDeckKeys.SDS, 'true')
			cy.verifyReshuffleRemainingNoDrawnCards()
		})

		it('Reshuffle deck that has jokers without the drawn cards after drawing no cards', () => {
			cy.reshuffleDeck(shuffledDeckKeys.SDSJ, 'true')
			cy.verifyReshuffleRemainingNoDrawnCards(true)
		})

		it('Reshuffle deck without the drawn cards after drawing 1 card', () => {
			const cardsToDraw = 1
			cy.drawCardFromDeck(shuffledDeckKeys.SDS, cardsToDraw)
			cy.reshuffleDeck(shuffledDeckKeys.SDS, 'true')
			cy.verifyRemainingCards(shuffledDeckKeys.SDS)
		})

		it('Reshuffle deck that has jokers without the drawn cards after drawing 1 card', () => {
			const cardsToDraw = 1
			cy.drawCardFromDeck(shuffledDeckKeys.SDSJ, cardsToDraw)
			cy.reshuffleDeck(shuffledDeckKeys.SDSJ, 'true')
			cy.verifyRemainingCards(shuffledDeckKeys.SDSJ)
		})

		it('Reshuffle deck without the drawn cards after drawing half the cards', () => {
			const cardsToDraw = maxCardCount / 2
			cy.drawCardFromDeck(shuffledDeckKeys.SDS, cardsToDraw)
			cy.reshuffleDeck(shuffledDeckKeys.SDS, 'true')
			cy.verifyRemainingCards(shuffledDeckKeys.SDS)
		})

		it('Reshuffle deck that has jokers without the drawn cards after drawing half the cards', () => {
			const cardsToDraw = maxCardCountWithJokers / 2
			cy.drawCardFromDeck(shuffledDeckKeys.SDSJ, cardsToDraw)
			cy.reshuffleDeck(shuffledDeckKeys.SDSJ, 'true')
			cy.verifyRemainingCards(shuffledDeckKeys.SDSJ)
		})

		it('Reshuffle deck without the drawn cards after drawing all the cards', () => {
			const cardsToDraw = maxCardCount
			cy.drawCardFromDeck(shuffledDeckKeys.SDS, cardsToDraw)
			cy.reshuffleDeck(shuffledDeckKeys.SDS, 'true')
			cy.verifyReshuffleRemainingAllDrawnCards()
		})

		it('Reshuffle deck that has jokers without the drawn cards after drawing all the cards', () => {
			const cardsToDraw = maxCardCountWithJokers
			cy.drawCardFromDeck(shuffledDeckKeys.SDSJ, cardsToDraw)
			cy.reshuffleDeck(shuffledDeckKeys.SDSJ, 'true')
			cy.verifyReshuffleRemainingAllDrawnCards(true)
		})

		it('Reshuffle two decks without the drawn cards after drawing no cards', () => {
			cy.reshuffleDeck(shuffledDeckKeys.DDS, 'true')
			cy.verifyReshuffleRemainingNoDrawnCards(false, 2)
		})

		it('Reshuffle two decks that has jokers without the drawn cards after drawing no cards', () => {
			cy.reshuffleDeck(shuffledDeckKeys.DDSJ, 'true')
			cy.verifyReshuffleRemainingNoDrawnCards(true, 2)
		})

		it('Reshuffle two decks without the drawn cards after drawing 1 card', () => {
			const cardsToDraw = 1
			cy.drawCardFromDeck(shuffledDeckKeys.DDS, cardsToDraw)
			cy.reshuffleDeck(shuffledDeckKeys.DDS, 'true')
			cy.verifyRemainingCards(shuffledDeckKeys.DDS)
		})

		it('Reshuffle two decks that has jokers without the drawn cards after drawing 1 card', () => {
			const cardsToDraw = 1
			cy.drawCardFromDeck(shuffledDeckKeys.DDSJ, cardsToDraw)
			cy.reshuffleDeck(shuffledDeckKeys.DDSJ, 'true')
			cy.verifyRemainingCards(shuffledDeckKeys.DDSJ)
		})

		it('Reshuffle two decks without the drawn cards after drawing half the card', () => {
			const cardsToDraw = maxCardCount / 2
			cy.drawCardFromDeck(shuffledDeckKeys.DDS, cardsToDraw)
			cy.reshuffleDeck(shuffledDeckKeys.DDS, 'true')
			cy.verifyRemainingCards(shuffledDeckKeys.DDS)
		})

		it('Reshuffle two decks that has jokers without the drawn cards after drawing half the cards', () => {
			const cardsToDraw = maxCardCountWithJokers / 2
			cy.drawCardFromDeck(shuffledDeckKeys.DDSJ, cardsToDraw)
			cy.reshuffleDeck(shuffledDeckKeys.DDSJ, 'true')
			cy.verifyRemainingCards(shuffledDeckKeys.DDSJ)
		})

		it('Reshuffle two decks without the drawn cards after drawing all the cards', () => {
			const cardsToDraw = maxCardCount * 2
			cy.drawCardFromDeck(shuffledDeckKeys.DDS, cardsToDraw)
			cy.reshuffleDeck(shuffledDeckKeys.DDS, 'true')
			cy.verifyReshuffleRemainingAllDrawnCards(false, 2)
		})

		it('Reshuffle two decks that has jokers without the drawn cards after drawing all the cards', () => {
			const cardsToDraw = maxCardCountWithJokers * 2
			cy.drawCardFromDeck(shuffledDeckKeys.DDSJ, cardsToDraw)
			cy.reshuffleDeck(shuffledDeckKeys.DDSJ, 'true')
			cy.verifyReshuffleRemainingAllDrawnCards(true, 2)
		})
	})

	context('Partial Decks', () => {
		it('A partial deck has the specified cards where one card is from each suit', () => {
			cy.fixture(decksFixturePath).then((decks) => {
				const partialDeckCards = decks[partialDeckKeys.PD].cards.split(',')
				const cardsExpectedToDraw = partialDeckCards.length
				cy.drawCardFromDeck(partialDeckKeys.PD, cardsExpectedToDraw)
				cy.verifyPartialDeck(partialDeckCards)
			})
		})
	})

	context('Piles', () => {
		it('Draw one card from a one-card pile by count', () => {
			const cardsToDrawFromDeck = 1
			const pileName = 'test_pile'
			const pilesExpected = [{ name: pileName, remaining: cardsToDrawFromDeck }]

			cy.drawCardFromDeck(shuffledDeckKeys.SDS, cardsToDrawFromDeck)
			cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
				const cardCode = `${drawDeckResp.body.cards[0].code}`
				cy.addCardsToPile(shuffledDeckKeys.SDS, pileName, cardCode)
				cy.verifyAddToPile(pileName, cardsToDrawFromDeck)
				// Check that shuffling a one-card pile doesn't do anything.
				cy.reshufflePile(shuffledDeckKeys.SDS, pileName)
				cy.verifyShufflePile(pileName, cardsToDrawFromDeck)
				cy.listCardsInPile(shuffledDeckKeys.SDS, pileName)
				cy.verifyListingPile(pileName, pilesExpected)
				cy.drawCardFromPile(shuffledDeckKeys.SDS, pileName, cardsToDrawFromDeck)
				cy.verifyDrawFromPile(pileName, cardsToDrawFromDeck)
			})
		})

		it('Draw one card from a one-card pile by its card code', () => {
			const cardsToDrawFromDeck = 1
			const pileName = 'test_pile'
			const pilesExpected = [{ name: pileName, remaining: cardsToDrawFromDeck }]

			cy.drawCardFromDeck(shuffledDeckKeys.SDS, cardsToDrawFromDeck)
			cy.get('@recentDrawDeckResp').then((drawDeckResp) => {
				const cardCode = `${drawDeckResp.body.cards[0].code}`
				cy.addCardsToPile(shuffledDeckKeys.SDS, pileName, cardCode)
				cy.verifyAddToPile(pileName, cardsToDrawFromDeck)
				cy.listCardsInPile(shuffledDeckKeys.SDS, pileName)
				cy.verifyListingPile(pileName, pilesExpected)
				cy.drawCardFromPile(
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

			cy.drawCardFromDeck(shuffledDeckKeys.SDS, cardsToDrawFromDeck)
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
				cy.reshufflePile(shuffledDeckKeys.SDS, pileName)
				cy.verifyShufflePile(pileName, cardsToDrawFromDeck)
				cy.drawCardFromPile(shuffledDeckKeys.SDS, pileName, cardsToDrawFromDeck)
				cy.verifyDrawFromPile(pileName, cardsToDrawFromDeck)
			})
		})

		it('Draw all cards from a whole-deck shuffled pile by their card codes', () => {
			const cardsToDrawFromDeck = maxCardCountWithJokers
			const pileName = 'test_pile'
			const pilesExpected = [{ name: pileName, remaining: cardsToDrawFromDeck }]

			cy.drawCardFromDeck(shuffledDeckKeys.SDSJ, cardsToDrawFromDeck)
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
				cy.reshufflePile(shuffledDeckKeys.SDSJ, pileName)
				cy.verifyShufflePile(pileName, cardsToDrawFromDeck)
				cy.drawCardFromPile(shuffledDeckKeys.SDSJ, pileName, cardCodes)
				cy.verifyDrawFromPile(pileName, cardCodes)
			})
		})

		it('Put half of the shuffled deck in one pile, shuffle the cards in the first pile, bring half of those cards in the first pile to a second pile, and then draw all cards in the second pile from the bottom of it by card count', () => {
			const cardsToDrawFromDeck = maxCardCount / 2
			const firstPileName = 'first_test_pile'
			const secondPileName = 'second_test_pile'

			cy.drawCardFromDeck(shuffledDeckKeys.SDS, cardsToDrawFromDeck)
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
				cy.reshufflePile(shuffledDeckKeys.SDS, firstPileName)
				cy.verifyShufflePile(firstPileName, cardsToDrawFromDeck)
				cy.addCardsToPile(
					shuffledDeckKeys.SDS,
					secondPileName,
					secondCardCodesHalf
				)
				cy.verifyAddToPile(secondPileName, cardsToDrawFromDeck / 2)
				cy.drawCardFromPile(
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

			cy.drawCardFromDeck(shuffledDeckKeys.SDS, cardsToDrawFromDeck)
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
				cy.reshufflePile(shuffledDeckKeys.SDS, secondPileName)
				cy.verifyShufflePile(secondPileName, cardsToDrawFromDeck / 2)
				cy.addCardsToPile(
					shuffledDeckKeys.SDS,
					firstPileName,
					secondCardCodesHalf
				)
				cy.verifyAddToPile(firstPileName, cardsToDrawFromDeck)
				cy.reshufflePile(shuffledDeckKeys.SDS, firstPileName)
				cy.verifyShufflePile(firstPileName, cardsToDrawFromDeck)
				cy.drawCardFromPile(
					shuffledDeckKeys.SDS,
					firstPileName,
					cardsToDrawFromDeck,
					'random'
				)
				cy.verifyDrawFromPile(firstPileName, cardsToDrawFromDeck)
			})
		})
	})
})
