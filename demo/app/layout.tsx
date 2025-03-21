import ClientApp from './client-app';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientApp>{children}</ClientApp>
      </body>
    </html>
  );
}
