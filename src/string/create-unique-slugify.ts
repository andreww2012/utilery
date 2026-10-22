import {type SlugifyOptions, slugify} from './slugify.ts';

/**
 * Creates a `slugify` function that never returns the same slug twice: a
 * repeated slug gets a counter suffix (`foo`, `foo-2`, `foo-3`), like heading
 * IDs on GitHub. A suffix is never reused, even when the text itself ends with
 * a number (`foo 2` after two `foo`s gives `foo-2-2`). Slugs differing only in
 * case count as the same.
 *
 * Each created function counts on its own; call its `reset` method to start
 * over. Empty slugs are not counted and stay empty. See `slugify` for how text
 * is turned into a slug and for the options.
 * @returns A `slugify` function with a counter and a `reset` method.
 * @example
 * const slugifyHeading = createUniqueSlugify();
 * slugifyHeading('Usage');
 * // 'usage'
 * slugifyHeading('Usage');
 * // 'usage-2'
 * slugifyHeading('Usage 2');
 * // 'usage-2-2'
 * @example
 * // Start over for the next page
 * slugifyHeading.reset();
 * slugifyHeading('Usage');
 * // 'usage'
 */
export const createUniqueSlugify = () => {
  const usedSlugs = new Set<string>();
  // The last counter of each slug, so a long run of the same slug doesn't start from 2 each time
  const lastCounters = new Map<string, number>();

  const uniqueSlugify = (text: string, options?: SlugifyOptions) => {
    const slug = slugify(text, options);
    if (!slug) {
      return slug;
    }

    const key = slug.toLowerCase();
    let counter = lastCounters.get(key) || 1;
    let uniqueSlug = slug;
    while (usedSlugs.has(uniqueSlug.toLowerCase())) {
      counter++;
      uniqueSlug = `${slug}${options?.separator ?? '-'}${counter}`;
    }

    lastCounters.set(key, counter);
    usedSlugs.add(uniqueSlug.toLowerCase());
    return uniqueSlug;
  };

  return Object.assign(uniqueSlugify, {
    reset: () => {
      usedSlugs.clear();
      lastCounters.clear();
    },
  });
};
