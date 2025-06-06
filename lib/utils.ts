import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    const crores = amount / 10000000;
    return `₹ ${crores.toLocaleString('en-IN', { maximumFractionDigits: 2 })} Crore`;
  }
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹ ${lakhs.toLocaleString('en-IN', { maximumFractionDigits: 2 })} Lakh`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumberForInput(amount: number | undefined | null): string {
  if (amount === undefined || amount === null) return '';
  if (amount >= 10000000) {
    const crores = amount / 10000000;
    return `${crores.toLocaleString('en-IN', { maximumFractionDigits: 2 })} Crore`;
  }
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `${lakhs.toLocaleString('en-IN', { maximumFractionDigits: 2 })} Lakh`;
  }
  return amount.toString();
}

export function getPaymentLabel(status: string, propertyType: string): string {
  switch (status) {
    case 'For Rent':
      return propertyType === 'Land' ? 'Yearly Lease' : 'Monthly Rent';
    case 'For Sale':
      return 'One-time Payment';
    case 'Sold':
      return 'Sold For';
    case 'Rented':
      return 'Rented At';
    default:
      return 'Price';
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}