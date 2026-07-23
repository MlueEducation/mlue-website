'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { getSiteOrigin } from '@/lib/siteUrl';
import { useTheme } from '@/components/ThemeProvider';
import { Panel, PanelSection, SettingRow, Toggle, Tooltip } from '@/components/ProfileUI';
import GoogleIcon from '@/components/GoogleIcon';
import { Camera, ShieldCheck, Laptop, Smartphone } from 'lucide-react';

const SETTINGS_TABS = [
  { id: 'general', label: 'Ümumi' },
  { id: 'security', label: 'Təhlükəsizlik' },
  { id: 'privacy', label: 'Məxfilik' },
  { id: 'notifications', label: 'Bildirişlər' },
  { id: 'connections', label: 'Bağlantılar' },
];

const LOCK_DAYS = 10;

function daysSince(iso) {
  if (!iso) return Infinity;
  return (Date.now() - new Date(iso).getTime()) / 86400000;
}
function daysRemaining(iso) {
  return Math.max(0, Math.ceil(LOCK_DAYS - daysSince(iso)));
}
const AZ_MONTHS = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'];
function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return `${d.getDate()} ${AZ_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

/* ---------------- Shell ---------------- */
export default function AccountSettings({ user, profile, onSaved }) {
  const [tab, setTab] = useState('general');

  return (
    <div className="space-y-5">
      <div className="inline-flex flex-wrap bg-[var(--bg-surface-2)] rounded-[var(--radius-full)] p-1 gap-1">
        {SETTINGS_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`text-xs font-bold px-4 py-1.5 rounded-[var(--radius-full)] transition-colors ${
              tab === t.id ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'general' && <GeneralTab user={user} profile={profile} onSaved={onSaved} />}
      {tab === 'security' && <SecurityTab user={user} />}
      {tab === 'privacy' && <PrivacyTab user={user} profile={profile} onSaved={onSaved} />}
      {tab === 'notifications' && <NotificationsTab user={user} profile={profile} onSaved={onSaved} />}
      {tab === 'connections' && <ConnectionsTab user={user} />}

      <DangerZone user={user} />
    </div>
  );
}

