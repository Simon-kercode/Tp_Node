module.exports = [
  {
    files: ["**/*.js", "*.vue"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { require: true, module: true },
    },
    env: {
      node: true,
      es2021: true,
    },
    plugins: {},
    rules: {
      // Ajoute tes règles ici
    },
  },
];