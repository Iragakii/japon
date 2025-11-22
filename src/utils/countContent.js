// Utility helpers to count words or lines from a DOM element that contains
// the content inside a `.count` div. Exported functions are safe to call in
// the browser environment (React running in the client).

export function countWordsFromElement(el) {
  if (!el) return 0;
  const text = el.textContent || '';
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (!cleaned) return 0;
  return cleaned.split(' ').filter(Boolean).length;
}

export function countLinesFromElement(el) {
  if (!el) return 0;
  // Split innerHTML on <br> tags to count visual lines. Remove any HTML tags
  // inside each segment and trim whitespace.
  const html = el.innerHTML || '';
  const parts = html
    .split(/<br\s*\/?\s*>/i)
    .map((s) => s.replace(/<[^>]+>/g, '').trim())
    .filter(Boolean);
  return parts.length;
}

export function countBeforeColonFromElement(el) {
  if (!el) return 0;
  // Use innerHTML so we can split on <br> boundaries when authors use <br>.
  const html = el.innerHTML || '';
  const parts = html
    .split(/<br\s*\/?\s*>/i)
    .map((s) => s.replace(/<[^>]+>/g, '').trim())
    .filter(Boolean); // Remove empty lines

  let count = 0;
  const colonRegex = /[:：]/; // match ASCII or full-width colon
  for (const part of parts) {
    // Count each part that has content before a colon
    if (colonRegex.test(part)) {
      const before = part.split(colonRegex)[0].trim();
      if (before.length > 0) count += 1;
    }
  }
  return count;
}

export default function getCountForElement(el, { mode = 'words' } = {}) {
  if (!el) return 0;
  if (mode === 'lines') return countLinesFromElement(el);
  if (mode === 'beforeColon') return countBeforeColonFromElement(el);
  return countWordsFromElement(el);
}
