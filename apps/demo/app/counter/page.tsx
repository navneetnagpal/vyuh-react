'use client';

import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

export default function Counter() {
  const [counter, setCounter] = useState(0);

  return (
    <div className={'flex h-screen flex-col items-center justify-center gap-6'}>
      <div className="flex gap-4">
        <button
          onClick={() => setCounter(counter - 1)}
          disabled={counter <= 0}
          className="btn btn-primary btn-lg gap-2"
          aria-label="Decrement counter"
          aria-disabled={counter <= 0}
        >
          <Minus className="h-6 w-6" />
          <span>Decrement</span>
        </button>

        <button
          onClick={() => setCounter(counter + 1)}
          className="btn btn-primary btn-lg gap-2"
          aria-label="Increment counter"
        >
          <Plus className="h-6 w-6" />
          <span>Increment</span>
        </button>
      </div>

      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-gray-600">
          Current Count
        </p>
        <p className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
          {counter} {counter === 1 ? 'time' : 'times'}
        </p>
      </div>
    </div>
  );
}
