/* Maps known Supabase/Postgres/network error shapes to friendly Azerbaijani
   copy, instead of showing the user a raw driver string like "JWT expired"
   or "duplicate key value violates unique constraint". Already-Azerbaijani,
   app-thrown messages (RPC `raise exception` text, or messages this
   codebase itself constructs, e.g. "artıq tamamlanıb") pass through
   unchanged — this must never mask an intentional message. Anything
   unrecognized falls back to the caller's own fallback text rather than
   the raw message, since an unmapped driver string is rarely fit for
   end users either. */

const AZ_CHAR_PATTERN = /[əöüşçğıİƏÖÜŞÇĞ]/;

const KNOWN_PATTERNS = [
  { test: /invalid login credentials/i, message: 'Email və ya şifrə yanlışdır.' },
  { test: /email not confirmed/i, message: 'Email ünvanını təsdiqləməlisən — poçtunu yoxla.' },
  { test: /user already registered/i, message: 'Bu email artıq qeydiyyatdan keçib.' },
  { test: /password should be at least/i, message: 'Şifrə ən azı 6 simvoldan ibarət olmalıdır.' },
  { test: /jwt expired|invalid jwt|refresh_token_not_found/i, message: 'Sessiyanın vaxtı bitib — yenidən daxil ol.' },
  { test: /failed to fetch|networkerror|network request failed|load failed/i, message: 'Şəbəkə bağlantısı problemi. İnternetini yoxla və yenidən cəhd et.' },
  { test: /rate limit/i, message: 'Həddindən çox cəhd edildi. Bir az sonra yenidən cəhd et.' },
  { test: /duplicate key value violates unique constraint/i, message: 'Bu məlumat artıq mövcuddur.' },
  { test: /permission denied|row-level security/i, message: 'Bu əməliyyat üçün icazən yoxdur.' },
];

export function friendlyErrorMessage(error, fallback = 'Xəta baş verdi. Yenidən cəhd et.') {
  const raw = (error && (error.message || error.error_description || String(error))) || '';
  if (!raw) return fallback;
  if (AZ_CHAR_PATTERN.test(raw)) return raw;
  const match = KNOWN_PATTERNS.find((p) => p.test.test(raw));
  return match ? match.message : fallback;
}
