import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types';

/**
 * GET /api/health
 * 헬스 체크 엔드포인트
 */
export async function GET() {
  const response: ApiResponse<{ status: string; timestamp: string }> = {
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
    message: 'Service is healthy',
  };

  return NextResponse.json(response, { status: 200 });
}
