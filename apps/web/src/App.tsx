import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CheckCircle2, AlertTriangle, RefreshCw, Database, Server, Smartphone } from 'lucide-react';
import { HealthCheckResponse } from '@gymos/shared-types';

export const App: React.FC = () => {
  const [health, setHealth] = useState<HealthCheckResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastChecked, setLastChecked] = useState<string>('');

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3005/api/v1';
      const res = await fetch(`${apiUrl}/health`);
      const data: HealthCheckResponse = await res.json();
      setHealth(data);
    } catch (_err) {
      setHealth({
        success: false,
        data: {
          status: 'degraded',
          timestamp: new Date().toISOString(),
          database: 'disconnected',
          error: 'Không thể kết nối đến Backend API',
        },
      });
    } finally {
      setLoading(false);
      setLastChecked(new Date().toLocaleTimeString('vi-VN'));
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const isHealthy = health?.success && health?.data?.status === 'ok';

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-sans">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                Bảng điều khiển Vận hành GYMOS
              </h1>
              <p className="text-sm text-neutral-500 mt-1">
                Nền tảng khởi tạo F01 — Kiểm tra kết nối dịch vụ và trạng thái cơ sở dữ liệu
              </p>
            </div>
            <button
              onClick={fetchHealth}
              disabled={loading}
              className={`gymos-btn gymos-btn--primary space-x-2 ${loading ? 'gymos-btn--disabled' : ''}`}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Kiểm tra lại</span>
            </button>
          </div>

          {/* Trạng thái hệ thống tổng quan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card Trạng thái Backend & DB */}
            <div className="gymos-card">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-neutral-500">Cơ sở dữ liệu PostgreSQL</span>
                <Database className="w-5 h-5 text-neutral-400" />
              </div>
              <div className="flex items-center space-x-3">
                {isHealthy ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-amber-500" />
                )}
                <div>
                  <div className="text-lg font-bold text-neutral-900">
                    {isHealthy ? 'Đang kết nối' : 'Mất kết nối'}
                  </div>
                  <div className="text-xs text-neutral-400">
                    PostgreSQL 17 Container (Port 5432)
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
                <span>Cập nhật lúc:</span>
                <span>{lastChecked || 'Chưa cập nhật'}</span>
              </div>
            </div>

            {/* Card Backend REST API */}
            <div className="gymos-card">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-neutral-500">Backend API</span>
                <Server className="w-5 h-5 text-neutral-400" />
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-sm">
                  12
                </div>
                <div>
                  <div className="text-lg font-bold text-neutral-900">NestJS 12.5.1</div>
                  <div className="text-xs text-neutral-400">Modular Monolith REST API</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
                <span>Endpoint:</span>
                <span className="font-mono">/api/v1/health</span>
              </div>
            </div>

            {/* Card Khách hàng & Mobile */}
            <div className="gymos-card">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-neutral-500">Ứng dụng Mobile</span>
                <Smartphone className="w-5 h-5 text-neutral-400" />
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-sm">
                  57
                </div>
                <div>
                  <div className="text-lg font-bold text-neutral-900">Expo SDK 57</div>
                  <div className="text-xs text-neutral-400">React Native 0.86 • 5 Tabs</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
                <span>Expo Go tương thích:</span>
                <span className="text-emerald-600 font-semibold">Client 57.0.9</span>
              </div>
            </div>
          </div>

          {/* Chi tiết phản hồi Health Check */}
          <div className="gymos-card">
            <h2 className="gymos-card__title">Chi tiết phản hồi Health Check</h2>
            <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg font-mono text-xs overflow-x-auto">
              {JSON.stringify(health, null, 2)}
            </pre>
          </div>
        </main>
      </div>
    </div>
  );
};
