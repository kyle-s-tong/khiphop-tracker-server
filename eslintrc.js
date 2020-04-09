module.exports = {
	"env": {
		"es6": true,
		"node": true,
		"mocha": true
	},
	"extends": [
	  "airbnb-base"
    ],
	"parserOptions": {
		"ecmaVersion": 2017,
		"sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        }
	},
	"parser": "babel-eslint",
	"rules": {
		"import/first": 1,
		"no-param-reassign":1,
		"prefer-destructuring": 1,
		"no-shadow": 1,
		"no-unused-vars": 1,
		"no-case-declarations": 1,
		"default-case": 1,
		"no-use-before-define": 1,
		"no-sequences": 1,
		"no-return-assign": 1,
		"no-return-await": 1,
		"max-len": 1,
		"radix": 1,
		"class-methods-use-this": 1,
		"no-tabs": 1,
		"no-underscore-dangle": 1,
		"prefer-promise-reject-errors": 1,
		"consistent-return": 1,
		"import/no-named-as-default-member": 1,
		"import/no-duplicates": 1,
		"no-undef": 1,
		"no-prototype-builtins": 1,
		"no-restricted-syntax": 1,
		"no-useless-escape": 1,
		"no-mixed-operators": 1,
		"no-mixed-spaces-and-tabs": 1,
		"no-continue": 1,
		"symbol-description": 1,
		"camelcase": 1,
		"array-callback-return": 1,
		"no-buffer-constructor": 1,
		"import/prefer-default-export": 1,
		"no-plusplus": 1,
	}
}
