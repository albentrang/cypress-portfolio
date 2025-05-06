# Deck of Cards API Test Plan

## Summary

This document plans the positive and negative test cases when using the [Deck of Cards API](https://www.deckofcardsapi.com/). Each test case uses REST API requests and checks their responses for using different functions that are listed in the Deck of Cards API website.

## Positive Tests

- [ ] Check each card is in order for an unshuffled deck
- [ ] Check each card is unique and part of a standard, shuffled deck
- [ ] Check each card is unique and part of two standard, shuffled decks
- [ ] Check each card is in order for an unshuffled deck with jokers
- [ ] Check each card is unique and part of a standard, shuffled deck with jokers
- [ ] Check each card is unique and part of two standard, shuffled decks with jokers
- [ ] Draw ten, fifteen, then twenty cards from a shuffled deck
- [ ] Reshuffle deck without the drawn cards after drawing half the cards
- [ ] Reshuffle deck without the drawn cards after drawing all the cards
- [ ] Cards specified that are unique to each other are in a partial deck
- [ ] Cards specified where there is at least one card duplicate to another one or not part of a standard deck are ignored
- [ ] Draw five cards and add them to a pile, and then shuffle the pile
- [ ] Add drawn cards to two piles, and then shuffle each pile
- [ ] Draw five cards from deck, add them to a pile, and then draw all cards by their card codes from that pile
- [ ] Draw five cards from deck, add them to a pile, and then draw all cards one at a time from that pile
- [ ] Draw six cards from deck, add them to a pile, and then draw all cards two at a time from that pile
- [ ] Draw seven cards from deck, add them to a pile, and then draw all cards at once from that pile
- [ ] Draw five cards from deck, add them to a pile, and then draw all cards one at a time from the bottom that pile
- [ ] Draw six cards from deck, add them to a pile, and then draw all cards two at a time from the bottom that pile
- [ ] Draw seven cards from deck, add them to a pile, and then draw all cards at once from the bottom that pile
- [ ] Draw five cards from deck, add them to a pile, and then draw all cards one at a time at random from that pile
- [ ] Draw six cards from deck, add them to a pile, and then draw all cards two at a time at random from that pile
- [ ] Draw seven cards from deck, add them to a pile, and then draw all cards at once at random from that pile
- [ ] Draw five cards from deck, and then return them all to the deck
- [ ] Draw three cards from deck, and then return the first and third drawn cards to the deck
- [ ] Draw five cards from deck, add them to a pile, and then return the cards in the pile to the deck
- [ ] Draw three cards from deck, add them to a pile, and then return the first and third cards in the pile to the deck

## Negative Tests

- [ ] Draw a card from a deck that does not exist
- [ ] Make a new deck with "deck_count" equal to 0
- [ ] Add no specified cards to a pile

## Notes

- Setting the "count" query parameter to 0 when drawing from piles will actually draw all the cards from the pile.
- The function that returns drawn cards to the deck does not work with multiple decks because that function does not take duplicate cards that are already in the deck.
