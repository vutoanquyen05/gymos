import React from 'react';
import { Activity, Users, CreditCard, Building2 } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="gymos-sidebar flex flex-col justify-between">
      <div className="space-y-1">
        <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Hệ thống
        </div>
        <a
          href="#dashboard"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-primary-light text-primary font-medium text-sm"
        >
          <Activity className="w-4 h-4 text-primary" />
          <span>Tổng quan & Trạng thái</span>
        </a>
        <div className="px-3 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Chức năng (F02+)
        </div>
        <div className="flex items-center space-x-3 px-3 py-2 text-neutral-400 text-sm cursor-not-allowed">
          <Users className="w-4 h-4" />
          <span>Hội viên</span>
        </div>
        <div className="flex items-center space-x-3 px-3 py-2 text-neutral-400 text-sm cursor-not-allowed">
          <CreditCard className="w-4 h-4" />
          <span>Gói tập & Thu ngân</span>
        </div>
        <div className="flex items-center space-x-3 px-3 py-2 text-neutral-400 text-sm cursor-not-allowed">
          <Building2 className="w-4 h-4" />
          <span>Chi nhánh & Thiết bị</span>
        </div>
      </div>

      <div className="pt-4 border-t border-neutral-200 text-xs text-neutral-400 text-center">
        GYMOS v0.1.0 • F01 Foundation
      </div>
    </aside>
  );
};
