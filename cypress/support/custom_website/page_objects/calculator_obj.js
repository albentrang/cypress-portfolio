let instance

/**
 * Singleton object representing the Calculator page of my custom website.
 */
class Calculator {
	constructor() {
		if (!instance) {
			instance = this
		}
	}
}

export default Object.freeze(new Calculator())
