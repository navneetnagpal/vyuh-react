import { ReactNode } from 'react';
import ClientApp from './client-app';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientApp>{children}</ClientApp>
      </body>
    </html>
  );
}
