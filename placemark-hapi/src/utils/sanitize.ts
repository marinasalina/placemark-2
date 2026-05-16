import sanitizeHtml from "sanitize-html";

export function sanitizeText(input: unknown): string {
  return sanitizeHtml(String(input || ""), {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();
}
