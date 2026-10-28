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

// The package's types only cover `spawn` and `spawn.sync`
declare module 'cross-spawn/lib/parse.js' {
  import type {SpawnOptions} from 'node:child_process';

  /** What to pass to `spawn` instead, changed on Windows to run through `cmd.exe` when needed */
  export interface ParsedCommand {
    command: string;
    args: string[];
    options: SpawnOptions;
  }

  const parse: (command: string, args?: readonly string[], options?: SpawnOptions) => ParsedCommand;
  export default parse;
}

declare module 'cross-spawn/lib/enoent.js' {
  import type {ParsedCommand} from 'cross-spawn/lib/parse.js';

  /** An `ENOENT` error on Windows when `cmd.exe` exited with `1` and the command wasn't found */
  export const verifyENOENT: (
    status: number | null,
    parsed: ParsedCommand,
  ) => NodeJS.ErrnoException | null;
}

declare module '@sindresorhus/slugify/overridable-replacements.js' {
  const overridableReplacements: readonly (readonly [string, string])[];
  export default overridableReplacements;
}
