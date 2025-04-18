module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier",
  '@vue/typescript'],

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  rules: {
    "vue/multi-word-component-names": "off",
    "vue/no-unused-components": "off",
    "vue/no-unused-vars": "off",
    "vue/no-unreachable": "off",
    "no-prototype-builtins": "off",
    "no-unused-vars": "off",
    "no-unreachable": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": "off",
    'vue/valid-v-slot': ['error', {
      allowModifiers: true,
    }],
  }
};
