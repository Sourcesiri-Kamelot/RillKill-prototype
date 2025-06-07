import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserDashboard = ({ user, onLogout }) => {
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg p-4">
        <p className="text-white text-xl">Please log in to view your dashboard.</p>
        <Link to="/login">
          <Button className="ml-4">Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg p-4 md:p-8">
      <div className="glass-effect p-6 md:p-8 rounded-lg shadow-2xl max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome, {user.name || user.email}!</h1>
            <p className="text-gray-400">This is your RILLKILL.APP command center.</p>
          </div>
          <Button onClick={onLogout} variant="destructive" className="mt-4 md:mt-0">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass-effect p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-3">Account Status</h2>
            <p className="text-gray-300"><span className="font-medium text-primary">Plan:</span> Free Tier (1 Project Limit)</p>
            <p className="text-gray-300"><span className="font-medium text-primary">Email:</span> {user.email}</p>
            <Button className="mt-4 w-full bg-green-500 hover:bg-green-600">
              <DollarSign className="w-4 h-4 mr-2" />
              Upgrade to Premium ($100 One-Time)
            </Button>
          </div>
          <div className="glass-effect p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-3">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                  Go to File Manager
                </Button>
              </Link>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                <Settings className="w-4 h-4 mr-2" />
                Account Settings (Coming Soon)
              </Button>
            </div>
          </div>
        </div>
        
        <div className="glass-effect p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-3">Getting Started with RILLKILL.APP</h2>
            <p className="text-gray-300 mb-2">
              RILLKILL.APP is your production-day command center. Here's a quick rundown:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-1 mb-4">
              <li><strong>Upload Everything:</strong> Drag and drop scripts, shot lists, videos, audio, notes - anything you need for the shoot.</li>
              <li><strong>Auto-Organized:</strong> Files are automatically categorized. Use filters to find what you need, fast.</li>
              <li><strong>Local First:</strong> Your files stay on your device. Secure and private.</li>
              <li><strong>Preview & Play:</strong> Quickly view PDFs, TXTs, and play MP4s directly in the app.</li>
              <li><strong>AI Tags:</strong> Basic AI helps tag your files for even better organization.</li>
            </ul>
            <p className="text-gray-300">
              Ready to get started? Head to the <Link to="/" className="text-primary hover:underline">File Manager</Link> and begin uploading your project assets!
            </p>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
