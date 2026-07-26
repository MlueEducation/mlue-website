'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, LogOut, GraduationCap } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { supabase } from '@/lib/supabaseClient';

export default function StudioShell({ staffRole, children }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/');
  }

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex">
      <aside className="w-64 flex-shrink-0 hidden md:flex flex-col border-r border-[var(--border)] bg-[var(--bg-surface)]/70 backdrop-blur-xl sticky top-0 h-screen">
        <div className="p-6">
          <Link href="/studio" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-warm)] flex items-center justify-center text-white flex-shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-[var(--text-primary)] leading-tight">MLUE Studio</div>
              <div className="text-[11px] text-[var(--text-tertiary)]">{staffRole === 'admin' ? 'Admin' : 'Müəllim'}</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <Link
            href="/studio"
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-colors duration-200 ${
              pathname === '/studio'
                ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)]'
            }`}
          >
            <LayoutDashboard className="w-4.5 h-4.5" />
            Kurslar
          </Link>
        </nav>

        <div className="p-4 border-t border-[var(--border)] flex items-center justify-between gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--danger)] px-3 py-2 rounded-xl hover:bg-[var(--bg-surface-2)] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Çıxış
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="md:hidden flex items-center justify-between px-5 py-4 border-b border-[var(--border)] bg-[var(--bg-surface)]/70 backdrop-blur-xl sticky top-0 z-10">
          <Link href="/studio" className="text-sm font-extrabold text-[var(--text-primary)]">MLUE Studio</Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button type="button" onClick={handleSignOut} className="text-[var(--text-secondary)]">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-8 md:py-12">{children}</div>
      </div>
    </div>
  );
}
