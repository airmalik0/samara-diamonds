import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function SupabaseTest() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [detail, setDetail] = useState('');

  useEffect(() => {
    async function check() {
      try {
        // Simple health check — call auth.getSession() which works without any tables
        const { error } = await supabase.auth.getSession();
        if (error) {
          setStatus('error');
          setDetail(error.message);
        } else {
          setStatus('connected');
          setDetail('Supabase подключён');
        }
      } catch (e) {
        setStatus('error');
        setDetail(e instanceof Error ? e.message : 'Unknown error');
      }
    }
    check();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 px-4 py-2 rounded-lg text-sm font-mono shadow-lg border border-border bg-background/95 backdrop-blur">
      {status === 'checking' && <span className="text-yellow-400">⏳ Connecting…</span>}
      {status === 'connected' && <span className="text-green-400">✅ {detail}</span>}
      {status === 'error' && <span className="text-red-400">❌ {detail}</span>}
    </div>
  );
}
