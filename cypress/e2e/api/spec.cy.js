describe('Base Spec', () => {
	before(() => {
		cy.visit('')
	})

	it('Visit Cypress Example Website', () => {
		cy.url().should('equal', Cypress.config('baseUrl'))
	})
})
