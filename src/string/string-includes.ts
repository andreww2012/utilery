import type {stringStartsWith} from 'ts-extras';

/**
 * Checks whether a string contains another string, like
 * `String.prototype.includes`, but as a type guard: when it returns `true`, a
 * `string` is narrowed to `` `${string}<searched string>${string}` ``, and a
 * union of string literals to the members that contain the searched string.
 * When it returns `false`, the union keeps the other members.
 * The searched string must be a single string literal for that.
 * @param text - The string to search in.
 * @param search - The string to search for.
 * @returns `true` if `text` contains `search`, otherwise `false`.
 * @example
 * declare const page: 'HouseCalendar' | 'SenateCalendar' | 'HouseFirstReading';
 * if (stringIncludes(page, 'Calendar')) {
 *   page; // 'HouseCalendar' | 'SenateCalendar'
 * } else {
 *   page; // 'HouseFirstReading'
 * }
 */
export function stringIncludes<StringType extends string, Search extends string>(
  text: StringType,
  search: Parameters<typeof stringStartsWith<StringType, Search>>[1],
): text is StringType & `${string}${Search}${string}`;

/**
 * Checks whether a string contains another string, like
 * `String.prototype.includes`.
 * @param text - The string to search in.
 * @param search - The string to search for.
 * @param position - The index in `text` to start the search at.
 * Defaults to `0`.
 * @returns `true` if `text` contains `search` at or after `position`, otherwise `false`.
 * @example
 * stringIncludes('hello', 'he', 1);
 * // false
 */
export function stringIncludes(text: string, search: string, position?: number): boolean;

export function stringIncludes(text: string, search: string, position?: number): boolean {
  return text.includes(search, position);
}
