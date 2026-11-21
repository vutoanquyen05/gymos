import React from 'react';
import { View, Text } from 'react-native';

export const PlansScreen: React.FC = () => {
  return (
    <View className="flex-1 bg-white dark:bg-slate-900 items-center justify-center p-6">
      <View className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-950/60 items-center justify-center mb-4 border border-orange-200 dark:border-orange-800/40">
        <Text className="text-2xl">💳</Text>
      </View>
      <Text
        style={{ fontFamily: 'BeVietnamPro_700Bold' }}
        className="text-xl text-slate-900 dark:text-slate-50 mb-2"
      >
        Gói tập & Đăng ký
      </Text>
      <Text
        style={{ fontFamily: 'BeVietnamPro_400Regular' }}
        className="text-sm text-slate-500 dark:text-slate-400 text-center"
      >
        Khung giao diện F01 — Sẵn sàng cho F03 Danh sách gói tập và F04 Thanh toán
      </Text>
    </View>
  );
};
