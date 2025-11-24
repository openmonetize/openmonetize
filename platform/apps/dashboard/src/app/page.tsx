'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Loader2, Terminal, Play, CreditCard, Activity, Code2, LogOut, User, Server, Database, ArrowRight, Zap, ShieldCheck, Plus, BookOpen, Code, Trash2 } from 'lucide-react';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { cn } from '@/lib/utils';

// Types for our simulated logs
type LogEntry = {
  id: string;
  timestamp: string;
  source: 'APP' | 'API' | 'INGESTION' | 'RATING' | 'BILLING';
  message: string;
  details?: any;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// --- Visual Data Flow Component ---
const VisualDataFlow = ({ activeStep }: { activeStep: string | null }) => {
  const steps = [
    { id: 'app', label: 'Your App', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 'gateway', label: 'API Gateway', icon: ShieldCheck, color: 'text-purple-500', bg: 'bg-purple-100' },
    { id: 'ingestion', label: 'Ingestion', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    { id: 'rating', label: 'Rating Engine', icon: Server, color: 'text-orange-500', bg: 'bg-orange-100' },
    { id: 'db', label: 'Ledger DB', icon: Database, color: 'text-green-500', bg: 'bg-green-100' },
  ];

  return (
    <div className="w-full py-6 px-4 bg-slate-50 rounded-xl border border-slate-200 mb-6 overflow-hidden">
      <div className="flex justify-between items-center relative">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-0" />
        
        {steps.map((step, index) => {
          const isActive = activeStep === step.id;
          const isPast = activeStep ? steps.findIndex(s => s.id === activeStep) >= index : false;
          
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 transition-all duration-300">
              <div 
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500
                  ${isActive ? `${step.bg} ${step.color} border-white shadow-lg scale-110 ring-4 ring-blue-100` : ''}
                  ${!isActive && isPast ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-400 border-slate-200'}
                `}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-medium transition-colors duration-300 ${isActive ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-center h-6">
        {activeStep && (
          <span className="text-sm text-blue-600 font-medium animate-pulse">
            {activeStep === 'app' && 'Sending Request...'}
            {activeStep === 'gateway' && 'Authenticating & Routing...'}
            {activeStep === 'ingestion' && 'High-speed Event Capture...'}
            {activeStep === 'rating' && 'Calculating Cost & Metering...'}
            {activeStep === 'db' && 'Updating Wallet Balance...'}
          </span>
        )}
      </div>
    </div>
  );
};

export default function SandboxPage() {
  const [activeTab, setActiveTab] = useState('llm');
  const [balance, setBalance] = useState<number>(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Auth State
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // --- Simulation Helpers ---

  const addLog = (source: LogEntry['source'], message: string, details?: any) => {
    setLogs(prev => [...prev, {
      id: crypto.randomUUID(),
      timestamp: new Date().toLocaleTimeString(),
      source,
      message,
      details
    }]);
  };

  const scrollToBottom = () => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  // --- Auth & Init ---

  useEffect(() => {
    const storedKey = localStorage.getItem('om_api_key');
    const storedName = localStorage.getItem('om_customer_name');
    
    if (storedKey) {
      setApiKey(storedKey);
      setCustomerName(storedName || 'Developer');
      addLog('APP', `Welcome back, ${storedName || 'Developer'}`);
    }
    setAuthChecked(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('om_api_key');
    localStorage.removeItem('om_customer_name');
    setApiKey(null);
    setCustomerName(null);
    setLogs([]);
    setBalance(0);
  };

  const handleLoginSuccess = (key: string, name: string) => {
    setApiKey(key);
    setCustomerName(name);
    addLog('APP', 'Session started with new API Key');
  };

  // --- Fetching Data ---

  const fetchBalance = async (silent = false) => {
    if (!apiKey) return;

    try {
      const res = await fetch(`${API_URL}/v1/credits/balance`, {
        headers: { 'Authorization': `Bearer ${apiKey}` },
      });
      
      if (res.status === 401) {
        if (!silent) addLog('API', 'Authentication failed (Invalid Key)');
        return;
      }

      const data = await res.json();
      if (data.data) {
        setBalance(parseInt(data.data.balance));
        if(!silent) addLog('BILLING', 'Synced wallet balance', { balance: data.data.balance });
      }
    } catch (e) {
      if (!silent) addLog('API', 'Failed to fetch balance (Is local server running?)');
    }
  };

  const handleTopUp = async () => {
    if (!apiKey) return;
    
    try {
      // Call the top-up endpoint to add credits to the authenticated user's wallet
      const res = await fetch(`${API_URL}/v1/apiconsole/topup`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: 10000 })
      });

      if (res.ok) {
        addLog('BILLING', 'Top-up successful: +10,000 credits');
        fetchBalance();
      } else {
        addLog('API', 'Top-up failed');
      }
    } catch (e) {
      console.error(e);
      addLog('API', 'Top-up failed');
    }
  };

  useEffect(() => {
    if (apiKey) {
      fetchBalance(true);
      addLog('APP', 'OpenMonetize SDK initialized');
    }
  }, [apiKey]);

  // --- Handlers ---

  const simulateFlow = async (step: string, duration: number) => {
    setActiveStep(step);
    await new Promise(r => setTimeout(r, duration));
  };

  const handleGeneration = async (type: 'text' | 'image') => {
    if (!apiKey) return;
    setLoading(true);
    
    try {
      // 1. APP: User initiates action
      await simulateFlow('app', 500);
      addLog('APP', `User requested ${type === 'text' ? 'GPT-4' : 'DALL-E 3'} generation...`);

      // 2. GATEWAY: Request hits API
      await simulateFlow('gateway', 400);
      addLog('API', `POST /v1/apiconsole/generate`, { type });

      // 3. INGESTION: Backend calls ingestion (Simulated visualization)
      await simulateFlow('ingestion', 400);
      
      // Actual API Call to BFF
      const res = await fetch(`${API_URL}/v1/apiconsole/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          type,
          prompt: type === 'text' ? 'Explain quantum computing' : 'Cyberpunk city',
          model: type === 'text' ? 'o1-preview' : 'dall-e-3',
          // Image specific
          size: '1024x1024',
          quality: 'hd',
          count: 1
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setActiveStep(null);
        if (res.status === 402 || res.status === 429) {
          addLog('API', '❌ Request Blocked: Quota Exceeded', data);
        } else {
          addLog('API', `❌ Error: ${data.message || res.statusText}`);
        }
      } else {
        // 4. RATING: Event processed
        await simulateFlow('rating', 600);
        addLog('RATING', 'Calculated cost based on Pricing Table', { 
          model: type === 'text' ? 'o1-preview' : 'dall-e-3',
          cost: type === 'text' ? '~0.15 USD' : '0.04 USD'
        });

        // 5. DB: Balance updated
        await simulateFlow('db', 500);
        addLog('BILLING', 'Deducted credits from wallet');
        
        // Finalize
        setActiveStep(null);
        addLog('APP', 'Response received successfully');
        
        // Refresh balance
        fetchBalance();
      }

    } catch (error) {
      console.error(error);
      addLog('API', 'Network Error');
      setActiveStep(null);
    }
    
    setLoading(false);
  };

  // --- Code Snippets ---

  const snippets = {
    llm: `// Server-Side Code (Node.js)
import { OpenMonetize } from '@openmonetize/sdk';

const client = new OpenMonetize({ 
  apiKey: process.env.OPENMONETIZE_API_KEY 
});

// In your API Route:
async function generateCompletion(req, res) {
  // 1. Generate content
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [...]
  });

  // 2. Track Usage (Async)
  // This sends the event to OpenMonetize Ingestion Service
  await client.trackTokenUsage({
    customer_id: req.user.id,
    feature_id: 'ai-text-generation',
    provider: 'OPENAI',
    model: 'gpt-4o',
    input_tokens: completion.usage.prompt_tokens,
    output_tokens: completion.usage.completion_tokens
  });

  return res.json(completion);
}`,
    image: `// Server-Side Code (Node.js)
import { OpenMonetize } from '@openmonetize/sdk';

const client = new OpenMonetize({ 
  apiKey: process.env.OPENMONETIZE_API_KEY 
});

// In your API Route:
async function generateImage(req, res) {
  // 1. Generate Image
  const image = await openai.images.generate({
    model: 'dall-e-3',
    size: '1024x1024',
    quality: 'hd'
  });

  // 2. Track Usage (Async)
  await client.track({
    event_type: 'IMAGE_GENERATION',
    customer_id: req.user.id,
    feature_id: 'image-generation',
    properties: {
      model: 'dall-e-3',
      size: '1024x1024',
      quality: 'hd',
      count: 1
    }
  });

  return res.json(image);
}`,
  };

  if (!authChecked) return null;

  // --- RENDER: Sign Up Flow ---
  if (!apiKey) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">OpenMonetize <span className="text-blue-600">Cloud</span></h1>
          <p className="text-slate-500">The open-source pricing & billing infrastructure for AI.</p>
        </div>
        <SignUpForm onSuccess={handleLoginSuccess} />
      </div>
    );
  }

  // --- RENDER: Playground ---
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">OpenMonetize <span className="text-blue-600">Console</span></h1>
          <div className="flex items-center gap-2 mt-2">
             <Badge variant="secondary" className="gap-1">
                <User className="h-3 w-3" />
                {customerName}
             </Badge>
             {apiKey && (
               <Badge variant="outline" className="gap-1 font-mono cursor-pointer hover:bg-slate-100" onClick={() => {
                 navigator.clipboard.writeText(apiKey);
                 alert('API Key copied to clipboard!');
               }}>
                 <Terminal className="h-3 w-3" />
                 {apiKey.substring(0, 8)}...
               </Badge>
             )}
             <button onClick={handleLogout} className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1">
                <LogOut className="h-3 w-3" /> Sign Out
             </button>
          </div>
        </div>
        
        {/* Live Balance Badge */}
        <div className="mt-4 md:mt-0 flex items-center gap-4">
           {/* Docs Link */}
           <a 
             href="https://openmonetize-docs.vercel.app" 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors mr-4"
           >
             <BookOpen className="h-4 w-4" />
             Full API Docs
           </a>

           <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4">
            <div className="p-2 bg-green-100 rounded-full text-green-600">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Current Balance</div>
              <div className="text-2xl font-mono font-bold tabular-nums">
                {balance.toLocaleString()} <span className="text-sm text-slate-400 font-normal">credits</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="ml-2 h-8 gap-1" onClick={handleTopUp}>
              <Plus className="h-3 w-3" /> Top Up
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: User Interface (The "App") */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className="flex-1 border-slate-200 shadow-md flex flex-col h-full">
            <CardHeader className="bg-slate-100/50 border-b pb-4">
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-slate-700" />
                API Console
              </CardTitle>
              <CardDescription>
                Test your integration with real-time metering.
              </CardDescription>
            </CardHeader>
            
            <div className="p-6 flex-1">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="llm">Chat Completion</TabsTrigger>
                  <TabsTrigger value="image">Image Generation</TabsTrigger>
                </TabsList>

                {/* LLM SCENARIO */}
                <TabsContent value="llm" className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-slate-600">Model</Label>
                    <div className="p-2 bg-slate-100 rounded border text-sm font-medium text-slate-700">
                      o1-preview
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600">System Prompt</Label>
                    <div className="p-3 bg-slate-50 rounded-md border text-sm text-slate-600 font-mono">
                      You are a helpful AI assistant...
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>User Message</Label>
                    <Input defaultValue="Explain quantum computing in simple terms" />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                     <span>Estimated Cost: ~$0.15</span>
                     <span>Tokens: ~1,200</span>
                  </div>

                  <Button size="lg" className="w-full bg-slate-900 hover:bg-slate-800 text-white" onClick={() => handleGeneration('text')} disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
                    Execute Request
                  </Button>
                </TabsContent>

                {/* IMAGE SCENARIO */}
                <TabsContent value="image" className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-slate-600">Model</Label>
                    <div className="p-2 bg-slate-100 rounded border text-sm font-medium text-slate-700">
                      dall-e-3
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Prompt</Label>
                    <Input defaultValue="A cyberpunk city with neon lights, digital art style" />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                     <span>Cost: $0.04 / image</span>
                     <span>Size: 1024x1024</span>
                  </div>

                  <Button size="lg" className="w-full bg-slate-900 hover:bg-slate-800 text-white" onClick={() => handleGeneration('image')} disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
                    Generate Image
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: Live Logs & Code */}
        <div className="lg:col-span-7 flex flex-col gap-6 h-[600px]">
          
          {/* TABS: Logs vs Code */}
          <Tabs defaultValue="logs" className="flex-1 flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
              <TabsList>
                <TabsTrigger value="logs" className="gap-2"><Activity className="h-3 w-3" /> Live Logs</TabsTrigger>
                <TabsTrigger value="code" className="gap-2"><Code className="h-3 w-3" /> Integration Code</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                 <div className="flex items-center gap-1.5 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    System Online
                 </div>
              </div>
            </div>

            <TabsContent value="logs" className="flex-1 h-full mt-0">
              <Card className="h-full flex flex-col border-slate-200 shadow-md overflow-hidden bg-slate-950 text-slate-300 font-mono text-sm">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                  <span className="text-xs text-slate-500">Output Stream</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-500 hover:text-slate-300" onClick={() => setLogs([])}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-1">
                    {logs.length === 0 && (
                      <div className="text-slate-600 italic text-center mt-20">
                        Waiting for requests...
                      </div>
                    )}
                    {logs.map((log) => (
                      <div key={log.id} className="group flex gap-3 hover:bg-slate-900/50 p-1 rounded transition-colors">
                        <span className="text-slate-600 shrink-0 select-none w-20">{log.timestamp}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "text-[10px] h-4 px-1 rounded-sm border-0 font-bold",
                                log.source === 'API' && "bg-blue-900/30 text-blue-400",
                                log.source === 'RATING' && "bg-purple-900/30 text-purple-400",
                                log.source === 'BILLING' && "bg-green-900/30 text-green-400",
                                log.source === 'APP' && "bg-slate-800 text-slate-400"
                              )}
                            >
                              {log.source}
                            </Badge>
                            <span className="text-slate-300">{log.message}</span>
                          </div>
                          {log.details && (
                            <pre className="mt-1 text-[10px] text-slate-500 overflow-x-auto bg-slate-900/50 p-2 rounded border border-slate-800/50">
                              {JSON.stringify(log.details, null, 2)}
                            </pre>
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={logEndRef} />
                  </div>
                </ScrollArea>
              </Card>
            </TabsContent>

            <TabsContent value="code" className="flex-1 h-full mt-0">
              <Card className="h-full flex flex-col border-slate-200 shadow-md overflow-hidden bg-[#1e1e1e] text-white">
                 <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#3e3e42]">
                    <span className="text-xs text-slate-400">example.ts</span>
                 </div>
                 <ScrollArea className="flex-1">
                    <pre className="p-4 text-sm font-mono leading-relaxed">
                      <code className="language-typescript">
                        {activeTab === 'llm' ? snippets.llm : snippets.image}
                      </code>
                    </pre>
                 </ScrollArea>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
