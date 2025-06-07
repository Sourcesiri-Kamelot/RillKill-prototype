import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { UserPlus, Mail, Lock, Info } from 'lucide-react';

const SignupPage = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    if (!agreedToTerms) {
      toast({
        title: "Terms and Conditions",
        description: "You must agree to the terms and conditions.",
        variant: "destructive",
      });
      return;
    }
    // Mock signup for now
    console.log("Attempting signup with:", { email, password });
    onSignup({ email, name: "New User" }); // Pass mock user data
    toast({
      title: "Signup Successful!",
      description: "Welcome to RILLKILL.APP! Please check your email to verify your account.",
    });
    navigate('/'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg p-4">
      <div className="glass-effect p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <UserPlus className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse-glow" />
          <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
          <p className="text-gray-400">Join RILLKILL.APP and streamline your production day.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email-signup" className="text-gray-300">Email Address</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="email-signup"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-500"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="password-signup" className="text-gray-300">Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="password-signup"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-500"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="confirm-password-signup" className="text-gray-300">Confirm Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="confirm-password-signup"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-500"
                required
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={agreedToTerms}
              onCheckedChange={setAgreedToTerms}
              className="border-gray-500 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            />
            <Label htmlFor="terms" className="text-sm text-gray-400">
              I agree to the{' '}
              <Link to="/terms" className="text-primary hover:underline">
                Terms, Waivers, and Disclaimers
              </Link>
            </Label>
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3">
            <UserPlus className="w-5 h-5 mr-2" />
            Create Account
          </Button>
        </form>
        <p className="mt-8 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
