
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import MainLayout from '@/components/layout/MainLayout';
import LoginPage from '@/components/auth/LoginPage';
import SignupPage from '@/components/auth/SignupPage';
import UserDashboard from '@/components/dashboard/UserDashboard';
import FileManagerPage from '@/components/pages/FileManagerPage';
import TermsPage from '@/components/pages/TermsPage'; // Import the TermsPage

function App() {
  // Mock authentication state
  const [user, setUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  // States for FileManagerPage, to be managed globally or passed down
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); 
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Simulate checking auth status from localStorage (or Supabase in future)
    const storedUser = localStorage.getItem('rillkill-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('rillkill-user');
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('rillkill-user', JSON.stringify(userData));
  };

  const handleSignup = (userData) => {
    // In a real app, this would likely just navigate to login or a verify email page
    // For mock, we'll log them in directly.
    setUser(userData);
    localStorage.setItem('rillkill-user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('rillkill-user');
    // Potentially navigate to login page after logout
    // navigate('/login'); // if useNavigate is available here or handle in Header
  };

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <p className="text-white text-xl animate-pulse">Loading RILLKILL.APP...</p>
      </div>
    );
  }

  return (
    <Router>
      <Toaster />
      <Routes>
        <Route 
          path="/" 
          element={
            user ? (
              <MainLayout user={user} onLogout={handleLogout} viewMode={viewMode} setViewMode={setViewMode}>
                <FileManagerPage 
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                  // viewMode and setViewMode are passed to Header via MainLayout
                  // FilesDisplay inside FileManagerPage will need viewMode if it's not hardcoded
                />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route path="/login" element={!user ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/" replace />} />
        <Route path="/signup" element={!user ? <SignupPage onSignup={handleSignup} /> : <Navigate to="/" replace />} />
        <Route 
          path="/dashboard" 
          element={
            user ? (
              <MainLayout user={user} onLogout={handleLogout} viewMode={viewMode} setViewMode={setViewMode}>
                <UserDashboard user={user} onLogout={handleLogout} />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route path="/terms" element={<TermsPage />} /> {/* Add TermsPage route */}
        {/* Add other routes like pricing, premium features page later */}
      </Routes>
    </Router>
  );
}

export default App;
