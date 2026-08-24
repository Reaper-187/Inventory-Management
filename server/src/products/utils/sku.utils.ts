import { randomBytes } from 'node:crypto';

export function buildSkuPrefix(categoryName: string): string {
  return categoryName
    .substring(0, 4)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');
}

export function buildSkuCandidate(prefix: string): string {
  const randomPart = randomBytes(4).toString('hex').toUpperCase();
  return `${prefix}-${randomPart}`;
}
