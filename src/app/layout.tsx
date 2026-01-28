import { TDSMobileAITProvider } from '@toss/tds-mobile-ait';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <TDSMobileAITProvider>
          {children} 
        </TDSMobileAITProvider>
       </body>
    </html>
  );
}
