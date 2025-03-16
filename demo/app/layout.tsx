'use client';

import {
  FeatureDescriptor,
  VyuhProvider,
  DefaultContentPlugin,
  SanityContentProvider,
} from '@vyuh/react';
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

// Configure Sanity content provider
const sanityProvider = SanityContentProvider.withConfig({
  config: {
    projectId: '8b76lu9s',
    dataset: 'production',
    perspective: 'previewDrafts',
    useCdn: false,
    token:
      'skt2tSTitRob9TonNNubWg09bg0dACmwE0zHxSePlJisRuF1mWJOvgg3ZF68CAWrqtSIOzewbc56dGavACyznDTsjm30ws874WoSH3E5wPMFrqVW8C0Hc0pJGzpYQiehfL9GTRrIyoO3y2aBQIxHpegGspzxAevZcchleelaH5uM6LAnOJT1',
  },
  cacheDuration: 300000, // 5 minutes
});

// Create the content plugin with the Sanity provider
const contentPlugin = new DefaultContentPlugin(sanityProvider);

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
        <VyuhProvider
          features={() => [counter]}
          plugins={{
            content: contentPlugin,
          }}
        >
          {children}
        </VyuhProvider>
      </body>
    </html>
  );
}
