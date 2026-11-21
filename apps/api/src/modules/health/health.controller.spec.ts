import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HealthController } from './health.controller';
import { PrismaService } from '../../prisma/prisma.service';
import type { Response } from 'express';

describe('HealthController', () => {
  let controller: HealthController;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = {
      ping: vi.fn(),
    } as unknown as PrismaService;

    controller = new HealthController(prismaService);
  });

  it('nên trả về HTTP 200 khi cơ sở dữ liệu kết nối bình thường', async () => {
    vi.spyOn(prismaService, 'ping').mockResolvedValue(true);

    const jsonMock = vi.fn();
    const statusMock = vi.fn().mockReturnValue({ json: jsonMock });
    const res = { status: statusMock } as unknown as Response;

    await controller.checkHealth(res);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: expect.objectContaining({
          status: 'ok',
          database: 'connected',
        }),
      }),
    );
  });

  it('nên trả về HTTP 503 khi cơ sở dữ liệu bị mất kết nối', async () => {
    vi.spyOn(prismaService, 'ping').mockResolvedValue(false);

    const jsonMock = vi.fn();
    const statusMock = vi.fn().mockReturnValue({ json: jsonMock });
    const res = { status: statusMock } as unknown as Response;

    await controller.checkHealth(res);

    expect(statusMock).toHaveBeenCalledWith(503);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        data: expect.objectContaining({
          status: 'degraded',
          database: 'disconnected',
        }),
      }),
    );
  });
});
