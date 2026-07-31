'use client';

import { useEffect, useRef, useState } from 'react';
import { X, Send } from 'lucide-react';
import MeagleAvatar from './MeagleAvatar';
import { useAuth } from './AuthProvider';
import { supabase } from '@/lib/supabaseClient';
import { incrementMeagleUsage } from '@/lib/meagleUsage';

const CANNED_REPLIES = [
  {
    match: /data|analit/i,
    text: 'Data Elmi kateqoriyasında Python, SQL və Maşın Öyrənməsi kimi kurslar var — kataloqda "Data Elmi" filterinə bax!',
  },
  {
    match: /biznes|marketinq|sahibkar/i,
    text: 'Biznes kateqoriyasında sahibkarlıq, marketinq və maliyyə üzrə kurslar tapa bilərsən — "Biznes" filterinə bax!',
  },
  {
    match: /proqramla|kompüter|kod/i,
    text: 'Kompüter Elmləri və İnformasiya Texnologiyaları kateqoriyalarında proqramlaşdırma kursları var — yuxarıdakı filterlərə bax!',
  },
  {
    match: /dil|ingilis|rus/i,
    text: 'Dil Öyrənmə kateqoriyasında İngilis, Rus və Türk dili kursları var — kataloqda "Dil Öyrənmə" filterinə bax!',
  },
];
const FALLBACK_REPLY = 'Hələ erkən mərhələdəyəm və hər sualı başa düşə bilmirəm — yuxarıdakı axtarış qutusu və ya kateqoriya filtrləri ilə daha dəqiq nəticə tapa bilərsən.';

/* Meagle has no real LLM behind it — these replies are still canned/local,
   but the ones below are templated with the user's own real Supabase data
   (exam scores, certificates, XP/streak) instead of generic text, so
   answers about "my scores" or "my progress" are actually personal. */
function getPersonalizedReply(text, context) {
  if (/bal|nəticə|neçə xal/i.test(text)) {
    if (!context.examResult) {
      return 'Hələ DİM Kalkulyatorunda saxladığın bir nəticən yoxdur — Simulyasiyalar bölməsindən "DİM Kalkulyatoru"na keçib ballarını daxil et, mən də sənə orada təhlil verim.';
    }
    const scores = Object.entries(context.examResult.subjects_and_scores || {})
      .filter(([key]) => key.startsWith('qebul:'))
      .map(([key, score]) => `${key.slice('qebul:'.length)}: ${score}`)
      .join(', ');
    return `Son saxladığın nəticəyə görə ${context.examResult.subgroup || context.examResult.major_group + ' qrup'} üzrə ballarin belədir — ${scores}. Zəif fənni Sınaq Nəticələri bölməsindən görüb hədəfli kurs tövsiyəsi ala bilərsən.`;
  }
  if (/sertifikat/i.test(text)) {
    return context.certificateCount > 0
      ? `Hazırda ${context.certificateCount} sertifikatın var — Sertifikatlar bölməsindən onlara baxa bilərsən.`
      : 'Hələ sertifikatın yoxdur — bir kursu tamamlayaraq ilk sertifikatını qazana bilərsən.';
  }
  if (/xp|səviyyə|irəliləyiş|streak|seriya/i.test(text)) {
    return `Hazırda ${context.xp} XP-n və ${context.streak} günlük seriyan var — Nailiyyətlər bölməsindən gündəlik tapşırıqları tamamlayaraq daha da artıra bilərsən.`;
  }
  return null;
}

function getReply(text, context) {
  const personalized = getPersonalizedReply(text, context);
  if (personalized) return personalized;
  const found = CANNED_REPLIES.find((r) => r.match.test(text));
  return found ? found.text : FALLBACK_REPLY;
}

export default function MeagleChatDrawer({ open, onClose }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Salam! Mən Meagle — kurs seçimində sənə necə kömək edə bilərəm?' },
  ]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle'); // idle | typing | thinking
  const [context, setContext] = useState({ profile: null, examResult: null, certificateCount: 0, xp: 0, streak: 0 });
  const listRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, status]);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).maybeSingle(),
      supabase.from('exam_results').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).maybeSingle(),
      supabase.from('certificates').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
    ]).then(([profileRes, examRes, certRes]) => {
      setContext({
        profile: profileRes.data,
        examResult: examRes.data,
        certificateCount: certRes.count || 0,
        xp: profileRes.data?.xp_points || 0,
        streak: profileRes.data?.current_streak || 0,
      });
    });
  }, [user]);

  function handleChange(e) {
    setInput(e.target.value);
    setStatus(e.target.value ? 'typing' : 'idle');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    setStatus('thinking');

    // Anonymous (logged-out) chat has no user_id to rate-limit against —
    // stays unlimited, matching today's already-permissive logged-out
    // behavior rather than newly requiring login just to enforce a cap.
    let limitError = null;
    if (user) {
      try {
        await incrementMeagleUsage();
      } catch (err) {
        limitError = err;
      }
    }

    timeoutRef.current = setTimeout(() => {
      const replyText = limitError
        ? `${limitError.message} 👉 MLUE Pro-ya keçmək üçün profilindəki "MLUE Pro" bölməsinə bax.`
        : getReply(text, context);
      setMessages((m) => [...m, { role: 'bot', text: replyText }]);
      setStatus('idle');
    }, 600 + Math.random() * 300);
  }

  const headerExpression = status === 'thinking' ? 'laptop' : status === 'typing' ? 'question' : 'cheerful';

  return (
    <>
      <div className={`ai-chat-backdrop ${open ? 'open' : ''}`} onClick={onClose} />
      <aside className={`ai-chat-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="ai-chat-header">
          <div className="ai-chat-header-title">
            <MeagleAvatar expression={headerExpression} size={28} />
            Meagle
          </div>
          <button type="button" className="ai-chat-close" onClick={onClose} aria-label="Bağla">
            <X size={16} />
          </button>
        </div>
        <div className="ai-chat-messages" ref={listRef}>
          {messages.map((m, i) => (
            <div key={i} className={m.role === 'user' ? 'ai-msg ai-msg-user' : 'ai-msg ai-msg-bot'}>
              {m.role === 'bot' && <MeagleAvatar expression="neutral" size={22} className="ai-msg-avatar" />}
              <span>{m.text}</span>
            </div>
          ))}
          {status === 'thinking' && (
            <div className="ai-msg ai-msg-bot ai-msg-typing">
              <MeagleAvatar expression="laptop" size={22} className="ai-msg-avatar" />
              <span>yazır...</span>
            </div>
          )}
        </div>
        <form className="ai-chat-input-row" onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={handleChange}
            placeholder="Meagle-a sual ver..."
            aria-label="Mesaj"
          />
          <button type="submit" aria-label="Göndər">
            <Send size={15} />
          </button>
        </form>
      </aside>
    </>
  );
}
