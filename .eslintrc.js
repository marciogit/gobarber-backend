module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb-base"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "class-methods-use-this": "off",
		"no-param-reassign": "off",
		"no-undef": "off",
		"no-unused-vars": "off",
        "camelcase": "off",
		"no-unused-vars": ["error", {"argsIgnorePattern": "next"}],
		'no-tabs': 'off',
		'indent': 'off'
    }
};
