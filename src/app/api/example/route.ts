import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types';

/**
 * GET /api/example
 * 예제 API 엔드포인트
 */
export async function GET(request: NextRequest) {
  try {
    // 쿼리 파라미터 예제
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get('name') || 'World';

    const data = {
      message: `Hello, ${name}!`,
      timestamp: new Date().toISOString(),
    };

    const response: ApiResponse<typeof data> = {
      success: true,
      data,
      message: 'Successfully retrieved data',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const errorResponse: ApiResponse<null> = {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : 'Internal server error',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

/**
 * POST /api/example
 * 예제 POST 엔드포인트
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 요청 본문 검증 예제
    if (!body || typeof body !== 'object') {
      const errorResponse: ApiResponse<null> = {
        success: false,
        data: null,
        message: 'Invalid request body',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const data = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    const response: ApiResponse<typeof data> = {
      success: true,
      data,
      message: 'Successfully created data',
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const errorResponse: ApiResponse<null> = {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : 'Internal server error',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
