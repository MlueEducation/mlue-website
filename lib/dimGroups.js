// Real DİM (Dövlət İmtahan Mərkəzi) bakalavriat ixtisas qrupları və fənləri.
// Bütün qruplarda ortaq buraxılış fənləri: Azərbaycan dili, Riyaziyyat, Xarici dil.
// I və III qruplarda əlavə olaraq altqruplar var (fərqli qəbul fənləri ilə).
export const COMMON_SUBJECTS = ['Azərbaycan dili', 'Riyaziyyat', 'Xarici dil'];

export const DIM_GROUPS = [
  {
    id: 'I',
    desc: 'Mühəndislik, texnika, IT və təbiət elmləri üçün',
    subgroups: [
      { name: 'Riyaziyyat-kimya (RK)', subjects: ['Riyaziyyat', 'Fizika', 'Kimya'] },
      { name: 'Riyaziyyat-informatika (Rİ)', subjects: ['Riyaziyyat', 'Fizika', 'İnformatika'] },
    ],
  },
  {
    id: 'II',
    desc: 'İqtisadiyyat, maliyyə, menecment, turizm üçün',
    subjects: ['Riyaziyyat', 'Coğrafiya', 'Tarix'],
  },
  {
    id: 'III',
    desc: 'Hüquq, jurnalistika, dilçilik, pedaqoji ixtisaslar üçün',
    subgroups: [
      { name: 'Dil-tarix (DT)', subjects: ['Tarix', 'Az. dili və ədəbiyyatı', 'Ədəbiyyat'] },
      { name: 'Tarix-coğrafiya (TC)', subjects: ['Tarix', 'Az. dili və ədəbiyyatı', 'Coğrafiya'] },
    ],
  },
  {
    id: 'IV',
    desc: 'Tibb, əczaçılıq, biologiya, kənd təsərrüfatı üçün',
    subjects: ['Biologiya', 'Kimya', 'Fizika'],
  },
  {
    id: 'V',
    desc: 'İncəsənət, musiqi, dizayn, idman ixtisasları üçün',
    subjects: ['Əsas fənn (ixtisasa görə)', 'Qabiliyyət imtahanı'],
  },
];

// Buraxılış (graduation) fənləri hər qrupda eynidir və hər zaman 100 balla
// qiymətləndirilir. Qəbul (admission) fənlərinin maksimum balı isə qrupdan
// və fənndən asılı olaraq fərqlənir (bəzi fənlər 150 balla qiymətləndirilir).
export const GRADUATION_MAX = 100;

export const ADMISSION_MAX = {
  I: { 'Riyaziyyat': 150, 'Fizika': 150, 'Kimya': 100, 'İnformatika': 100 },
  II: { 'Riyaziyyat': 150, 'Coğrafiya': 150, 'Tarix': 100 },
  III: { 'Az. dili və ədəbiyyatı': 150, 'Tarix': 150, 'Ədəbiyyat': 100, 'Coğrafiya': 100 },
  IV: { 'Biologiya': 150, 'Kimya': 150, 'Fizika': 100 },
  V: {},
};

const DEFAULT_ADMISSION_MAX = 100;

export function getAdmissionMax(groupId, subject) {
  return ADMISSION_MAX[groupId]?.[subject] ?? DEFAULT_ADMISSION_MAX;
}
