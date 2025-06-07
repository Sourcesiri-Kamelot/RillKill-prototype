import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Grid, List, Settings, Zap, LogOut, UserCircle, DollarSign } from 'lucide-react';

const Header = ({ viewMode, setViewMode, isAuthenticated, user, onLogout }) => {
  const navigate = useNavigate();
  const reactRouterLocation = useLocation(); 

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate('/login');
  };

  const isAuthPage = reactRouterLocation.pathname === '/login' || reactRouterLocation.pathname === '/signup';

  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center animate-pulse-glow">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">RILLKILL.APP</h1>
              <p className="text-sm text-gray-400">Production Day Organizer</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            {!isAuthPage && viewMode && setViewMode && (
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            )}

            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatarUrl || ''} alt={user.name || 'User'} />
                      <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass-effect" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-white">{user.name || 'User Name'}</p>
                      <p className="text-xs leading-none text-gray-400">{user.email || 'user@example.com'}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => alert('Premium Features Coming Soon!')}>
                    <DollarSign className="mr-2 h-4 w-4" />
                    <span>Go Premium</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => alert('Settings coming soon!')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              !isAuthPage && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={() => navigate('/login')}>Login</Button>
                  <Button onClick={() => navigate('/signup')}>Sign Up</Button>
                </div>
              )
            )}
             {!isAuthenticated && isAuthPage && (
                <Button variant="outline" onClick={() => navigate('/')}>Back to App</Button>
             )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;