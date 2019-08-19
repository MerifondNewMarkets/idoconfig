module.exports = {
    "env": {
        "browser": true,
        "es6": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "project": "./tsconfig.json",
    },
    "rules": {
        "eol-last": ["error", "always"],
        "quotes": ["warn", 'double'],
        "no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 0 }],
        "@typescript-eslint/array-type": ["error", "array-simple"],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/interface-name-prefix": ["warn", "always"],
        "@typescript-eslint/no-parameter-properties": "off",
    }
};