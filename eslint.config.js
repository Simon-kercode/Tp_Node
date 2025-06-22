module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        require: true,
        module: true,
        process: true,
        __dirname: true,

      },
    },
    plugins: {},
    rules: {

    },
  },
];