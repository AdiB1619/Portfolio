import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Check, LayoutDashboard, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { toast } from 'sonner';
import { cn } from '../utils/cn';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/admin');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background selection:bg-primary/30">
      {/* Left Panel: Branding & Abstract Background */}
      <div className="relative hidden w-1/2 lg:flex flex-col justify-between p-12 overflow-hidden bg-zinc-950 border-r border-zinc-900">
        {/* Subtle Radial Gradient behind text */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 20% 30%, rgba(99,102,241,0.12), transparent 40%)' }}
        />
        
        <div className="z-10 flex items-center gap-3">
          <div className="h-8 w-8 rounded-[8px] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] ring-1 ring-white/10">
            <div className="h-2.5 w-2.5 rounded-full bg-white shadow-sm"></div>
          </div>
          <span className="font-bold text-white tracking-tight text-xl">Theranix Workspace</span>
        </div>

        <div className="z-10 max-w-md mt-10">
          <h1 className="text-[4rem] font-bold text-white mb-6 leading-[1.05] tracking-tighter">
            Build.<br />Ship.<br />Learn.
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed font-medium">
            The secure control center for your digital footprint and incoming messages.
          </p>
        </div>

        {/* Aligned Metric Cards */}
        <div className="z-10 flex flex-col gap-4 mt-12 max-w-[320px]">
          <div className="flex flex-col justify-center p-5 rounded-xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-md transition-all hover:bg-zinc-800/50">
            <div className="text-2xl font-bold text-white leading-none mb-2">24</div>
            <div className="text-sm font-medium text-zinc-500">Active Projects Managed</div>
          </div>
          
          <div className="flex flex-col justify-center p-5 rounded-xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-md transition-all hover:bg-zinc-800/50">
            <div className="text-sm font-bold text-white flex items-center gap-2 mb-2">
              Operational <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
            </div>
            <div className="text-sm font-medium text-zinc-500">All Systems Healthy</div>
          </div>
        </div>

        <div className="z-10 text-xs text-zinc-500 mt-auto pt-10 tracking-wider">
          Powered by Theranix Systems
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="relative flex w-full lg:w-1/2 items-center justify-center p-8 sm:p-12 overflow-hidden">
        {/* Mobile blurred orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-primary/10 rounded-full blur-[120px] lg:hidden" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 w-full max-w-[540px]"
        >
          {/* Mobile branding */}
          <div className="flex lg:hidden items-center gap-3 mb-10 justify-center">
            <div className="h-8 w-8 rounded-[8px] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] ring-1 ring-white/10">
              <div className="h-2.5 w-2.5 rounded-full bg-white shadow-sm"></div>
            </div>
            <span className="font-bold text-white tracking-tight text-xl">Theranix Workspace</span>
          </div>

          <div className="rounded-[24px] border border-zinc-700 bg-surface/40 backdrop-blur-xl p-10 sm:p-12 shadow-[0_0_40px_rgba(79,70,229,0.08)]">
            <div className="mb-10">
              <h2 className="text-[28px] font-bold text-white mb-2 tracking-tight">Sign in</h2>
              <p className="text-[15px] font-medium text-zinc-400">Enter your credentials to access the workspace</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2.5">
                <label className="text-sm font-semibold text-white/90">Email address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@theranix.com"
                  required
                />
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-white/90">Password</label>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center pt-2 pb-4">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={rememberMe}
                  onClick={() => setRememberMe(!rememberMe)}
                  className={cn(
                    "w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200 border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50",
                    rememberMe 
                      ? "bg-indigo-600 border-indigo-600" 
                      : "bg-zinc-900 border-zinc-700"
                  )}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: rememberMe ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Check size={14} className="text-white" strokeWidth={3} />
                  </motion.div>
                </button>
                <label onClick={() => setRememberMe(!rememberMe)} className="ml-3 block text-sm font-medium text-zinc-400 cursor-pointer select-none hover:text-white transition-colors">
                  Remember this device
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full h-[48px] bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 border-0 shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all duration-300 hover:scale-[1.01] text-[15px] font-semibold tracking-wide" 
                isLoading={isLoading}
              >
                Sign in to Workspace
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
