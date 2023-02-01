module.exports = {
  root: true,
  extends: [
    '@react-native-community', 
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'unused-imports'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'prettier/prettier': [
          'error',
          {
            quoteProps: 'consistent',
            singleQuote: true,
            tabWidth: 2,
            trailingComma: 'es5',
            useTabs: false,
          },
        ],

        //typescript rules

        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "error",
        "@typescript-eslint/no-parameter-properties": "error",
        // making this an error going forward
        "@typescript-eslint/no-unused-vars": "error",

        // import rules
        "import/first": "error",
        "import/newline-after-import": "error",
        "import/no-cycle": "warn",
        "import/no-useless-path-segments": "error",

        //eslint
        curly: "error",
        eqeqeq: "error",
        "no-implicit-coercion": ["error", { boolean: false }],
        // has false positives
        "no-shadow": "off",
        // replaced with this
        "@typescript-eslint/no-shadow": "error",

        "no-unused-expressions": "error",
        "no-useless-computed-key": "error",
      },
    },
  ],
};
