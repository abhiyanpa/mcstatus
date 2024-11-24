'use client';

import { useState } from 'react';
import { X, Copy, Check, Server, Users, Globe2 } from 'lucide-react';
import { parseMinecraftText } from '@/lib/minecraftColors';

interface ServerData {
  online: boolean;
  icon?: string;
  version?: string;
  hostname?: string;
  ip?: string;
  port?: number;
  protocol?: {
    version: number;
    name: string;
  };
  debug?: {
    ping: boolean;
    query: boolean;
    srv: boolean;
  };
  players?: {
    online: number;
    max: number;
  };
  motd?: {
    raw: string[];
    clean: string[];
    html: string[];
  };
  software?: string;
  map?: {
    raw: string;
    clean: string;
    html: string;
  };
}

interface StatusModalProps {
  serverData: ServerData | null;
  onClose: () => void;
}

export default function StatusModal({ serverData, onClose }: StatusModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!serverData) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-zinc-900 rounded-lg p-6">
          <div className="text-center text-red-500">
            Failed to load server data
          </div>
        </div>
      </div>
    );
  }

  // Extract base64 data from icon URL if it exists
  const iconData = serverData.icon?.split(',')[1] || '';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-zinc-900 rounded-lg p-6 max-w-xl w-full relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex flex-col items-center">
          {/* Server Icon */}
          <div className="w-16 h-16 bg-zinc-800 rounded mb-4">
            {iconData && (
              <img 
                src={`data:image/png;base64,${iconData}`}
                alt="Server Icon"
                className="w-full h-full rounded object-cover"
              />
            )}
          </div>
          
          <h2 className="text-xl font-bold text-white mb-4">
            {serverData.online ? (
              <span className="text-green-500">● Online</span>
            ) : (
              <span className="text-red-500">● Offline</span>
            )}
          </h2>
          
          {serverData.online && (
            <div className="w-full space-y-4">
              {/* Server Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Server className="w-4 h-4 text-blue-400" />
                    <span className="text-white font-medium">Server Info</span>
                  </div>
                  {serverData.version && (
                    <p className="text-zinc-400">Version: {serverData.version}</p>
                  )}
                  {serverData.protocol?.version && (
                    <p className="text-zinc-400">Protocol: {serverData.protocol.version}</p>
                  )}
                  {serverData.software && (
                    <p className="text-zinc-400">Software: {serverData.software}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-green-400" />
                    <span className="text-white font-medium">Players</span>
                  </div>
                  {serverData.players && (
                    <p className="text-zinc-400">
                      {serverData.players.online} / {serverData.players.max}
                    </p>
                  )}
                </div>
              </div>

              {/* MOTD */}
              {serverData.motd?.raw && (
                <div className="bg-black/50 rounded-lg p-4">
                  {serverData.motd.raw.map((line, i) => (
                    <div key={i} className="flex flex-wrap">
                      {parseMinecraftText(line).map((part, j) => (
                        <span
                          key={j}
                          style={{
                            color: part.color,
                            fontWeight: part.bold ? 'bold' : 'normal',
                            fontStyle: part.italic ? 'italic' : 'normal',
                            textDecoration: part.underlined
                              ? 'underline'
                              : part.strikethrough
                              ? 'line-through'
                              : 'none',
                          }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* Connection Info */}
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Globe2 className="w-4 h-4 text-purple-400" />
                  <span className="text-white font-medium">Connection Info</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {serverData.ip && (
                    <div className="flex items-center justify-between bg-black/30 rounded px-3 py-2">
                      <span className="text-zinc-400">{serverData.ip}</span>
                      <button
                        onClick={() => copyToClipboard(serverData.ip!, 'ip')}
                        className="p-1 hover:bg-zinc-700 rounded transition-colors"
                        title="Copy IP"
                      >
                        {copiedField === 'ip' ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-zinc-400" />
                        )}
                      </button>
                    </div>
                  )}
                  {serverData.port && (
                    <div className="flex items-center justify-between bg-black/30 rounded px-3 py-2">
                      <span className="text-zinc-400">Port: {serverData.port}</span>
                      <button
                        onClick={() => copyToClipboard(serverData.port!.toString(), 'port')}
                        className="p-1 hover:bg-zinc-700 rounded transition-colors"
                        title="Copy Port"
                      >
                        {copiedField === 'port' ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-zinc-400" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* DNS Info */}
              {serverData.debug && (
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p className="text-zinc-400">
                      SRV Record: {serverData.debug.srv ? 'Found' : 'Not Found'}
                    </p>
                    <p className="text-zinc-400">
                      Query: {serverData.debug.query ? 'Available' : 'Not Available'}
                    </p>
                    <p className="text-zinc-400">
                      Ping: {serverData.debug.ping ? 'Successful' : 'Failed'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}