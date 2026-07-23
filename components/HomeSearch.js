'use client';

import { useRouter } from 'next/navigation';

export default function HomeSearch() {
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    router.push('/platforma');
  }

  return (
    <form className="big-search-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Kurs, bacarıq və ya sahə axtar..." />
      <button type="submit" className="btn-primary">Axtar</button>
    </form>
  );
}
