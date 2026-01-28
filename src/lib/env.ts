import { z } from 'zod';

/**
 * 환경 변수 스키마 정의
 * 앱인토스 미니앱에서 필요한 환경 변수를 여기에 추가하세요.
 */
const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
  // 필요한 환경 변수를 여기에 추가
});

type Env = z.infer<typeof envSchema>;

/**
 * 환경 변수 검증 및 타입 안전한 접근
 */
function getEnv(): Env {
  try {
    return envSchema.parse({
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ 환경 변수 검증 실패:', error.flatten().fieldErrors);
    }
    throw error;
  }
}

export const env = getEnv();
