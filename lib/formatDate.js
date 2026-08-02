/* Manual, locale-independent date formatting. toLocaleDateString('az-AZ',
   {month: 'long'/'short'}) renders as "M10" instead of a real month name
   on this runtime's ICU data (az-AZ month-name data isn't implemented) —
   every formatter here is purely numeric so it never depends on that. */

export function formatDateDMY(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}

export function formatMonthYear(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${month}.${year}`;
}
