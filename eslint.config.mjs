import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin-js";
import jest from "eslint-plugin-jest";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { "@stylistic/js": stylisticJs },
  },
  {
    files: ["__test__/**"],
    plugins: [jest],
    extends: ["plugin:jest/recommended"],
    rules: { "jest/prefer-expect-assertions": "off" },
  },
  {
    rules: {
      "@stylistic/js/semi": ["error", "always"],
      "@stylistic/js/quotes": ["error", "double"],
    },
  },
]);
