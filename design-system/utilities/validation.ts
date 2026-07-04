/**
 * design-system/utilities/validation.ts
 * Input validation helpers.
 */

/**
 * Validates whether the given string is a correctly formatted email address.
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Validates whether a file size is within limits.
 */
export function validateFileSize(sizeInBytes: number, maxSizeInBytes: number): boolean {
  return sizeInBytes <= maxSizeInBytes;
}

/**
 * Validates if the file type matches the accepted types list.
 */
export function validateFileType(fileType: string, acceptedTypes: string[]): boolean {
  if (acceptedTypes.length === 0) return true;
  return acceptedTypes.some((type) => {
    if (type.endsWith('/*')) {
      const prefix = type.split('/')[0];
      return fileType.startsWith(prefix + '/');
    }
    return fileType === type;
  });
}
