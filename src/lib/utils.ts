/**
 * Utility Functions
 * Made by AMST → https://ataberkdudu.info
 */

/**
 * Generate a URL-friendly slug from a string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generate a unique slug by appending a random string
 */
export function generateUniqueSlug(text: string): string {
  const baseSlug = generateSlug(text);
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${baseSlug}-${randomSuffix}`;
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('tr-TR', {
    timeZone: 'Europe/Istanbul',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Format time for display
 */
export function formatTime(time: string): string {
  return time;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (Turkish format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+90|0)?[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Console log with AMST branding - Call this on app initialization
 */
export function logAMSTBranding(): void {
  console.log(
    '%c Made by AMST → https://ataberkdudu.info ',
    'background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white; font-size: 14px; padding: 10px 20px; border-radius: 5px; font-weight: bold;'
  );
}
