'use client';

import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

export default function Counter() {
  const [counter, setCounter] = useState(0);

  return (
    <div className={'flex flex-col h-screen items-center justify-center gap-6'}>
      <div className="flex gap-4">
        <button
          onClick={() => setCounter(counter - 1)}
          disabled={counter <= 0}
          className={`flex items-center justify-center gap-2 ${counter <= 0 ? 'bg-gray-400 cursor-not-allowed opacity-70' : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 cursor-pointer'} text-white font-bold px-6 py-4 rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`}
          aria-label="Decrement counter"
          aria-disabled={counter <= 0}
        >
          <Minus className="h-7 w-7 text-white" />
          <span className="text-white font-semibold">Decrement</span>
        </button>

        <button
          onClick={() => setCounter(counter + 1)}
          className={'flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 cursor-pointer'}
          aria-label="Increment counter"
        >
          <Plus className="h-7 w-7 text-white" />
          <span className="text-white font-semibold">Increment</span>
        </button>
      </div>

      <div className="text-center">
        <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Current Count</p>
        <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          {counter} {counter === 1 ? 'time' : 'times'}
        </p>
      </div>
    </div>
  );
}
