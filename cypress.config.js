const { defineConfig } = require('cypress')

module.exports = defineConfig({
	e2e: {
		baseUrl: 'https://example.cypress.io/',
		defaultBrowser: 'firefox',
		watchForFileChanges: false
	}
})
