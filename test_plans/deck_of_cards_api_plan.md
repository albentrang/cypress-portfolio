# Deck of Cards API Test Plan

## Test Objective

This document plans the positive and negative test cases when using the [Deck of Cards API](https://www.deckofcardsapi.com/). Each test case uses REST API requests and checks their responses for using different functions that are listed in the Deck of Cards API website.

### Test Approach

- Testing will be automated end-to-end REST API black-box testing.
- Every test, both positive and negative, needs to pass.
- Tests are done using JavaScript and Cypress.
- Deliverable will be a generated report using Mocha.

## Positive Tests

### Unshuffled Decks

- [x] Check each card is in order for an unshuffled deck
- [x] Check each card is in order for an unshuffled deck with jokers

### Shuffled Decks

- [x] Draw 1 card at a time from a shuffled deck 10 times
- [x] Draw 1 card at a time from a shuffled deck with jokers 20 times
- [x] Draw 2 card at a time from two shuffled decks 10 times
- [x] Draw 2 card at a time from two shuffled decks with jokers 20 times
- [x] Draw all the cards at once from a shuffled deck
- [x] Draw all the cards at once from a shuffled deck with jokers
- [x] Draw all the cards at once from two shuffled decks
- [x] Draw all the cards at once from two shuffled decks with jokers

### Shuffle Main Stack of Deck Only

- [x] Shuffle deck without the drawn cards after drawing no cards
- [x] Shuffle deck that has jokers without the drawn cards after drawing no cards
- [x] Shuffle deck without the drawn cards after drawing 1 card
- [x] Shuffle deck that has jokers without the drawn cards after drawing 1 card
- [x] Shuffle deck without the drawn cards after drawing half the cards
- [x] Shuffle deck that has jokers without the drawn cards after drawing half the cards
- [x] Shuffle deck without the drawn cards after drawing all the cards
- [x] Shuffle deck that has jokers without the drawn cards after drawing all the cards
- [x] Shuffle two decks without the drawn cards after drawing no cards
- [x] Shuffle two decks that has jokers without the drawn cards after drawing no cards
- [x] Shuffle two decks without the drawn cards after 1 card
- [x] Shuffle two decks that have jokers without the drawn cards after 1 card
- [x] Shuffle two decks without the drawn cards after drawing half the cards
- [x] Shuffle two decks that have jokers without the drawn cards after drawing half the cards
- [x] Shuffle two decks without the drawn cards after drawing all the cards
- [x] Shuffle two decks that have jokers without the drawn cards after drawing all the cards

### Pardial Decks

- [x] A partial deck has the specified cards where one card is from each suit
- [x] A "partial" deck has the specified cards where there is only one card
- [x] A "partial" deck has the specified cards where all cards, except jokers, are in it

### Piles

- [x] Draw one card from a one-card pile by count
- [x] Draw one card from a one-card pile by its card code
- [x] Draw all cards from a whole-deck shuffled pile by count
- [x] Draw all cards from a whole-deck shuffled pile that includes jokers by their card codes
- [x] Put half of the shuffled deck in one pile, shuffle the cards in the first pile, bring half of those cards in the first pile to a second pile, and then draw all cards in the second pile from the bottom of it by card count
- [x] Put half of the shuffled deck in one pile, bring half of those cards in the first pile to a second pile, shuffle the cards in the second pile, take those cards back to the first pile, shuffle the cards in the first pile, and then draw all cards in the first pile randomly by card count

### Return Cards

- [x] Draw a card from a shuffled deck and then return it to the deck
- [x] Draw all cards from a shuffled deck and then return all cards to the deck
- [x] Draw all cards from a shuffled deck with jokers and then return all cards to the deck
- [x] Draw a card from a shuffled deck, put it in a pile, and then return it to the deck
- [x] Draw all cards from a shuffled deck, put half of them in a pile, and then return all of the pile cards to the deck
- [x] Draw all cards from a shuffled deck with jokers, put all of them in a pile, and then return all of the pile cards to the deck
- [x] Draw a card from a shuffled deck and then return it to the deck using its card code
- [x] Draw all cards from a shuffled deck and then return half of them to the deck using their card codes
- [x] Draw all cards from a shuffled deck with jokers and then return half of them to the deck using their card codes
- [x] Draw a card from a shuffled deck, put it in a pile, and then return it to the deck using its card code
- [x] Draw all cards from a shuffled deck, put half of them in a pile, and then return half of the pile cards to the deck using their card codes
- [x] Draw all cards from a shuffled deck with jokers, put them half of them in a pile, and then return half of the pile cards to the deck using their card codes

## Negative Tests

### New Deck Error Handling

- [x] Make a new deck with "deck_count" equal to 0
- [x] Make a new deck with "deck_count" equal to -1
- [x] Make a new shuffled deck with "deck_count" equal to 0
- [x] Make a new shuffled deck with "deck_count" equal to -1
- [x] Make a new deck with jokers with "deck_count" equal to 0
- [x] Make a new deck with jokers with "deck_count" equal to -1
- [x] Make a new shuffled deck with jokers with "deck_count" equal to 0
- [x] Make a new shuffled deck with jokers with "deck_count" equal to -1

### Drawing Cards from Decks Error Handling

- [x] Draw a card from a deck that does not exist
- [x] Draw 0 cards from a shuffled deck
- [x] Draw 0 cards from a shuffled deck with jokers
- [x] Draw 0 cards from two shuffled decks
- [x] Draw 0 cards from two shuffled decks with jokers
- [x] Draw 53 cards from a shuffled deck
- [x] Draw 55 cards with jokers from a shuffled deck
- [x] Draw 105 cards from two shuffled decks
- [x] Draw 109 cards from two shuffled decks with jokers

### Piles Error Handling

- [x] Add no specified cards to a pile
- [x] Draw 1 card from a pile that has no cards in it from a single shuffled deck
- [x] Draw 1 card from the bottom of a pile that has no cards in it from a single shuffled deck
- [x] Draw 1 card at random from a pile that has no cards in it from a single shuffled deck
- [x] Draw 53 cards from a pile that only has 52 cards in it from a single shuffled deck
- [x] Draw 53 cards from the bottom of a pile that only has 52 cards in it from a single shuffled deck
- [x] Draw 53 cards at random from a pile that only has 52 cards in it from a single shuffled deck
- [x] Draw 55 cards from a pile that only has 54 cards in it from a single shuffled deck with jokers
- [x] Draw 55 cards from the bottom of a pile that only has 54 cards in it from a single shuffled deck with jokers
- [x] Draw 55 cards at random from a pile that only has 54 cards in it from a single shuffled deck with jokers

## Notes

- Negative tests will not test error responses with code 500.
- Shuffling a deck with the "remaining" query parameter set to anything other than "true" will execute a regular shuffle of the entire deck.
- Setting the "count" query parameter to a negative number when drawing cards from a deck will draw the max number
  of cards minus the "count" parameter as long as the absolute value from the negative number is less than the number of cards remaining in the deck.
- Partial decks cannot contain joker cards.
- Using the function that lists cards from a pile by specifying its name will have an attribute called "cards" that lists all the cards in that pile. The other piles will not have that attribute.
- Setting the "count" query parameter to 0 when drawing from piles will actually draw no cards from the pile. Also, setting the "count" query parameter to a negative number when drawing cards from a pile will draw the max number of cards minus the "count" parameter as long as the absolute value from the negative number is less than the number of cards remaining in the deck.
- The function that returns drawn cards to the deck does not work with multiple decks because that function does not take duplicate cards that are already in the deck.
- The function that returns cards, either drawn or from a pile, to the deck does not put those cards in order on top of the deck if the deck has been shuffled.
