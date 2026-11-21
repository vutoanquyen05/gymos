import React from 'react';
import { Dumbbell, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="gymos-header">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm">
          <Dumbbell className="w-6 h-6" />
        </div>
        <div>
          <span className="font-bold text-xl tracking-tight text-neutral-900">GYMOS</span>
          <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-primary-light text-primary">
            Quản trị & Vận hành
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-sm text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-md">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Chi nhánh: <strong>Quận 1 - Trụ sở</strong></span>
        </div>
      </div>
    </header>
  );
};
