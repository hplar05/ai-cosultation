import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // ... This loads all the rules from 'next/core-web-vitals' and 'next/typescript'
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // This is your existing ignores block
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  // 🎯 ADD THIS NEW CONFIGURATION OBJECT TO DISABLE THE RULES
  {
    rules: {
      // TypeScript-ESLint Rules
      "@typescript-eslint/no-explicit-any": "off", // Disables the 'unexpected any' error
      "@typescript-eslint/no-unused-vars": "off", // Disables the 'defined but never used' warning

      // React Rules
      "react/no-unescaped-entities": "off", // Disables the unescaped apostrophe/entity error
    },
  },
];

export default eslintConfig;