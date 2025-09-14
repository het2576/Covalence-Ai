import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

export function getRoleColor(role: string) {
  switch (role) {
    case 'admin': return 'text-red-500'
    case 'manager': return 'text-purple-500'
    case 'analyst': return 'text-blue-500'
    case 'intern': return 'text-green-500'
    default: return 'text-gray-500'
  }
}

export function getRoleBadgeColor(role: string) {
  switch (role) {
    case 'admin': return 'bg-red-100 text-red-800 border-red-200'
    case 'manager': return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'analyst': return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'intern': return 'bg-green-100 text-green-800 border-green-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}