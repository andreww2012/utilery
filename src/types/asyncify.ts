import type {Asyncify as AsyncifyBase} from 'type-fest';

/**
 * A function type with the same parameters, returning a `Promise` of the
 * result.
 * Handy to type the async version of a sync function without repeating its
 * types.
 * @example
 * declare function loadConfigSync(path: string): Config;
 * type LoadConfig = Asyncify<typeof loadConfigSync>;
 * //=> (path: string) => Promise<Config>
 */
export type Asyncify<
  // eslint-disable-next-line ts/no-explicit-any -- the same constraint as the type it is built on
  FunctionType extends (...arguments_: any[]) => any,
> = AsyncifyBase<FunctionType>;
