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
          className={`flex items-center justify-center gap-2 ${counter <= 0 ? 'cursor-not-allowed bg-gray-400 opacity-70' : 'transform cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 hover:from-indigo-600 hover:to-purple-700'} rounded-xl px-6 py-4 font-bold text-white shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`}
          aria-label="Decrement counter"
          aria-disabled={counter <= 0}
        >
          <Minus className="h-7 w-7 text-white" />
          <span className="font-semibold text-white">Decrement</span>
        </button>

        <button
          onClick={() => setCounter(counter + 1)}
          className={
            'flex transform cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-indigo-600 hover:to-purple-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
          }
          aria-label="Increment counter"
        >
          <Plus className="h-7 w-7 text-white" />
          <span className="font-semibold text-white">Increment</span>
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
