import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { router } from '@/router';
import { queryClient } from '@/lib/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster 
        position="top-right"
        toastOptions={{
          className: '!bg-background-tertiary !text-text-primary !border !border-background-border !shadow-lg',
          success: {
            iconTheme: {
              primary: '#4ADE80',
              secondary: '#1A1A1E',
            },
          },
          error: {
            iconTheme: {
              primary: '#F87171',
              secondary: '#1A1A1E',
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
