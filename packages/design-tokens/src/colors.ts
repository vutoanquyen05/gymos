/**
 * Bảng màu Design Tokens chuẩn GYMOS
 * Nguồn: gymos.md §7 (Modern Minimalist Fitness)
 */
export const colors = {
  primary: {
    DEFAULT: '#F97316', // Energetic Orange
    hover: '#EA580C',
    light: '#FFEDD5',
    dark: '#C2410C',
  },
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  background: {
    light: '#FFFFFF',
    dark: '#0F172A',
  },
  surface: {
    light: '#F8FAFC',
    dark: '#1E293B',
  },
} as const;

/**
 * Kiểu dữ liệu semantic tokens cho một chủ đề (Theme Palette)
 */
export interface ThemePalette {
  background: string;
  surface: string;
  card: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  tabBar: string;
  tabBarBorder: string;
  tabBarInactive: string;
  primary: string;
}

/**
 * Bộ Semantic Design Tokens phân định rõ Light và Dark mode cho UI & Navigation
 */
export const themeColors: Record<'light' | 'dark', ThemePalette> = {
  light: {
    background: '#FFFFFF',
    surface: '#F8FAFC',
    card: '#FFFFFF',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    tabBar: '#FFFFFF',
    tabBarBorder: '#E2E8F0',
    tabBarInactive: '#94A3B8',
    primary: '#F97316',
  },
  dark: {
    background: '#0F172A',
    surface: '#1E293B',
    card: '#1E293B',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    border: '#334155',
    tabBar: '#1E293B',
    tabBarBorder: '#334155',
    tabBarInactive: '#64748B',
    primary: '#F97316',
  },
} as const;
