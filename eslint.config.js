const nextConfig = require('eslint-config-next');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'build/**',
      'dist/**',
      'coverage/**',
      '*.config.js',
      '*.config.ts',
      '*.config.mjs',
    ],
  },
  ...nextConfig,
  prettierConfig,
  {
    rules: {
      // Disable static-components rule - it's a false positive for component constructors
      'react-hooks/static-components': 'off',

      // Suppress overly strict React hooks rules (often false positives)
      // These patterns are acceptable for hydration, mounting, and animation states
      'react-hooks/set-state-in-effect': 'off',

      // Suppress purity warnings for decorative/visual elements
      // Math.random() and Date.now() are acceptable for animations and decorative elements
      'react-hooks/purity': 'warn', // Keep as warning instead of error

      // Suppress Next.js image warnings - sometimes <img> is needed for external images or specific use cases
      '@next/next/no-img-element': 'warn', // Keep as warning instead of error

      // Allow console.log in development (useful for debugging)
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Suppress exhaustive-deps warnings (often false positives)
      'react-hooks/exhaustive-deps': 'warn',

      // Suppress incompatible library warnings (TanStack Table, etc.)
      'react-hooks/incompatible-library': 'warn',

      // Suppress unsupported syntax warnings (inline class declarations)
      'react-hooks/unsupported-syntax': 'warn',

      // Suppress unescaped entities warnings (quotes in JSX)
      'react/no-unescaped-entities': 'warn',

      // Suppress immutability warnings (often false positives for state updates)
      'react-hooks/immutability': 'warn',

      // Suppress React Compiler memoization warnings (often false positives)
      'react-hooks/preserve-manual-memoization': 'warn',
    },
  },
];

