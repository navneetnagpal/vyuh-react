'use client';

import { VyuhProvider } from '@vyuh/react-core';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import React from 'react';
import { getFeatures, plugins } from '@/app/setup';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <VyuhProvider features={getFeatures} plugins={plugins}>
          {children}
        </VyuhProvider>
      </body>
    </html>
  );
}
