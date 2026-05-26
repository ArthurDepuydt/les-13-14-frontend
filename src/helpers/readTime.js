export function calculateReadTime(text) {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round((wordCount / 100) * 0.3));
}
