'use client';

import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export default function AccessDenied() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center px-6">
      <div className="bg-[var(--bg-surface)] border border-[var(--border)] shadow-sm rounded-[28px] p-10 max-w-sm w-full text-center">
        <div className="w-14 h-14 rounded-full bg-[var(--danger-10)] text-[var(--danger)] flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-extrabold text-[var(--text-primary)] mb-2">Bura girişin yoxdur</h1>
        <p className="text-sm text-[var(--text-secondary)] mb-6">MLUE Studio yalnız admin və müəllim hesabları üçündür.</p>
        <Link href="/" className="block bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold py-3 rounded-xl transition-colors">
          Ana səhifəyə qayıt
        </Link>
      </div>
    </div>
  );
}
