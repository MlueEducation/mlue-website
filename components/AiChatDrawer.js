'use client';

import { useEffect, useRef, useState } from 'react';
import { Bot, X, Send } from 'lucide-react';

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

function getReply(text) {
  const found = CANNED_REPLIES.find((r) => r.match.test(text));
  return found ? found.text : FALLBACK_REPLY;
}

export default function AiChatDrawer({ open, onClose }) {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Salam! Kurs seçimində sənə necə kömək edə bilərəm?' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, typing]);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  function handleSubmit(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    setTyping(true);
    timeoutRef.current = setTimeout(() => {
      setMessages((m) => [...m, { role: 'bot', text: getReply(text) }]);
      setTyping(false);
    }, 600 + Math.random() * 300);
  }

  return (
    <>
      <div className={`ai-chat-backdrop ${open ? 'open' : ''}`} onClick={onClose} />
      <aside className={`ai-chat-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="ai-chat-header">
          <div className="ai-chat-header-title"><Bot size={18} /> MLUE AI Köməkçi</div>
          <button type="button" className="ai-chat-close" onClick={onClose} aria-label="Bağla">
            <X size={16} />
          </button>
        </div>
        <div className="ai-chat-messages" ref={listRef}>
          {messages.map((m, i) => (
            <div key={i} className={m.role === 'user' ? 'ai-msg ai-msg-user' : 'ai-msg ai-msg-bot'}>{m.text}</div>
          ))}
          {typing && <div className="ai-msg ai-msg-bot ai-msg-typing">yazır...</div>}
        </div>
        <form className="ai-chat-input-row" onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Sualını yaz..."
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
