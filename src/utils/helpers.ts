/**
 * Utility helper functions for the task management system.
 */

/**
 * Formats a date object into a readable string.
 * @param date - The date object to format.
 * @returns A formatted date string in 'YYYY-MM-DD' format.
 */
export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Generates a unique identifier.
 * @returns A unique string identifier.
 */
export function generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
}

/**
 * Capitalizes the first letter of a string.
 * @param str - The string to capitalize.
 * @returns The string with the first letter capitalized.
 */
export function capitalizeFirstLetter(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}