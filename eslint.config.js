module.exports = [
  {
    files: ["**/*.js", "*.vue"],
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