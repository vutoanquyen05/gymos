import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themeColors, type ThemePalette } from '@gymos/design-tokens';

export type ThemeMode = 'system' | 'light' | 'dark';

export interface ThemeContextValue {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  isDark: boolean;
  colors: ThemePalette;
}

const THEME_STORAGE_KEY = '@gymos/theme_mode';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const systemColorScheme = useRNColorScheme();
  const { setColorScheme: setNWColorScheme } = useNativeWindColorScheme();

  // Đọc theme mode đã lưu từ AsyncStorage khi khởi động
  useEffect(() => {
    let isMounted = true;
    const loadStoredTheme = async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (!isMounted) return;
        if (stored === 'light' || stored === 'dark' || stored === 'system') {
          setThemeModeState(stored);
          setNWColorScheme(stored);
        } else {
          // Fallback về system nếu chưa có hoặc dữ liệu không hợp lệ
          setThemeModeState('system');
          setNWColorScheme('system');
        }
      } catch {
        // Fallback an toàn nếu có lỗi truy xuất storage
        if (isMounted) {
          setThemeModeState('system');
          setNWColorScheme('system');
        }
      }
    };

    loadStoredTheme();
    return () => {
      isMounted = false;
    };
  }, [setNWColorScheme]);

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      setThemeModeState(mode);
      setNWColorScheme(mode);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
      // Giữ state runtime ngay cả khi lưu storage thất bại
    }
  };

  // Xác định trạng thái dark thực tế dựa trên themeMode và cấu hình hệ thống
  const isDark = useMemo(() => {
    if (themeMode === 'dark') return true;
    if (themeMode === 'light') return false;
    return systemColorScheme === 'dark';
  }, [themeMode, systemColorScheme]);

  // Bộ semantic tokens tương ứng theo theme hiện hành
  const activeColors = useMemo(() => {
    return isDark ? themeColors.dark : themeColors.light;
  }, [isDark]);

  const value = useMemo(
    () => ({
      themeMode,
      setThemeMode,
      isDark,
      colors: activeColors,
    }),
    [themeMode, isDark, activeColors]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme phải được sử dụng bên trong ThemeProvider');
  }
  return context;
};
