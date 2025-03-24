import { ReactNode } from 'react';
import ClientApp from './client-app';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      {/*<head title={'Vyuh for React'}>*/}
      {/*  <script*/}
      {/*    crossOrigin="anonymous"*/}
      {/*    src="//unpkg.com/react-scan/dist/auto.global.js"*/}
      {/*  />*/}
      {/*</head>*/}
      <body>
        <ClientApp>{children}</ClientApp>
      </body>
    </html>
  );
}
