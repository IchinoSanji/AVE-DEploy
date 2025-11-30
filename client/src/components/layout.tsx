import { Link, useLocation } from "wouter";
import { Activity, Upload, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center text-primary-foreground font-serif font-bold text-xl group-hover:scale-105 transition-transform">
              A
            </div>
            <span className="font-serif font-bold text-xl tracking-tight">ArtVision</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className={`text-sm font-medium hover:text-primary transition-colors ${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
              Analyze
            </Link>
            <Link href="/history" className={`text-sm font-medium hover:text-primary transition-colors ${location === '/history' ? 'text-primary' : 'text-muted-foreground'}`}>
              History
            </Link>
            <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/10 hover:text-primary">
              Sign In
            </Button>
          </nav>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="border-l border-white/10 bg-black/95">
                <div className="flex flex-col gap-6 mt-10">
                  <Link href="/" className="text-lg font-serif hover:text-primary">
                    Analyze Art
                  </Link>
                  <Link href="/history" className="text-lg font-serif hover:text-primary">
                    History
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {children}
      </main>

      <footer className="border-t border-white/5 bg-black/50 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p className="font-serif italic mb-2">"Art is not what you see, but what you make others see."</p>
          <p>&copy; 2025 ArtVision. Powered by Advanced AI.</p>
        </div>
      </footer>
    </div>
  );
}
