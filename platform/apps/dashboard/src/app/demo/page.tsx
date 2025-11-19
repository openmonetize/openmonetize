'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2, Zap } from 'lucide-react';

const DEMO_API_KEY = 'om_live_demo123'; // Hardcoded for demo
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function DemoPage() {
  const [prompt, setPrompt] = useState('A futuristic city with flying cars');
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<string>('0');
  const [response, setResponse] = useState<string | null>(null);
  const [usageHistory, setUsageHistory] = useState<any[]>([]);

  // Fetch balance
  const fetchBalance = async () => {
    try {
      const res = await fetch(`${API_URL}/v1/credits/balance`, {
        headers: {
          'Authorization': `Bearer ${DEMO_API_KEY}`,
        },
      });
      const data = await res.json();
      if (data.data) {
        setBalance(data.data.balance);
      }
    } catch (error) {
      console.error('Failed to fetch balance', error);
    }
  };

  useEffect(() => {
    fetchBalance();
    // Poll balance every 2 seconds to show real-time updates
    const interval = setInterval(fetchBalance, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch(`${API_URL}/v1/demo/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEMO_API_KEY}`,
        },
        body: JSON.stringify({
          prompt,
          model: 'gpt-4',
          provider: 'openai',
        }),
      });
      const data = await res.json();
      setResponse(data.choices[0].message.content);
      
      // Update usage history for graph
      setUsageHistory(prev => [...prev, {
        time: new Date().toLocaleTimeString(),
        tokens: data.usage.total_tokens,
      }].slice(-20)); // Keep last 20 points

      // Refresh balance immediately
      fetchBalance();
    } catch (error) {
      console.error('Failed to generate', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Controls */}
        <div className="md:col-span-2 space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">OpenMonetize Playground</h1>
            <p className="text-slate-500">Experience real-time usage tracking and billing latency.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Generation (Simulated)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">Prompt</Label>
                <Input 
                  id="prompt" 
                  value={prompt} 
                  onChange={(e) => setPrompt(e.target.value)} 
                  placeholder="Enter a prompt..." 
                />
              </div>
              <Button 
                onClick={handleGenerate} 
                disabled={loading} 
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Generate & Burn Credits
                  </>
                )}
              </Button>

              {response && (
                <div className="p-4 bg-slate-100 rounded-md text-sm text-slate-700 mt-4">
                  {response}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Real-time Latency Graph</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usageHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="tokens" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              {usageHistory.length === 0 && (
                <div className="text-center text-slate-400 mt-[-150px]">
                  Generate requests to see usage spikes
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Billing */}
        <div className="space-y-8">
          <Card className="bg-slate-900 text-white border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-200">Credit Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold font-mono text-green-400">
                {parseInt(balance).toLocaleString()}
              </div>
              <p className="text-sm text-slate-400 mt-2">Credits Remaining</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">API Gateway</span>
                <span className="text-green-600 font-medium">Connected</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ingestion</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Rating Engine</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Latency</span>
                <span className="text-slate-900 font-medium">~800ms</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
