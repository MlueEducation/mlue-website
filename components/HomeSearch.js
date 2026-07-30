'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/platforma?q=${encodeURIComponent(q)}#kurslar` : '/platforma#kurslar');
  }

  return (
    <form className="big-search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Kurs, bacarıq və ya sahə axtar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="btn-primary">Axtar</button>
    </form>
  );
}
