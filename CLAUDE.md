# MLUE Ecosystem — Persistent Project Instructions

## MANDATORY CHANGELOG AUTOMATION RULE

**MANDATORY CHANGELOG AUTOMATION RULE:**
Every time you (Claude Code) successfully complete a feature implementation, code update, or bug fix for this project, you MUST automatically do the following WITHOUT the user asking:
1. Add a new entry to the `mlue_news` database (or local JSON data file).
2. Translate technical jargon into simple, user-friendly Azerbaijani. (e.g., Instead of "fixed state re-render issue", write "Səhifəni yeniləyəndə XP-nin sıfırlanması xətası tamamilə həll olundu! 🛠️").
3. Accurately assign the correct platform (`MLUE` or `MLUE Studio`) and category (`✨ Yenilik`, `🛠️ Təkmilləşdirmə`, `🐛 Xəta Həlli`, `⚡ Performans`).

### How this is implemented in this repo (confirmed with the user)

There is no live database write access available in this environment. As of the MLUE Studio News panel shipping, `mlue_news` is a real Supabase table (public read, admin-only write) — `lib/news.js`'s `getAllNews()` reads it live, falling back to the git-tracked `data/mlue-news.json` whenever the table is empty or hasn't been migrated yet. Since Claude still has no live DB write access, "add a new entry to the database" means one of two things:
1. Append an object to `data/mlue-news.json` and commit/push (the JSON file remains the safe, always-available fallback and is what Claude should keep using by default — no separate action needed from the user).
2. If you'd rather the entry live in the real table (e.g. you're already in Studio), Claude will hand you a ready-to-run `insert into public.mlue_news (...) values (...)` statement for the Supabase SQL Editor, or you can add it yourself via Studio's "Xəbərlər" admin panel.

**Entry shape** (see `data/mlue-news.json` for the live examples):
```json
{
  "id": "kebab-case-slug-unique-per-entry",
  "title": "Short, friendly Azerbaijani headline (with an emoji, matching the category)",
  "description": "One or two friendly sentences explaining what changed and why it helps the reader — never mention file names, function names, or technical mechanisms.",
  "platform": "MLUE" | "MLUE Studio" | "Hamısı",
  "category": "Yenilik" | "Təkmilləşdirmə" | "Xəta Həlli" | "Performans",
  "created_at": "ISO 8601 timestamp, e.g. new Date().toISOString()"
}
```

- `platform`: `"MLUE"` for main-site-only changes, `"MLUE Studio"` for CMS-only changes, `"Hamısı"` when both are affected (e.g. a shared-database change).
- `category`: pick by what the change means to a student/admin, not how it was implemented — a performance refactor that a user would only ever notice as "feels faster" is `Performans`; a fix for something that was visibly broken is `Xəta Həlli`; net-new capability is `Yenilik`; a quality-of-life improvement to something that already worked is `Təkmilləşdirmə`.
- Do **not** log internal-only work invisible to any user (dependency bumps, refactors with no behavior change, edits to this file itself).
- New entries should end up sorted newest-first — either prepend, or rely on `lib/news.js`'s `getAllNews()`, which sorts by `created_at` descending regardless of insertion order.

This same rule applies to work done in the sibling `mlue-studio` repo — see that repo's `CLAUDE.md`, which points back here.
