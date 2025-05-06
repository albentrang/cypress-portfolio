/* Custom commands for the Deck of Cards API project. */
Cypress.Commands.addAll({
	/**
	 * Checks if the given list of decks that were created are
	 * still available. If not, create those decks using each
	 * deck's defined attributes.
	 * @param {string} path The file path that goes to the file
	 * containing an object with other objects for the decks
	 * to be used.
	 */
	checkDecks(path) {
		cy.readFile(path).then((decksJson) => {
			cy.wrap(Object.entries(decksJson)).as('decks')
			cy.get('@decks').each((deck) => {
				cy.wrap({}).as('objCopy')
				cy.log(deck[1].id)

				cy.get('@objCopy').then((objCopy) => {
					deck[1].id = 55
					Object.defineProperty(objCopy, `${deck[0]}`, {
						value: { ...deck[1] }
					})
					cy.writeFile(path, Object.assign(decksJson, objCopy))
				})
			})

			// for (const [key, value] of Object.entries(decks)) {
			// 	cy.request({
			// 		url: `api/deck/${value.id}`,
			// 		failOnStatusCode: false
			// 	}).then((response) => {
			// 		if (response.status !== 200) {
			// 			cy.log(`${key}: ${value.id}`)
			// 			cy.writeFile('test_file.txt', 'Hi, those!')
			// 		}
			// 	})
			// }
		})
	}
})
