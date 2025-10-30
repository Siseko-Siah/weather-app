import { AlertCircle } from 'lucide-react';

export const ErrorMessage = ({ message }) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-red-900 mb-1">Error</h3>
          <p className="text-sm text-red-800">{message}</p>
        </div>
      </div>
    </div>
  );
};
