export function sanitizeInput(input: string): string {
  // Remove any HTML tags
  let sanitized = input.replace(/<[^>]*>?/gm, '');
  
  // Encode special characters
  sanitized = encodeURIComponent(sanitized);
  
  return sanitized;
}
