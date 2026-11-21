import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { HealthCheckResponse } from '@gymos/shared-types';

/**
 * Controller kiểm tra trạng thái hoạt động của hệ thống và kết nối PostgreSQL
 * Nguồn: gymos.md §4.1; Kế hoạch P3
 */
@Controller('v1/health')
export class HealthController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async checkHealth(@Res() res: Response): Promise<Response> {
    const isDbConnected = await this.prismaService.ping();
    const timestamp = new Date().toISOString();

    if (isDbConnected) {
      const response: HealthCheckResponse = {
        success: true,
        data: {
          status: 'ok',
          timestamp,
          database: 'connected',
        },
      };
      return res.status(HttpStatus.OK).json(response);
    }

    const response: HealthCheckResponse = {
      success: false,
      data: {
        status: 'degraded',
        timestamp,
        database: 'disconnected',
        error: 'Database connection failed',
      },
    };
    return res.status(HttpStatus.SERVICE_UNAVAILABLE).json(response);
  }
}
