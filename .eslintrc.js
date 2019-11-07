module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/jsx-props-no-spreading": "off",
        "react/prop-types" : "off",
        "react/no-array-index-key" : "off",
        "no-plusplus" : "off",
        "jsx-a11y/label-has-associated-control": [ "error", {
            "required": {
              "some": [ "nesting", "id"  ]
            }
          }],
    }
};