'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Loader2, Terminal, Play, CreditCard, Activity, Code2, LogOut, User } from 'lucide-react';
import { SignUpForm } from '@/components/auth/SignUpForm';

// Types for our simulated logs
type LogEntry = {
  id: string;
  timestamp: string;
  source: 'APP' | 'API' | 'BILLING';
  message: string;
  details?: any;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function ImprovedDemoPage() {
  const [activeTab, setActiveTab] = useState('llm');
  const [balance, setBalance] = useState<number>(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);
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
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  // --- Auth & Init ---

  useEffect(() => {
    // Check local storage for existing session
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

  useEffect(() => {
    if (apiKey) {
      fetchBalance(true);
      addLog('APP', 'OpenMonetize SDK initialized');
      addLog('APP', 'Environment: Production (SaaS)');
    }
  }, [apiKey]);

  // --- Handlers ---

  const handleLLMGeneration = async () => {
    if (!apiKey) return;
    setLoading(true);
    addLog('APP', 'User requested GPT-4 generation...');
    
    try {
      // 1. Simulate the Application Logic
      await new Promise(r => setTimeout(r, 800)); // Fake latency
      const tokens = 1420; // Fake usage
      
      // 2. Simulate the Tracking Call
      addLog('API', `POST /v1/events/ingest`, {
        event_type: 'TOKEN_USAGE',
        model: 'gpt-4',
        input_tokens: 120,
        output_tokens: 1300
      });

      // 3. Actual API Call
      const event = {
        event_id: crypto.randomUUID(),
        customer_id: 'self', // The API key identifies the customer
        event_type: 'TOKEN_USAGE',
        feature_id: 'gpt-4-completion', // Assuming this exists in burntable
        provider: 'OPENAI',
        model: 'gpt-4',
        input_tokens: 120,
        output_tokens: 1300,
        timestamp: new Date().toISOString(),
      };

      const res = await fetch(`${API_URL}/v1/events/ingest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ events: [event] }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle Quota Exceeded
        if (res.status === 402 || res.status === 429) {
          addLog('API', '❌ Request Blocked: Quota Exceeded', data);
          alert(data.message); // Simple alert for MVP
        } else {
          addLog('API', `❌ Error: ${data.message || res.statusText}`);
        }
      } else {
        addLog('BILLING', 'Event Ingested Successfully');
        
        // Wait a bit for async rating then fetch balance
        setTimeout(() => {
          fetchBalance();
        }, 1000);
      }

      setLoading(false);

    } catch (error) {
      console.error(error);
      addLog('API', 'Network Error');
      setLoading(false);
    }
  };

  const handleImageGen = async () => {
    if (!apiKey) return;
    setLoading(true);
    addLog('APP', 'User requested DALL-E 3 generation...');
    
    // Simulate API Latency
    await new Promise(r => setTimeout(r, 1500));
    
    addLog('API', `POST /v1/events/ingest`, {
      event_type: 'IMAGE_GENERATION',
      size: '1024x1024',
      quality: 'hd',
      count: 1
    });

    // Actual API Call
    const event = {
      event_id: crypto.randomUUID(),
      customer_id: 'self',
      event_type: 'IMAGE_GENERATION',
      feature_id: 'dalle-3-gen',
      image_count: 1,
      image_size: '1024x1024',
      quality: 'hd',
      timestamp: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${API_URL}/v1/events/ingest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ events: [event] }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 402 || res.status === 429) {
          addLog('API', '❌ Request Blocked: Quota Exceeded', data);
          alert(data.message);
        } else {
          addLog('API', `❌ Error: ${data.message || res.statusText}`);
        }
      } else {
        addLog('BILLING', 'Event Ingested Successfully');
        setTimeout(() => {
          fetchBalance();
        }, 1000);
      }
    } catch (err) {
      addLog('API', 'Network Error');
    }

    setLoading(false);
  };

  // --- Code Snippets ---

  const snippets = {
    llm: `// 1. Initialize Client
const client = new OpenMonetize({ 
  apiKey: '${apiKey || 'YOUR_API_KEY'}' 
});

// 2. Track Usage after LLM response
await client.track({
  event: 'TOKEN_USAGE',
  customer_id: 'user_123', // Your end-user's ID
  properties: {
    model: 'gpt-4',
    provider: 'openai',
    input_tokens: 120,
    output_tokens: 1300
  }
});`,
    image: `// 1. Initialize Client
const client = new OpenMonetize({ 
  apiKey: '${apiKey || 'YOUR_API_KEY'}' 
});

// 2. Track Image Generation
await client.track({
  event: 'IMAGE_GENERATION',
  customer_id: 'user_123',
  properties: {
    model: 'dall-e-3',
    size: '1024x1024',
    quality: 'hd',
    count: 1
  }
});`,
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
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">OpenMonetize <span className="text-blue-600">Console</span></h1>
          <div className="flex items-center gap-2 mt-2">
             <Badge variant="secondary" className="gap-1">
                <User className="h-3 w-3" />
                {customerName}
             </Badge>
             <button onClick={handleLogout} className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1">
                <LogOut className="h-3 w-3" /> Sign Out
             </button>
          </div>
        </div>
        
        {/* Live Balance Badge */}
        <div className="mt-4 md:mt-0 bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4">
          <div className="p-2 bg-green-100 rounded-full text-green-600">
            <CreditCard className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Current Balance</div>
            <div className="text-2xl font-mono font-bold tabular-nums">
              {balance.toLocaleString()} <span className="text-sm text-slate-400 font-normal">credits</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 h-[800px]">
        
        {/* LEFT COLUMN: User Interface (The "App") */}
        <div className="flex flex-col gap-6">
          <Card className="flex-1 border-slate-200 shadow-md flex flex-col">
            <CardHeader className="bg-slate-100/50 border-b pb-4">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                Simulate Usage
              </CardTitle>
              <CardDescription>
                Perform actions to trigger metering events against your account.
              </CardDescription>
            </CardHeader>
            
            <div className="p-6 flex-1">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="llm">LLM Chat (Token Based)</TabsTrigger>
                  <TabsTrigger value="image">Image Gen (Per Unit)</TabsTrigger>
                </TabsList>

                {/* LLM SCENARIO */}
                <TabsContent value="llm" className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-slate-600">System Prompt</Label>
                    <div className="p-3 bg-slate-100 rounded-md text-sm text-slate-500 font-mono">
                      You are a helpful AI assistant...
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>User Message</Label>
                    <Input defaultValue="Explain quantum computing in simple terms" />
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex justify-between text-sm text-blue-900 mb-1">
                      <span className="font-medium">Estimated Cost</span>
                      <span className="font-mono">~2,100 Credits</span>
                    </div>
                    <div className="text-xs text-blue-600">
                      Based on GPT-4 pricing (Input + Output tokens)
                    </div>
                  </div>

                  <Button size="lg" className="w-full" onClick={handleLLMGeneration} disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
                    Send Message & Meter Usage
                  </Button>
                </TabsContent>

                {/* IMAGE SCENARIO */}
                <TabsContent value="image" className="space-y-6">
                  <div className="space-y-2">
                    <Label>Image Description</Label>
                    <Input defaultValue="Cyberpunk city with neon lights, rain, 4k" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Size</Label>
                      <select className="w-full p-2 rounded border bg-white text-sm">
                        <option>1024x1024</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Quality</Label>
                      <select className="w-full p-2 rounded border bg-white text-sm">
                        <option>HD</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <div className="flex justify-between text-sm text-purple-900 mb-1">
                      <span className="font-medium">Fixed Price</span>
                      <span className="font-mono">40 Credits</span>
                    </div>
                    <div className="text-xs text-purple-600">
                      Flat rate per HD Image generation
                    </div>
                  </div>

                  <Button size="lg" className="w-full" onClick={handleImageGen} disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
                    Generate Image
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: Developer Experience (The "Under the hood") */}
        <div className="flex flex-col gap-6">
          
          {/* 1. The Implementation Code */}
          <Card className="bg-[#1e1e1e] border-slate-800 text-slate-300 shadow-xl">
            <CardHeader className="border-b border-slate-800 pb-3">
              <CardTitle className="flex items-center gap-2 text-slate-100 text-sm font-medium">
                <Code2 className="h-4 w-4 text-blue-400" />
                Implementation (Client-Side)
              </CardTitle>
            </CardHeader>
            <div className="p-4 overflow-x-auto font-mono text-sm leading-relaxed">
              <pre>
                <code className="language-typescript">
                  {/* Dynamically show the code relevant to what the user is doing */}
                  {activeTab === 'llm' ? snippets.llm : snippets.image}
                </code>
              </pre>
            </div>
          </Card>

          {/* 2. The Live Execution Log */}
          <Card className="flex-1 bg-black border-slate-800 text-slate-300 shadow-xl flex flex-col min-h-[300px]">
            <CardHeader className="border-b border-slate-800 pb-3 bg-slate-900/50">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2 text-slate-100 text-sm font-medium">
                  <Terminal className="h-4 w-4 text-green-400" />
                  Live Event Stream
                </CardTitle>
                <Badge variant="outline" className="text-green-500 border-green-900 bg-green-900/20 animate-pulse text-[10px]">
                  LISTENING
                </Badge>
              </div>
            </CardHeader>
            <ScrollArea className="flex-1 p-4 font-mono text-xs">
              <div className="space-y-3">
                {logs.map((log) => (
                  <div key={log.id} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                    <div className="text-slate-600 shrink-0">{log.timestamp}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge 
                          variant="outline" 
                          className={`
                            h-5 px-1 text-[10px] border-0
                            ${log.source === 'APP' ? 'bg-blue-900/30 text-blue-400' : ''}
                            ${log.source === 'API' ? 'bg-purple-900/30 text-purple-400' : ''}
                            ${log.source === 'BILLING' ? 'bg-orange-900/30 text-orange-400' : ''}
                          `}
                        >
                          {log.source}
                        </Badge>
                        <span className="text-slate-300">{log.message}</span>
                      </div>
                      {log.details && (
                        <div className="bg-slate-900/50 p-2 rounded border border-slate-800 text-slate-400 ml-1">
                          <pre>{JSON.stringify(log.details, null, 2)}</pre>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={logEndRef} />
              </div>
            </ScrollArea>
          </Card>

        </div>
      </div>
    </div>
  );
}