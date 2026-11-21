import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme, type ThemeMode } from '../theme/ThemeContext';

const THEME_OPTIONS: Array<{ mode: ThemeMode; label: string; icon: string }> = [
  { mode: 'system', label: 'Hệ thống (Mặc định)', icon: '📱' },
  { mode: 'light', label: 'Giao diện Sáng', icon: '☀️' },
  { mode: 'dark', label: 'Giao diện Tối', icon: '🌙' },
];

export const ProfileScreen: React.FC = () => {
  const { themeMode, setThemeMode } = useTheme();

  return (
    <View className="flex-1 bg-white dark:bg-slate-900 items-center justify-center p-6">
      <View className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-950/60 items-center justify-center mb-4 border border-orange-200 dark:border-orange-800/40">
        <Text className="text-2xl">👤</Text>
      </View>
      <Text
        style={{ fontFamily: 'BeVietnamPro_700Bold' }}
        className="text-xl text-slate-900 dark:text-slate-50 mb-1"
      >
        Hồ sơ cá nhân
      </Text>
      <Text
        style={{ fontFamily: 'BeVietnamPro_400Regular' }}
        className="text-xs text-slate-500 dark:text-slate-400 text-center mb-6"
      >
        Khung giao diện F01 — Sẵn sàng cho F07 Thông tin hội viên
      </Text>

      {/* Bộ chọn giao diện (Theme Selector) phục vụ kiểm thử nền tảng */}
      <View className="w-full max-w-sm bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
        <Text
          style={{ fontFamily: 'BeVietnamPro_600SemiBold' }}
          className="text-sm text-slate-700 dark:text-slate-200 mb-3"
        >
          Cài đặt giao diện
        </Text>

        <View className="gap-2">
          {THEME_OPTIONS.map((item) => {
            const isSelected = themeMode === item.mode;
            return (
              <TouchableOpacity
                key={item.mode}
                activeOpacity={0.7}
                onPress={() => setThemeMode(item.mode)}
                className={`flex-row items-center justify-between p-3 rounded-xl border ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50/60 dark:bg-orange-950/40'
                    : 'border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800'
                }`}
              >
                <View className="flex-row items-center gap-2">
                  <Text className="text-base">{item.icon}</Text>
                  <Text
                    style={{
                      fontFamily: isSelected ? 'BeVietnamPro_600SemiBold' : 'BeVietnamPro_400Regular',
                    }}
                    className={`text-sm ${
                      isSelected
                        ? 'text-orange-600 dark:text-orange-400 font-semibold'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {item.label}
                  </Text>
                </View>
                {isSelected && (
                  <View className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};
