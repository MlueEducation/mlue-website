'use client';

import { useEffect, useRef } from 'react';
import { Bold, Italic, List, Link2 } from 'lucide-react';

const ALLOWED_TAGS = new Set(['B', 'I', 'STRONG', 'EM', 'UL', 'LI', 'A', 'BR']);

/* Strips everything except a tiny allowlist of tags before the HTML is ever
   stored — this content is instructor-authored (not admin-authored) and
   round-trips into the public-facing lesson description, so innerHTML is
   never trusted verbatim. No sanitizer dependency needed given how small the
   allowed-tag surface is. */
function sanitizeHtml(html) {
  const container = document.createElement('div');
  container.innerHTML = html;

  function clean(node) {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) return;
      if (child.nodeType !== Node.ELEMENT_NODE || !ALLOWED_TAGS.has(child.tagName)) {
        const text = document.createTextNode(child.textContent || '');
        node.replaceChild(text, child);
        return;
      }
      if (child.tagName === 'A') {
        const href = child.getAttribute('href') || '';
        Array.from(child.attributes).forEach((attr) => child.removeAttribute(attr.name));
        if (href) child.setAttribute('href', href);
        child.setAttribute('target', '_blank');
        child.setAttribute('rel', 'noopener noreferrer');
      } else {
        Array.from(child.attributes).forEach((attr) => child.removeAttribute(attr.name));
      }
      clean(child);
    });
  }
  clean(container);
  return container.innerHTML;
}

function ToolbarButton({ onClick, icon: Icon, label }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={label}
      className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)] transition-colors"
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}

export default function RichTextEditor({ value, onChange, placeholder }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== (value || '')) {
      ref.current.innerHTML = value || '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleBlur() {
    if (!ref.current) return;
    const clean = sanitizeHtml(ref.current.innerHTML);
    if (clean !== ref.current.innerHTML) ref.current.innerHTML = clean;
    onChange(clean);
  }

  function exec(command, arg) {
    if (command === 'createLink') {
      const url = window.prompt('Keçid ünvanı (URL):', 'https://');
      if (!url) return;
      document.execCommand(command, false, url);
    } else {
      document.execCommand(command, false, arg);
    }
    if (ref.current) onChange(sanitizeHtml(ref.current.innerHTML));
  }

  return (
    <div className="border border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--bg-surface-2)]">
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-[var(--border)]">
        <ToolbarButton icon={Bold} label="Qalın" onClick={() => exec('bold')} />
        <ToolbarButton icon={Italic} label="Əyik" onClick={() => exec('italic')} />
        <ToolbarButton icon={List} label="Siyahı" onClick={() => exec('insertUnorderedList')} />
        <ToolbarButton icon={Link2} label="Keçid" onClick={() => exec('createLink')} />
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
        data-placeholder={placeholder}
        className="min-h-[120px] px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none [&_ul]:list-disc [&_ul]:pl-5 [&_a]:text-[var(--accent)] [&_a]:underline empty:before:content-[attr(data-placeholder)] empty:before:text-[var(--text-tertiary)]"
      />
    </div>
  );
}
