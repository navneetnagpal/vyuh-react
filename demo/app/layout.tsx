'use client';

import { FeatureDescriptor, VyuhProvider } from '@vyuh/react';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import React from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const counter = new FeatureDescriptor({
  name: 'counter',
  title: 'Counter',
  init: () => Promise.resolve(),
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
        <VyuhProvider features={() => [counter]}>{children}</VyuhProvider>
      </body>
    </html>
  );
}
