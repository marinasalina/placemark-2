import sanitizeHtml from "sanitize-html";
//Removes HTML tags completely
export function sanitizeText(input: unknown): string {
  return sanitizeHtml(String(input || ""), {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();
}
