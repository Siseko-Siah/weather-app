import { RefreshCw } from 'lucide-react';

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mb-4" />
      <p className="text-gray-600">Loading weather data...</p>
    </div>
  );
};
