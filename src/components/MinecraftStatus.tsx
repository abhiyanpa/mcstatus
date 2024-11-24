'use client';

import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import StatusModal from './StatusModal';

export default function MinecraftStatus() {
  const [serverAddress, setServerAddress] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const [serverData, setServerData] = useState(null);
  const [loading, setLoading] = useState(false);
  // Add this new state
  const [isJava, setIsJava] = useState(true);

  const checkStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serverAddress.trim()) return;

    setLoading(true);
    try {
      // Only change this line to add bedrock support
      const apiUrl = isJava 
        ? `https://api.mcsrvstat.us/3/${encodeURIComponent(serverAddress.trim())}`
        : `https://api.mcsrvstat.us/bedrock/3/${encodeURIComponent(serverAddress.trim())}`;
        
      const response = await fetch(apiUrl);
      const data = await response.json();
      setServerData(data);
      setShowStatus(true);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center relative px-4">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-8">
          Find out the status of the{' '}
          <span className="text-emerald-500">Minecraft</span> server
        </h1>

        <form onSubmit={checkStatus} className="w-full max-w-xl mx-auto">
          <div className="bg-zinc-900/50 p-1 rounded-lg flex items-center gap-2">
            <div className="flex-1 flex items-center bg-zinc-900 rounded-md px-3 py-2">
              <Globe className="w-5 h-5 text-zinc-400 mr-2" />
              <input
                type="text"
                value={serverAddress}
                onChange={(e) => setServerAddress(e.target.value)}
                placeholder={isJava ? 'indianmc.in' : 'play.nethergames.org'}
                className="bg-transparent w-full text-foreground outline-none placeholder:text-zinc-500 font-mono"
              />
            </div>
            {/* Add this button for edition toggle */}
            <button
              type="button"
              onClick={() => setIsJava(!isJava)}
              className="px-3 py-2 text-zinc-400 bg-zinc-900 rounded-md font-mono hover:text-white transition-colors"
            >
              {isJava ? 'Java Edition' : 'Bedrock'}
            </button>
            <button
              type="submit"
              disabled={loading || !serverAddress.trim()}
              className="bg-emerald-600 text-foreground px-4 py-2 rounded-md hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? 'Checking...' : 'Get status'}
            </button>
          </div>
        </form>

        <p className="text-zinc-500 mt-4 text-sm font-mono">
          More than 5,400 servers checked.
        </p>
      </div>

      {showStatus && (
        <StatusModal 
          serverData={serverData} 
          onClose={() => {
            setShowStatus(false);
            setServerData(null);
          }} 
        />
      )}

      <div className="absolute right-0 bottom-0 w-96 h-96 pointer-events-none">
      </div>
    </main>
  );
}