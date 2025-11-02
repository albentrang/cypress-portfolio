const { defineConfig } = require('cypress')
const cypressOnFix = require('cypress-on-fix')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const {
	addCucumberPreprocessorPlugin
} = require('@badeball/cypress-cucumber-preprocessor')
const {
	createEsbuildPlugin
} = require('@badeball/cypress-cucumber-preprocessor/esbuild')

module.exports = defineConfig({
	reporter: 'cypress-mochawesome-reporter',
	reporterOptions: {
		charts: true,
		embeddedScreenshots: true,
		inlineAssets: true
	},
	e2e: {
		async setupNodeEvents(on, config) {
			config.defaultCommandTimeout = 2000
			on = cypressOnFix(on)

			require('cypress-mochawesome-reporter/plugin')(on)

			await addCucumberPreprocessorPlugin(on, config)
			on(
				'file:preprocessor',
				createBundler({
					plugins: [createEsbuildPlugin(config)]
				})
			)

			return config
		},
		defaultBrowser: 'electron'
	}
})
