import Link from 'next/link';
import { 
  LayoutDashboard, 
  Terminal, 
  CreditCard, 
  BookOpen, 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <span className="text-xl font-bold tracking-tight">OpenMonetize</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="https://openmonetize-docs.vercel.app" className="text-sm text-slate-400 hover:text-white transition-colors">
                Documentation
              </Link>
              <div className="h-4 w-[1px] bg-slate-800"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                  <span className="text-xs font-medium">JD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Welcome back, <span className="text-blue-500">Developer</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            Manage your API usage, monitor billing, and configure your monetization strategy all in one place.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total API Calls</CardTitle>
              <Activity className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">24,592</div>
              <p className="text-xs text-slate-500 mt-1">+12% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Current Balance</CardTitle>
              <CreditCard className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">15,000 <span className="text-sm font-normal text-slate-500">credits</span></div>
              <p className="text-xs text-slate-500 mt-1">Auto-topup enabled</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">System Status</CardTitle>
              <ShieldCheck className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-2xl font-bold text-white">Operational</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">All systems normal</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-blue-500" />
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Sandbox Card */}
          <Link href="/sandbox" className="group">
            <Card className="bg-slate-900 border-slate-800 hover:border-blue-500/50 transition-all duration-300 h-full group-hover:shadow-lg group-hover:shadow-blue-500/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Terminal className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle className="text-white group-hover:text-blue-400 transition-colors">API Sandbox</CardTitle>
                <CardDescription className="text-slate-400">
                  Test your API integration in a safe environment with real-time metering simulation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-blue-500 font-medium">
                  Launch Sandbox <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Documentation Card */}
          <Link href="https://openmonetize-docs.vercel.app" target="_blank" className="group">
            <Card className="bg-slate-900 border-slate-800 hover:border-purple-500/50 transition-all duration-300 h-full group-hover:shadow-lg group-hover:shadow-purple-500/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-6 h-6 text-purple-500" />
                </div>
                <CardTitle className="text-white group-hover:text-purple-400 transition-colors">Documentation</CardTitle>
                <CardDescription className="text-slate-400">
                  Comprehensive guides, API references, and tutorials to help you build faster.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-purple-500 font-medium">
                  Read Docs <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* API Keys Card */}
          <div className="group cursor-pointer">
            <Card className="bg-slate-900 border-slate-800 hover:border-green-500/50 transition-all duration-300 h-full group-hover:shadow-lg group-hover:shadow-green-500/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-6 h-6 text-green-500" />
                </div>
                <CardTitle className="text-white group-hover:text-green-400 transition-colors">API Keys</CardTitle>
                <CardDescription className="text-slate-400">
                  Manage your API keys, view usage limits, and rotate credentials securely.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-green-500 font-medium">
                  Manage Keys <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}
