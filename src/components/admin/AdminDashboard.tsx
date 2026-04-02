import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { GalleryEditor } from './GalleryEditor';
import { ContactsEditor } from './ContactsEditor';
import { LogOut, ExternalLink } from 'lucide-react';

export function AdminDashboard() {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-4 py-3 flex items-center justify-between">
        <h1 className="text-sm font-medium tracking-[0.15em] uppercase">SAMAR Admin</h1>
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            Сайт <ExternalLink size={12} />
          </a>
          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut size={14} className="mr-1" /> Выйти
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <Tabs defaultValue="gallery">
          <TabsList className="mb-6">
            <TabsTrigger value="gallery">Галерея</TabsTrigger>
            <TabsTrigger value="contacts">Контакты</TabsTrigger>
          </TabsList>
          <TabsContent value="gallery">
            <GalleryEditor />
          </TabsContent>
          <TabsContent value="contacts">
            <ContactsEditor />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
