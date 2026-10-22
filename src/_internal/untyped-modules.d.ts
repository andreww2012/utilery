// Packages (or their entrypoints) whose types can't be resolved

declare module '@sindresorhus/slugify/overridable-replacements.js' {
  const overridableReplacements: readonly (readonly [string, string])[];
  export default overridableReplacements;
}
