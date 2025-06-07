import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Toaster } from '@/components/ui/toaster';

const MainLayout = ({ user, onLogout, viewMode, setViewMode }) => {
  return (
    <div className="min-h-screen gradient-bg text-foreground">
      <Toaster />
      <Header user={user} onLogout={onLogout} viewMode={viewMode} setViewMode={setViewMode} />
      <main className="container mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
