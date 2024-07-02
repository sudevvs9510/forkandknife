// import React from 'react';
// import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

// const MyFallbackComponent: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
//    return (
//      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
//        <h1 className="text-2xl font-semibold text-red-600 mb-4">Something went wrong</h1>
//        <pre className="text-sm text-gray-800 bg-gray-200 p-4 rounded mb-4">
//          {error.message}
//        </pre>
//        <button
//          onClick={resetErrorBoundary}
//          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600 transition"
//        >
//          Reload
//        </button>
//      </div>
//    );
//  };

// const ErrorBoundaryWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   return (
//     <ErrorBoundary FallbackComponent={MyFallbackComponent}>
//       {children}
//     </ErrorBoundary>
//   );
// };

// export default ErrorBoundaryWrapper;
