'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/ProfileUI';
import { fetchOpenPostings, fetchCompaniesByIds, fetchMyApplications, applyToPosting, submitForReview } from '@/lib/internships';
import { formatDateDMY as formatDate } from '@/lib/formatDate';

const TABS = [
  { id: 'active', label: 'Aktiv tapşırıqlar' },
  { id: 'history', label: 'Tarixçə' },
];

export default function InternshipsPanel({ user }) {
  const [tab, setTab] = useState('active');
  const [postings, setPostings] = useState([]);
  const [companyMap, setCompanyMap] = useState(new Map());
  const [applications, setApplications] = useState([]); // real internship_applications rows
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [errorId, setErrorId] = useState(null);

  useEffect(() => {
    Promise.all([fetchOpenPostings(), fetchMyApplications(user.id)])
      .then(async ([postingRows, applicationRows]) => {
        setPostings(postingRows);
        setApplications(applicationRows);
        setCompanyMap(await fetchCompaniesByIds(postingRows.map((p) => p.company_id)));
      })
      .finally(() => setLoading(false));
  }, [user.id]);

  const applicationByPostingId = new Map(applications.map((a) => [a.posting_id, a]));

  async function handleApply(posting) {
    setBusyId(posting.id);
    setErrorId(null);
    try {
      await applyToPosting(user.id, posting.id);
      setApplications((prev) => [{ user_id: user.id, posting_id: posting.id, status: 'applied', applied_at: new Date().toISOString() }, ...prev]);
    } catch (err) {
      console.error('applyToPosting failed:', err);
      setErrorId(posting.id);
    } finally {
      setBusyId(null);
    }
  }

  async function handleSubmitForReview(posting) {
    setBusyId(posting.id);
    setErrorId(null);
    try {
      const result = await submitForReview(user.id, posting.id);
      if (result) {
        setApplications((prev) => prev.map((a) => (a.posting_id === posting.id ? { ...a, ...result } : a)));
      }
    } catch (err) {
      console.error('submitForReview failed:', err);
      setErrorId(posting.id);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <PageHeader sub="Şirkətlərin yerləşdirdiyi kiçik layihələrlə real təcrübə qazan">Mikro-Təcrübələr</PageHeader>

      <div className="inline-flex bg-[var(--bg-surface-2)] rounded-[var(--radius-full)] p-1 mb-5">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`text-xs font-bold px-4 py-1.5 rounded-[var(--radius-full)] transition-colors whitespace-nowrap ${
              tab === t.id ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-[var(--text-secondary)]">Yüklənir...</p>
      ) : tab === 'active' ? (
        postings.length === 0 ? (
          <p className="text-sm text-[var(--text-secondary)]">Hazırda açıq mikro-təcrübə elanı yoxdur.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {postings.map((job) => {
              const company = companyMap.get(job.company_id);
              const application = applicationByPostingId.get(job.id);
              const status = application?.status; // undefined | 'applied' | 'completed'
              return (
                <div key={job.id} className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-sm p-5">
                  <div className="flex items-center gap-3 mb-3">
                    {company?.logo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={company.logo_url} alt="" className="w-9 h-9 rounded-lg object-contain bg-white border border-[var(--border)] flex-shrink-0" />
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-[var(--bg-surface-2)] border border-[var(--border)] flex items-center justify-center flex-shrink-0 text-sm font-extrabold text-[var(--text-primary)]">
                        {(company?.name || '?').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-[var(--text-primary)] truncate">{job.title}</div>
                      <div className="text-xs text-[var(--text-tertiary)] truncate">{company?.name || 'Şirkət'}</div>
                    </div>
                  </div>
                  {job.description && <p className="text-xs text-[var(--text-secondary)] mb-3 leading-relaxed">{job.description}</p>}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {(job.skills || []).map((s) => (
                      <span key={s} className="text-[10px] bg-[var(--bg-surface-2)] text-[var(--text-secondary)] px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)] mb-4">
                    <span>{job.duration}</span>
                    <span className="font-bold text-[var(--accent-warm)]">{job.reward_tokens} MLUE Token</span>
                  </div>
                  {status === 'completed' ? (
                    <button type="button" disabled className="w-full text-sm font-bold px-5 py-2 rounded-lg bg-[var(--bg-surface-2)] text-[var(--text-tertiary)] cursor-not-allowed">
                      Tamamlanıb ✔️
                    </button>
                  ) : status === 'submitted' ? (
                    <button type="button" disabled className="w-full text-sm font-bold px-5 py-2 rounded-lg bg-[var(--bg-surface-2)] text-[var(--text-tertiary)] cursor-not-allowed">
                      Təsdiq gözlənilir ⏳
                    </button>
                  ) : status === 'applied' ? (
                    <button
                      type="button"
                      disabled={busyId === job.id}
                      onClick={() => handleSubmitForReview(job)}
                      className="w-full text-sm font-bold px-5 py-2 rounded-lg bg-[var(--accent-warm)] hover:opacity-90 text-white disabled:opacity-60 transition-opacity"
                    >
                      Tamamladım, göndər
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={busyId === job.id}
                      onClick={() => handleApply(job)}
                      className="w-full text-sm font-bold px-5 py-2 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white disabled:opacity-60 transition-colors"
                    >
                      Müraciət et
                    </button>
                  )}
                  {errorId === job.id && (
                    <p className="text-[11px] text-[var(--danger)] mt-2">Xəta baş verdi, bir az sonra yenidən cəhd et.</p>
                  )}
                </div>
              );
            })}
          </div>
        )
      ) : applications.length === 0 ? (
        <p className="text-sm text-[var(--text-secondary)]">Hələ heç bir mikro-təcrübəyə müraciət etməmisən.</p>
      ) : (
        <div className="space-y-2.5">
          {applications.map((a) => {
            const posting = postings.find((p) => p.id === a.posting_id);
            const company = posting ? companyMap.get(posting.company_id) : null;
            return (
              <div key={a.posting_id} className="flex items-center justify-between gap-3 bg-[var(--bg-surface-2)] rounded-xl p-4">
                <div className="min-w-0">
                  <div className="text-sm font-bold text-[var(--text-primary)] truncate">{posting?.title || `Elan #${a.posting_id}`}</div>
                  <div className="text-xs text-[var(--text-tertiary)]">
                    {company?.name} · {a.status === 'completed' ? `Tamamlandı: ${formatDate(a.completed_at)}` : `Müraciət: ${formatDate(a.applied_at)}`}
                  </div>
                </div>
                <span className={`text-sm font-bold flex-shrink-0 ${a.status === 'completed' ? 'text-[var(--accent-warm)]' : 'text-[var(--text-tertiary)]'}`}>
                  {a.status === 'completed' ? `+${a.tokens_awarded} Token` : a.status === 'submitted' ? 'Təsdiq gözlənilir' : 'Davam edir'}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
