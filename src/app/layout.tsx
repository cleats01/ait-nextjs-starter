import './globals.css';
import { RootProviders } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
