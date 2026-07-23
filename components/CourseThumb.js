import { CATEGORY_ICONS, CATEGORY_GRADIENTS } from './categoryIcons';

/* Abstract, illustrated course-card cover — every course gets a picture,
   Coursera-style, without depending on external image generation. */
export default function CourseThumb({ categoryId, variant = 0 }) {
  const [from, to] = CATEGORY_GRADIENTS[categoryId] || ['#1D4ED8', '#38BDF8'];
  const icon = CATEGORY_ICONS[categoryId];
  const blobX = variant % 2 === 0 ? '78%' : '18%';
  const blobY = variant % 3 === 0 ? '15%' : '80%';

  return (
    <div
      className="course-card-media"
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      aria-hidden="true"
    >
      <div className="course-thumb-dots" />
      <span className="course-thumb-blob" style={{ left: blobX, top: blobY, background: to }} />
      <span className="course-thumb-blob course-thumb-blob-2" style={{ background: from }} />
      <div className="course-thumb-badge">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </svg>
      </div>
    </div>
  );
}
