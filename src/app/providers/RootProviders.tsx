'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { TDSMobileAITProvider } from '@toss/tds-mobile-ait';
import { queryClient } from '@/lib/query-client';

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TDSMobileAITProvider>{children}</TDSMobileAITProvider>
    </QueryClientProvider>
  );
}
