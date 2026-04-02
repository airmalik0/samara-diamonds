import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function AdminLogin() {
  const { signIn } = useAuth();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(password);
    setLoading(false);
    if (error) {
      toast.error('Неверный пароль');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-medium tracking-[0.15em] uppercase">
            SAMAR DIAMONDS
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Панель управления</p>
        </div>
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        <Button type="submit" className="w-full" disabled={loading || !password}>
          {loading ? 'Вход...' : 'Войти'}
        </Button>
      </form>
    </div>
  );
}
