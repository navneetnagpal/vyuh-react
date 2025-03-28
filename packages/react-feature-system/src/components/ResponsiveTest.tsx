import React from 'react';

export const ResponsiveTest: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Responsive Test</h1>
      
      <div className="bg-red-500 md:bg-blue-500 lg:bg-green-500 p-4 mb-4">
        <p className="text-white">
          This box should be:
          <br />
          - Red on mobile (default)
          <br />
          - Blue on medium screens (md:)
          <br />
          - Green on large screens (lg:)
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-200 p-4">Item 1</div>
        <div className="bg-gray-300 p-4">Item 2</div>
        <div className="bg-gray-400 p-4">Item 3</div>
      </div>
    </div>
  );
};