/* ---------------- Ümumi ---------------- */
function GeneralTab({ user, profile, onSaved }) {
  const { theme, setTheme } = useTheme();
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(profile?.avatar_url || null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setFullName(profile?.full_name || '');
  }, [profile?.full_name]);

  // Reconcile: only start the email lock once the change has actually been
  // confirmed (user.email flips) — not the moment the form is submitted.
  useEffect(() => {
    if (!user?.id || !user?.email || !profile) return;
    if (profile.tracked_email && profile.tracked_email !== user.email) {
      const payload = { id: user.id, tracked_email: user.email, last_email_updated_at: new Date().toISOString() };
      supabase.from('profiles').upsert(payload).then(({ error }) => {
        if (!error) onSaved((p) => ({ ...(p || {}), ...payload }));
      });
    } else if (!profile.tracked_email) {
      const payload = { id: user.id, tracked_email: user.email };
      supabase.from('profiles').upsert(payload).then(({ error }) => {
        if (!error) onSaved((p) => ({ ...(p || {}), ...payload }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, user?.email, profile?.tracked_email]);

  const nameLocked = !!profile?.last_name_updated_at && daysSince(profile.last_name_updated_at) < LOCK_DAYS;
  const emailLocked = !!profile?.last_email_updated_at && daysSince(profile.last_email_updated_at) < LOCK_DAYS;
  const initial = (user?.email || '?').charAt(0).toUpperCase();

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    const payload = { id: user.id, updated_at: new Date().toISOString() };

    if (avatarFile) {
      const path = `${user.id}/${Date.now()}-${avatarFile.name}`;
      const { error: upErr } = await supabase.storage.from('avatars').upload(path, avatarFile, { upsert: true });
      if (upErr) {
        setSaving(false);
        setMessage({ type: 'error', text: 'Şəkil yüklənmədi: ' + upErr.message });
        return;
      }
      const { data: pub } = supabase.storage.from('avatars').getPublicUrl(path);
      payload.avatar_url = pub.publicUrl;
    }

    if (!nameLocked && fullName.trim() !== (profile?.full_name || '')) {
      payload.full_name = fullName.trim();
      payload.last_name_updated_at = new Date().toISOString();
    }

    const { error } = await supabase.from('profiles').upsert(payload);
    if (error) {
      setSaving(false);
      setMessage({ type: 'error', text: 'Yadda saxlanılmadı: ' + error.message });
      return;
    }
    onSaved((p) => ({ ...(p || {}), ...payload }));

    if (!emailLocked && email.trim() && email.trim() !== user.email) {
      const { error: emailErr } = await supabase.auth.updateUser({ email: email.trim() });
      setSaving(false);
      if (emailErr) {
        setMessage({ type: 'error', text: 'Email dəyişdirilmədi: ' + emailErr.message });
        return;
      }
      setMessage({ type: 'success', text: 'Məlumatlar saxlanıldı. Yeni email üçün təsdiq linki göndərildi.' });
      return;
    }

    setSaving(false);
    setMessage({ type: 'success', text: 'Məlumatlar uğurla yadda saxlanıldı.' });
  }

  return (
    <Panel>
      <PanelSection first title="Görünüş" tint>
        <SettingRow label="Tema" desc="İşıqlı və tünd rejim arasında seç">
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
          >
            <option value="light">İşıqlı</option>
            <option value="dark">Tünd</option>
          </select>
        </SettingRow>
      </PanelSection>

      <PanelSection title="Profil şəkli" desc="Digər istifadəçilərin gördüyü profil şəklin">
        <div className="flex items-center gap-4">
          {avatarPreview ? (
            <img src={avatarPreview} alt="" className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-warm)] flex items-center justify-center text-xl font-extrabold text-white flex-shrink-0">
              {initial}
            </div>
          )}
          <div>
            <label className="inline-flex items-center gap-1.5 bg-[var(--bg-surface-2)] hover:bg-[var(--border)] border border-[var(--border)] text-[var(--text-primary)] text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors">
              <Camera className="w-3.5 h-3.5" />
              Şəkli dəyiş
              <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </label>
            <div className="text-xs text-[var(--text-tertiary)] mt-1.5">JPG, PNG. Maksimum 5MB.</div>
          </div>
        </div>
      </PanelSection>

      <PanelSection title="Hesab məlumatları" tint>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-[var(--text-secondary)] mb-1 block">Ad Soyad</label>
            {nameLocked ? (
              <Tooltip text={`${LOCK_DAYS} gündə bir dəfə dəyişdirilə bilər`}>
                <input value={fullName} disabled className="w-full bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-tertiary)] cursor-not-allowed" />
              </Tooltip>
            ) : (
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
              />
            )}
            {nameLocked && (
              <p className="text-xs text-[var(--text-tertiary)] mt-1.5">
                Adınız sonuncu dəfə {formatDate(profile.last_name_updated_at)} tarixində dəyişdirilib. Növbəti dəyişiklik üçün qalan müddət: {daysRemaining(profile.last_name_updated_at)} gün.
              </p>
            )}
          </div>
          <div>
            <label className="text-xs text-[var(--text-secondary)] mb-1 block">Email</label>
            {emailLocked ? (
              <Tooltip text={`${LOCK_DAYS} gündə bir dəfə dəyişdirilə bilər`}>
                <input value={email} disabled className="w-full bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-tertiary)] cursor-not-allowed" />
              </Tooltip>
            ) : (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
              />
            )}
            {emailLocked && (
              <p className="text-xs text-[var(--text-tertiary)] mt-1.5">
                Emailiniz sonuncu dəfə {formatDate(profile.last_email_updated_at)} tarixində dəyişdirilib. Növbəti dəyişiklik üçün qalan müddət: {daysRemaining(profile.last_email_updated_at)} gün.
              </p>
            )}
          </div>
        </div>
        {message && <p className={`text-xs mt-3 ${message.type === 'error' ? 'text-[var(--danger)]' : 'text-[var(--success)]'}`}>{message.text}</p>}
        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-50 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
        >
          {saving ? 'Yadda saxlanılır...' : 'Yadda saxla'}
        </button>
      </PanelSection>
    </Panel>
  );
}

/* ---------------- Təhlükəsizlik ---------------- */
const MOCK_SESSIONS = [
  { device: 'Windows · Chrome', location: 'Bakı, Azərbaycan', lastActive: 'İndi aktiv', current: true, Icon: Laptop },
  { device: 'iPhone · Safari', location: 'Bakı, Azərbaycan', lastActive: '2 saat əvvəl', current: false, Icon: Smartphone },
];

function SecurityTab({ user }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMessage, setPwMessage] = useState(null);

  const [factors, setFactors] = useState([]);
  const [factorsLoading, setFactorsLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [verifyCode, setVerifyCode] = useState('');
  const [mfaMessage, setMfaMessage] = useState(null);
  const [mfaBusy, setMfaBusy] = useState(false);

  const [sessionsMessage, setSessionsMessage] = useState(null);

  useEffect(() => {
    refreshFactors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function refreshFactors() {
    setFactorsLoading(true);
    const { data, error } = await supabase.auth.mfa.listFactors();
    if (!error) setFactors(data?.totp || []);
    setFactorsLoading(false);
  }

  async function handleChangePassword() {
    setPwMessage(null);
    if (newPassword.length < 6) {
      setPwMessage({ type: 'error', text: 'Yeni şifrə ən azı 6 simvol olmalıdır.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwMessage({ type: 'error', text: 'Yeni şifrələr uyğun gəlmir.' });
      return;
    }
    setPwSaving(true);
    const { error: reauthErr } = await supabase.auth.signInWithPassword({ email: user.email, password: currentPassword });
    if (reauthErr) {
      setPwSaving(false);
      setPwMessage({ type: 'error', text: 'Cari şifrə yanlışdır.' });
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPwSaving(false);
    if (error) {
      setPwMessage({ type: 'error', text: 'Şifrə yenilənmədi: ' + error.message });
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPwMessage({ type: 'success', text: 'Şifrən uğurla yeniləndi.' });
  }

  async function handleStartEnroll() {
    setMfaMessage(null);
    setMfaBusy(true);
    const { data, error } = await supabase.auth.mfa.enroll({ factorType: 'totp' });
    setMfaBusy(false);
    if (error) {
      setMfaMessage({ type: 'error', text: '2FA aktivləşdirilmədi: ' + error.message });
      return;
    }
    setQrData({ factorId: data.id, qrCode: data.totp.qr_code, secret: data.totp.secret });
    setEnrolling(true);
  }

  async function handleVerifyEnroll() {
    if (!qrData) return;
    setMfaBusy(true);
    setMfaMessage(null);
    const { data: challenge, error: chErr } = await supabase.auth.mfa.challenge({ factorId: qrData.factorId });
    if (chErr) {
      setMfaBusy(false);
      setMfaMessage({ type: 'error', text: chErr.message });
      return;
    }
    const { error: verErr } = await supabase.auth.mfa.verify({ factorId: qrData.factorId, challengeId: challenge.id, code: verifyCode });
    setMfaBusy(false);
    if (verErr) {
      setMfaMessage({ type: 'error', text: 'Kod yanlışdır, yenidən cəhd et.' });
      return;
    }
    setEnrolling(false);
    setQrData(null);
    setVerifyCode('');
    setMfaMessage({ type: 'success', text: '2FA uğurla aktivləşdirildi.' });
    refreshFactors();
  }

  async function handleUnenroll(factorId) {
    setMfaBusy(true);
    const { error } = await supabase.auth.mfa.unenroll({ factorId });
    setMfaBusy(false);
    if (!error) {
      setMfaMessage({ type: 'success', text: '2FA deaktiv edildi.' });
      refreshFactors();
    }
  }

  async function handleSignOutOthers() {
    setSessionsMessage(null);
    const { error } = await supabase.auth.signOut({ scope: 'others' });
    setSessionsMessage(error ? { type: 'error', text: error.message } : { type: 'success', text: 'Digər bütün seanslar bağlandı.' });
  }

  const verifiedFactor = factors.find((f) => f.status === 'verified');

  return (
    <Panel>
      <PanelSection first title="Şifrəni dəyiş" desc="Hesabının şifrəsini yenilə">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-[var(--text-secondary)] mb-1 block">Cari şifrə</label>
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
          </div>
          <div>
            <label className="text-xs text-[var(--text-secondary)] mb-1 block">Yeni şifrə</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
          </div>
          <div>
            <label className="text-xs text-[var(--text-secondary)] mb-1 block">Yeni şifrəni təsdiqlə</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
          </div>
        </div>
        {pwMessage && <p className={`text-xs mt-3 ${pwMessage.type === 'error' ? 'text-[var(--danger)]' : 'text-[var(--success)]'}`}>{pwMessage.text}</p>}
        <button
          onClick={handleChangePassword}
          disabled={pwSaving}
          className="mt-4 bg-[var(--bg-surface-2)] border border-[var(--border)] hover:border-[var(--accent)] disabled:opacity-50 text-[var(--text-primary)] text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
        >
          {pwSaving ? 'Yenilənir...' : 'Şifrəni yenilə'}
        </button>
      </PanelSection>

      <PanelSection title="İki mərhələli doğrulama (2FA)" desc="Hesabına əlavə təhlükəsizlik qatı əlavə et">
        {factorsLoading ? (
          <p className="text-sm text-[var(--text-tertiary)]">Yüklənir...</p>
        ) : verifiedFactor ? (
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--success)]">
              <ShieldCheck className="w-4 h-4" /> 2FA aktivdir
            </div>
            <button onClick={() => handleUnenroll(verifiedFactor.id)} disabled={mfaBusy} className="text-xs font-bold text-[var(--danger)] hover:opacity-80 disabled:opacity-50">
              Deaktiv et
            </button>
          </div>
        ) : enrolling && qrData ? (
          <div className="space-y-3">
            <img src={qrData.qrCode} alt="2FA QR kodu" className="w-40 h-40 rounded-lg border border-[var(--border)] bg-white p-2" />
            <p className="text-xs text-[var(--text-tertiary)]">
              QR-u autentifikasiya tətbiqinlə (Google Authenticator və s.) skan et, ya da kodu əl ilə daxil et: <code className="text-[var(--text-secondary)]">{qrData.secret}</code>
            </p>
            <div className="flex gap-2 items-center flex-wrap">
              <input
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                placeholder="6 rəqəmli kod"
                className="w-40 bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
              />
              <button onClick={handleVerifyEnroll} disabled={mfaBusy || verifyCode.length < 6} className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-50 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors">
                Təsdiqlə
              </button>
              <button
                onClick={() => {
                  setEnrolling(false);
                  setQrData(null);
                }}
                className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                Ləğv et
              </button>
            </div>
          </div>
        ) : (
          <button onClick={handleStartEnroll} disabled={mfaBusy} className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-50 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors">
            2FA-nı aktivləşdir
          </button>
        )}
        {mfaMessage && <p className={`text-xs mt-3 ${mfaMessage.type === 'error' ? 'text-[var(--danger)]' : 'text-[var(--success)]'}`}>{mfaMessage.text}</p>}
      </PanelSection>

      <PanelSection title="Aktiv Seanslar" desc="Hesabına daxil olunan cihazlar">
        <div className="space-y-2 mb-4">
          {MOCK_SESSIONS.map((s, i) => (
            <div key={i} className="flex items-center justify-between bg-[var(--bg-surface-2)] rounded-xl p-3.5">
              <div className="flex items-center gap-3">
                <s.Icon className="w-4 h-4 text-[var(--text-tertiary)] flex-shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">{s.device}</div>
                  <div className="text-xs text-[var(--text-tertiary)]">{s.location} · {s.lastActive}</div>
                </div>
              </div>
              {s.current && <span className="text-[10px] font-bold uppercase text-[var(--success)] bg-[var(--success-soft)] px-2 py-1 rounded-full flex-shrink-0">Bu cihaz</span>}
            </div>
          ))}
        </div>
        <button
          onClick={handleSignOutOthers}
          className="bg-transparent border border-[var(--border-strong)] hover:border-[var(--danger)] hover:text-[var(--danger)] text-[var(--text-primary)] text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
        >
          Bütün digər cihazlardan çıxış et
        </button>
        {sessionsMessage && <p className={`text-xs mt-3 ${sessionsMessage.type === 'error' ? 'text-[var(--danger)]' : 'text-[var(--success)]'}`}>{sessionsMessage.text}</p>}
      </PanelSection>
    </Panel>
  );
}

/* ---------------- Məxfilik / Bildirişlər ---------------- */
function persistField(user, onSaved, field, value) {
  onSaved((p) => ({ ...(p || {}), [field]: value }));
  supabase
    .from('profiles')
    .upsert({ id: user.id, [field]: value, updated_at: new Date().toISOString() })
    .then(({ error }) => {
      if (error) onSaved((p) => ({ ...(p || {}), [field]: !value }));
    });
}

function PrivacyTab({ user, profile, onSaved }) {
  return (
    <Panel>
      <PanelSection first title="Məxfilik" desc="Profilinin digər istifadəçilərə görünürlüyünü idarə et">
        <div className="divide-y divide-[var(--border)]">
          <Toggle
            label="İctimai profilimi hər kəs görə bilsin"
            desc="Bacarıqların, təhsilin və layihələrin digər istifadəçilərə açıq olsun"
            checked={profile?.show_public_profile !== false}
            onChange={(val) => persistField(user, onSaved, 'show_public_profile', val)}
          />
          <Toggle
            label="Sertifikatlarımı profilimdə göstər"
            desc="Qazandığın sertifikatlar ictimai profilində görünsün"
            checked={profile?.show_certificates !== false}
            onChange={(val) => persistField(user, onSaved, 'show_certificates', val)}
          />
        </div>
      </PanelSection>
    </Panel>
  );
}

function NotificationsTab({ user, profile, onSaved }) {
  return (
    <Panel>
      <PanelSection first title="Bildirişlər" desc="Hansı kanallardan xəbərdarlıq almaq istədiyini seç">
        <div className="divide-y divide-[var(--border)]">
          <Toggle
            label="Email bildirişləri"
            desc="Kurs yenilikləri və hesab bildirişləri email ilə göndərilsin"
            checked={profile?.email_notifications !== false}
            onChange={(val) => persistField(user, onSaved, 'email_notifications', val)}
          />
          <Toggle
            label="Push bildirişləri"
            desc="Brauzer bildirişləri vasitəsilə anında xəbərdar ol"
            checked={!!profile?.push_notifications}
            onChange={(val) => persistField(user, onSaved, 'push_notifications', val)}
          />
        </div>
      </PanelSection>
    </Panel>
  );
}

/* ---------------- Bağlantılar ---------------- */
function AppleGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--text-primary)]">
      <path d="M16.365 1.43c0 1.14-.463 2.11-1.24 2.87-.79.78-2.05 1.38-3.09 1.3-.14-1.1.4-2.25 1.18-2.99.79-.76 2.13-1.32 3.15-1.18ZM20.1 17.32c-.5 1.15-.74 1.66-1.38 2.68-.9 1.42-2.16 3.2-3.73 3.21-1.39.02-1.75-.9-3.64-.89-1.89.01-2.29.91-3.68.89-1.57-.02-2.76-1.6-3.66-3.02C1.5 16.6.9 12.03 2.83 9.05c1.05-1.62 2.79-2.65 4.6-2.68 1.42-.03 2.76.96 3.64.96.87 0 2.5-1.18 4.22-1.01.72.03 2.74.29 4.04 2.19-.1.06-2.4 1.4-2.38 4.19.03 3.33 2.92 4.44 2.95 4.45-.03.09-.46 1.58-1.5 3.17Z" />
    </svg>
  );
}
function LinkedInGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#0A66C2]">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.24 8.25h4.5V23H.24V8.25ZM8.25 8.25h4.32v2.01h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V23h-4.5v-6.36c0-1.52-.03-3.48-2.12-3.48-2.12 0-2.44 1.66-2.44 3.37V23h-4.5V8.25Z" />
    </svg>
  );
}

