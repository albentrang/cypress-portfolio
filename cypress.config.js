const { defineConfig } = require('cypress')

module.exports = defineConfig({
	reporter: 'cypress-mochawesome-reporter',
	reporterOptions: {
		charts: true,
		embeddedScreenshots: true,
		inlineAssets: true
	},
	e2e: {
		setupNodeEvents(on, config) {
			require('cypress-mochawesome-reporter/plugin')(on)
			return config
		},
		baseUrl: 'https://example.cypress.io/',
		defaultBrowser: 'firefox',
		watchForFileChanges: false
	}
})
