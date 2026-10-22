// Packages (or their entrypoints) whose types can't be resolved

declare module 'puka' {
  export const quoteForShell: (
    text: string,
    shouldForceQuote?: boolean,
    platform?: string,
  ) => string;
}

// Has types, but its `exports` don't point to them
declare module 'parse-package-name' {
  export const parse: (input: string) => {name: string; version: string; path: string};
}

declare module '@sindresorhus/slugify/overridable-replacements.js' {
  const overridableReplacements: readonly (readonly [string, string])[];
  export default overridableReplacements;
}
