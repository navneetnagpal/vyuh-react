'use client';

import { useVyuh } from '@/hooks/use-vyuh';

export default function Home() {
  const { plugins } = useVyuh();

  console.log(plugins.content);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
