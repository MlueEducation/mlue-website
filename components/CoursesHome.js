'use client';

import { useMemo, useState } from 'react';
import MeagleAvatar from './MeagleAvatar';
import MeagleChatDrawer from './MeagleChatDrawer';
import CourseCatalogGrid from './CourseCatalogGrid';

export default function CoursesHome({ user }) {
  const [chatOpen, setChatOpen] = useState(false);

  const displayName = useMemo(() => {
    const meta = user && user.user_metadata;
    const full = meta && meta.full_name;
    if (full) return full.split(' ')[0];
    return user && user.email ? user.email.split('@')[0] : 'dostum';
  }, [user]);

  return (
    <section className="courses-home">
      <div className="container">
        <div className="courses-home-header">
          <div className="eyebrow">Kurs kataloqu</div>
          <h1>Xoş gəldin, {displayName} 👋</h1>
          <p className="section-sub">Kateqoriyalara görə göz gəzdir və növbəti kursunu seç.</p>
          <div className="badge courses-badge"><span className="dot"></span>Kataloq mərhələli açılır — aşağıdakılar ilk baxışdır</div>
        </div>

        <CourseCatalogGrid
          toolbarExtra={
            <button type="button" className="ai-chat-trigger" onClick={() => setChatOpen(true)}>
              <MeagleAvatar expression="cheerful" size={24} />
              Meagle ilə Soruş
            </button>
          }
        />
      </div>
      <MeagleChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} />
    </section>
  );
}
