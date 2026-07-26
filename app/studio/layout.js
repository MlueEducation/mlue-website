'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { fetchStaffRole } from '@/lib/studioAccess';
import { StudioContext } from '@/components/studio/StudioContext';
import StudioShell from '@/components/studio/StudioShell';
import AccessDenied from '@/components/studio/AccessDenied';

export default function StudioLayout({ children }) {
  const { user, loading } = useAuth();
  const [staffRole, setStaffRole] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) { setChecking(false); return; }
    let cancelled = false;
    fetchStaffRole(user.id).then((role) => {
      if (!cancelled) { setStaffRole(role); setChecking(false); }
    });
    return () => { cancelled = true; };
  }, [user, loading]);

  if (loading || checking) {
    return (
      <div className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center">
        <p className="text-[var(--text-secondary)] text-sm">Yüklənir...</p>
      </div>
    );
  }

  if (!user || !staffRole) {
    return <AccessDenied />;
  }

  return (
    <StudioContext.Provider value={{ user, staffRole }}>
      <StudioShell staffRole={staffRole}>{children}</StudioShell>
    </StudioContext.Provider>
  );
}
