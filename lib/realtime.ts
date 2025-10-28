// lib/realtime.ts
import { createClient } from '@supabase/supabase-js';

type RealTimeEvent = {
  eventName: string;
  data: any;
};

interface RealTimeAdapter {
  on(eventName: string, callback: (data: any) => void): void;
  off(eventName: string, callback: (data: any) => void): void;
  subscribe(eventName: string): RealTimeEvent;
}

class RealtimeAdapter implements RealTimeAdapter {
  private providers: {
    ws: WebSocket | null;
    supabase: any;
  } = {
    ws: null,
    supabase: null,
  };

  private eventHandlers: Record<string, Array<Function>> = {};

  constructor(
    private providersConfig: {
      realtimeProvider: 'ws' | 'supabase';
      supabaseUrl?: string;
      supabaseKey?: string;
    }
  ) {
    // Initialize the selected provider
    switch (providersConfig.realtimeProvider) {
      case 'ws':
        this.initWebSocket();
        break;
      case 'supabase':
        this.initSupabase(providersConfig.supabaseUrl, providersConfig.supabaseKey);
        break;
      default:
        throw new Error('Invalid realtime provider configuration');
    }
  }

  private initWebSocket() {
    const ws = new WebSocket(`wss://your-websocket-server.com`);
    ws.onmessage = (event) => {
      const parsedEvent: RealTimeEvent = JSON.parse(event.data);
      this.triggerEventHandlers(parsedEvent.eventName, parsedEvent.data);
    };
    this.providers.ws = ws;
  }

  private initSupabase(url: string, key: string) {
    this.providers.supabase = createClient(url, key).realtime;
    this.providers.supabase.on('*', (payload: any) => {
      this.triggerEventHandlers(payload.event, payload.data);
    });
  }

  private triggerEventHandlers(eventName: string, data: any) {
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((handler) => handler(data));
    }
  }

  on(eventName: string, callback: (data: any) => void) {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(callback);
  }

  off(eventName: string, callback: (data: any) => void) {
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = this.eventHandlers[eventName].filter(
        (handler) => handler !== callback
      );
    }
  }

  subscribe(eventName: string): RealTimeEvent {
    // In a real implementation, this would return a subscription object
    return { eventName, data: {} };
  }
}

// Environment Variables Documentation:
// REALTIME_PROVIDER: 'ws' or 'supabase' (default: 'supabase')
// SUPABASE_URL: Supabase project URL if using Supabase Realtime
// SUPABASE_KEY: Supabase anon key if using Supabase Realtime
// REALTIME_DEBUG: Optional (boolean) to enable logging

// Usage:
// const realtime = new RealtimeAdapter({
//   realtimeProvider: process.env.REALTIME_PROVIDER || 'supabase',
//   supabaseUrl: process.env.SUPABASE_URL,
//   supabaseKey: process.env.SUPABASE_KEY,
// });

export default realtime;