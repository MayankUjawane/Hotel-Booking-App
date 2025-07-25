import React from 'react';
import Router from './router';
import { Toaster } from '@/components/ui/sonner';
import AuthContextProvider from '@/lib/providers/auth-context-provider';

const App = () => {
  return (
    <AuthContextProvider>
      <Router />
      <Toaster position="top-center" richColors />
    </AuthContextProvider>
  );
};

export default App;
