let instance

/**
 * Singleton object representing the Calculator page of my custom website.
 */
class CalculatorPage {
	constructor() {
		if (!instance) {
			instance = this
		}
	}

	enterNumber(numStr) {
		for (const digit of numStr) {
			if (digit === '.') {
				cy.getByCy('btn-decimal').realClick()
			} else if (digit >= '0' && digit <= '9') {
				cy.getByCy(`btn-${digit}`).realClick()
			}
		}
		if (numStr.startsWith('-')) {
			cy.getByCy('btn-sign-change').realClick()
		}
	}

	pressAdd() {
		cy.getByCy('btn-add').realClick()
	}

	pressSubtract() {
		cy.getByCy('btn-subtract').realClick()
	}

	pressMultiply() {
		cy.getByCy('btn-multiply').realClick()
	}

	pressDivide() {
		cy.getByCy('btn-divide').realClick()
	}

	pressModulo() {
		cy.getByCy('btn-modulo').realClick()
	}

	pressClear() {
		cy.getByCy('btn-clear').realClick()
	}

	pressClearEntry() {
		cy.getByCy('btn-clear-entry').realClick()
	}

	pressEquals() {
		cy.getByCy('btn-equals').realClick()
	}

	getDisplayResult() {
		return cy.getByCy('calc-display').invoke('val')
	}
}

export default Object.freeze(new CalculatorPage())
