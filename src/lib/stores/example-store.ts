import { create } from 'zustand';

/**
 * Zustand 스토어 예제
 * 실제 사용 시 이 파일을 참고하여 새로운 스토어를 만들거나 삭제하세요.
 */

interface ExampleState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useExampleStore = create<ExampleState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