function ConnectionCard({ icon, label, detail, connected, busy, comingSoon, onConnect, onDisconnect, onComingSoon }) {
  return (
    <div className={`flex items-center justify-between gap-4 bg-[var(--bg-surface-2)] rounded-xl p-4 ${comingSoon ? 'opacity-60' : ''}`}>
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-lg bg-[var(--bg-surface)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">{icon}</div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-[var(--text-primary)]">{label}</div>
          <div className="text-xs text-[var(--text-tertiary)] truncate">{comingSoon ? 'Tezliklə' : connected ? detail : 'Qoşulmayıb'}</div>
        </div>
      </div>
      {comingSoon ? (
        <button onClick={onComingSoon} className="text-xs font-bold px-4 py-2 rounded-lg bg-[var(--border)] text-[var(--text-tertiary)] flex-shrink-0">
          Tezliklə
        </button>
      ) : connected ? (
        <button
          onClick={onDisconnect}
          disabled={busy}
          className="text-xs font-bold px-4 py-2 rounded-lg bg-transparent border border-[var(--border-strong)] hover:border-[var(--danger)] hover:text-[var(--danger)] text-[var(--text-primary)] disabled:opacity-50 flex-shrink-0 transition-colors"
        >
          Bağlantını kəs
        </button>
      ) : (
        <button
          onClick={onConnect}
          disabled={busy}
          className="text-xs font-bold px-4 py-2 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white disabled:opacity-50 flex-shrink-0 transition-colors"
        >
          Bağla
        </button>
      )}
    </div>
  );
}

function ConnectionsTab({ user }) {
  const [identities, setIdentities] = useState(user?.identities || []);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);
  const [note, setNote] = useState(false);

  useEffect(() => {
    refreshIdentities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function refreshIdentities() {
    const { data } = await supabase.auth.getUser();
    if (data?.user) setIdentities(data.user.identities || []);
  }

  const googleIdentity = identities.find((i) => i.provider === 'google');

  async function handleConnectGoogle() {
    setBusy(true);
    setMessage(null);
    const { error } = await supabase.auth.linkIdentity({ provider: 'google', options: { redirectTo: `${getSiteOrigin()}/profil` } });
    setBusy(false);
    if (error) setMessage({ type: 'error', text: error.message });
  }

  async function handleDisconnectGoogle() {
    setBusy(true);
    setMessage(null);
    const { error } = await supabase.auth.unlinkIdentity(googleIdentity);
    setBusy(false);
    if (error) {
      setMessage({ type: 'error', text: error.message });
      return;
    }
    setMessage({ type: 'success', text: 'Google bağlantısı kəsildi.' });
    refreshIdentities();
  }

  return (
    <Panel>
      <PanelSection first title="Qoşulmuş hesablar" desc="Sosial hesablarınla giriş imkanlarını idarə et">
        <div className="space-y-3">
          <ConnectionCard
            icon={<GoogleIcon />}
            label="Google"
            detail={googleIdentity?.identity_data?.email || 'Qoşulub'}
            connected={!!googleIdentity}
            busy={busy}
            onConnect={handleConnectGoogle}
            onDisconnect={handleDisconnectGoogle}
          />
          <ConnectionCard icon={<AppleGlyph />} label="Apple" comingSoon onComingSoon={() => setNote(true)} />
          <ConnectionCard icon={<LinkedInGlyph />} label="LinkedIn" comingSoon onComingSoon={() => setNote(true)} />
        </div>
        {note && <p className="text-xs text-[var(--text-tertiary)] mt-3">Bu inteqrasiya tezliklə əlavə olunacaq.</p>}
        {message && <p className={`text-xs mt-3 ${message.type === 'error' ? 'text-[var(--danger)]' : 'text-[var(--success)]'}`}>{message.text}</p>}
      </PanelSection>
    </Panel>
  );
}

/* ---------------- Təhlükəli zona ---------------- */
function DangerZone({ user }) {
  const [deactivating, setDeactivating] = useState(false);
  const [deactivateMessage, setDeactivateMessage] = useState(null);
  const [confirmText, setConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

  async function handleDeactivate() {
    setDeactivating(true);
    setDeactivateMessage(null);
    const { error } = await supabase.from('profiles').upsert({ id: user.id, deactivated_at: new Date().toISOString() });
    if (error) {
      setDeactivating(false);
      setDeactivateMessage({ type: 'error', text: error.message });
      return;
    }
    await supabase.auth.signOut();
  }

  async function handleDelete() {
    if (confirmText.trim() !== 'SİL') return;
    setDeleting(true);
    setDeleteMessage(null);
    const { error } = await supabase.from('profiles').upsert({ id: user.id, deletion_requested_at: new Date().toISOString() });
    if (error) {
      setDeleting(false);
      setDeleteMessage({ type: 'error', text: error.message });
      return;
    }
    await supabase.auth.signOut();
  }

  return (
    <div className="rounded-2xl border border-[var(--danger-30)] bg-[var(--danger-10)] p-6">
      <div className="text-sm font-bold text-[var(--danger)] mb-1">Təhlükəli zona</div>
      <div className="text-sm text-[var(--text-secondary)] mb-5">Bu bölmədəki addımlar hesabına ciddi təsir edir. Diqqətlə davam et.</div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 border-t border-[var(--danger-30)]">
        <div>
          <div className="text-sm font-semibold text-[var(--text-primary)]">Hesabı müvəqqəti dondur</div>
          <div className="text-xs text-[var(--text-secondary)] mt-0.5">Hesabın gizlədilir, istənilən vaxt yenidən daxil olub aktivləşdirə bilərsən.</div>
        </div>
        <button
          onClick={handleDeactivate}
          disabled={deactivating}
          className="flex-shrink-0 bg-transparent border border-[var(--danger-50)] text-[var(--danger)] hover:bg-[var(--danger-10)] disabled:opacity-50 text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
        >
          {deactivating ? 'Dondurulur...' : 'Hesabı müvəqqəti dondur'}
        </button>
      </div>
      {deactivateMessage && <p className="text-xs text-[var(--danger)] mb-2">{deactivateMessage.text}</p>}

      <div className="pt-4 border-t border-[var(--danger-30)]">
        <div className="text-sm font-semibold text-[var(--text-primary)]">Hesabı həmişəlik sil</div>
        <div className="text-xs text-[var(--text-secondary)] mt-0.5 mb-3">
          Bütün məlumatların silinmə üçün qeydə alınır. Bu addım geri qaytarıla bilməz. Təsdiqləmək üçün aşağıya <b>SİL</b> yaz.
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="SİL"
            className="w-full sm:w-40 bg-[var(--bg-surface)] border border-[var(--danger-30)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--danger)]"
          />
          <button
            onClick={handleDelete}
            disabled={confirmText.trim() !== 'SİL' || deleting}
            className="flex-shrink-0 bg-[var(--danger)] hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
          >
            {deleting ? 'Göndərilir...' : 'Hesabı həmişəlik sil'}
          </button>
        </div>
        {deleteMessage && <p className="text-xs text-[var(--danger)] mt-2">{deleteMessage.text}</p>}
      </div>
    </div>
  );
}
