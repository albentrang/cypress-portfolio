# Deck of Cards API Test Plan

## Test Objective

This document plans the positive and negative test cases when using the [Deck of Cards API](https://www.deckofcardsapi.com/). Each test case uses REST API requests and checks their responses for using different functions that are listed in the Deck of Cards API website.

## Test Approach

- Testing will be automated end-to-end REST API black-box testing.
- Every test, both positive and negative, needs to pass.
- Tests are done using JavaScript and Cypress.
- Deliverable will be a generated report using Mocha.

## Positive Tests

- [x] Check each card is in order for an unshuffled deck
- [x] Check each card is in order for an unshuffled deck with jokers
- [ ] Draw 1 card at a time from a shuffled deck until all cards are drawn
- [ ] Draw 1 card at a time from a shuffled deck with jokers until all cards are drawn
- [ ] Draw 1 card at a time from two shuffled decks until all cards are drawn
- [ ] Draw 1 card at a time from two shuffled decks with jokers until all cards are drawn
- [ ] Draw all the cards at once from a shuffled deck
- [ ] Draw all the cards at once from a shuffled deck with jokers
- [ ] Draw all the cards at once from two shuffled decks
- [ ] Draw all the cards at once from two shuffled decks with jokers
- [ ] Reshuffle deck without the drawn cards after drawing 0 cards
- [ ] Reshuffle deck without the drawn cards after drawing 1 card
- [ ] Reshuffle deck without the drawn cards after drawing half the cards
- [ ] Reshuffle two decks without the drawn cards after drawing half the cards
- [ ] Reshuffle deck without the drawn cards after drawing all the cards
- [ ] Reshuffle two decks without the drawn cards after drawing all the cards
- [ ] Reshuffle deck that had jokers without the drawn cards after drawing all the cards
- [ ] Reshuffle two decks that had jokers without the drawn cards after drawing all the cards
- [ ] Ten cards specified that are unique to each other are in a partial deck
- [ ] Draw one card from a one-card pile by count
- [ ] Draw one card from a one-card pile by its card code
- [ ] Draw all cards from a whole-deck pile one at a time by count
- [ ] Draw all cards from a whole-deck pile one at a time by their card codes
- [ ] Draw all cards from a whole-deck shuffled pile all at once
- [ ] Draw all cards from a whole-deck shuffled pile that includes jokers all at once
- [ ] Draw all cards from a whole-deck pile one at a time from the bottom of the pile
- [ ] Draw all cards from a whole-deck pile one at a time at random
- [ ] Put half of the shuffled deck in one pile and the rest of the cards are in another pile, then draw all cards in each pile by their card codes
- [ ] Put half of the shuffled deck in one shuffled pile and the rest of the cards are in another shuffled pile, then draw all cards in each pile by count
- [ ] Draw a card from a shuffled deck and then return it to the deck
- [ ] Draw all cards from a shuffled deck and then return it to the deck
- [ ] Draw all cards from a shuffled deck with jokers and then return it to the deck
- [ ] Draw a card from a shuffled deck, put it in a pile, and then return it to the deck
- [ ] Draw all cards from a shuffled deck, put them in a pile, and then return it to the deck
- [ ] Draw all cards from a shuffled deck with jokers, put them in a pile, and then return it to the deck
- [ ] Draw a card from a shuffled deck and then return it to the deck using its card code
- [ ] Draw all cards from a shuffled deck and then return it to the deck using their card codes
- [ ] Draw all cards from a shuffled deck with jokers and then return it to the deck using their card codes
- [ ] Draw a card from a shuffled deck, put it in a pile, and then return it to the deck using its card code
- [ ] Draw all cards from a shuffled deck, put them in a pile, and then return it to the deck using their card codes
- [ ] Draw all cards from a shuffled deck with jokers, put them in a pile, and then return it to the deck using their card codes

## Negative Tests

- [x] Draw a card from a deck that does not exist
- [ ] Make a new deck with "deck_count" equal to 0
- [ ] Make a new deck with "deck_count" equal to -1
- [ ] Draw -1 cards from a shuffled deck
- [ ] Draw -1 cards from a shuffled deck with jokers
- [ ] Draw -1 cards from two shuffled decks
- [ ] Draw -1 cards from two shuffled decks with jokers
- [ ] Draw 0 cards from a shuffled deck
- [ ] Draw 0 cards from a shuffled deck with jokers
- [ ] Draw 0 cards from two shuffled decks
- [ ] Draw 0 cards from two shuffled decks with jokers
- [ ] Draw 53 cards from a shuffled deck
- [ ] Draw 55 cards with jokers from a shuffled deck
- [ ] Draw 105 cards from two shuffled decks
- [ ] Draw 109 cards from two shuffled decks with jokers
- [ ] Cards specified that duplicate other specified cards or not part of a standard deck are ignored for a partial deck
- [ ] Draw -1 cards from a pile
- [ ] Draw 5 cards from a pile that only has 4 cards in it
- [ ] Add no specified cards to a partial deck
- [ ] Add no specified cards to a pile
- [ ] Add no specified cards when returning drawn cards
- [ ] Add no specified cards when returning drawn cards from a pile

## Notes

- Setting the "count" query parameter to 0 when drawing from piles will actually draw all the cards from the pile.
- The function that returns drawn cards to the deck does not work with multiple decks because that function does not take duplicate cards that are already in the deck.
