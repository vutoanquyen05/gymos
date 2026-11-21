/**
 * Cấu trúc phản hồi API chuẩn toàn hệ thống GYMOS
 * Nguồn: gymos.md §4.1
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    timestamp: string;
    requestId?: string;
  };
}

/**
 * Cấu trúc dữ liệu phản hồi Health Check
 */
export interface HealthStatusData {
  status: 'ok' | 'degraded';
  timestamp: string;
  database: 'connected' | 'disconnected';
  error?: string;
}

export type HealthCheckResponse = ApiResponse<HealthStatusData>;
