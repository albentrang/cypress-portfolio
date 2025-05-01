import globals from 'globals'
import pluginJs from '@eslint/js'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import pluginCypress from 'eslint-plugin-cypress/flat'

export default [
	{ languageOptions: { globals: globals.node } },
	pluginJs.configs.recommended,
	eslintPluginPrettier,
	pluginCypress.configs.globals,
	{
		rules: {
			'cypress/unsafe-to-chain-command': 'error'
		}
	}
]
