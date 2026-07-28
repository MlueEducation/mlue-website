import MlueNews from '@/components/MlueNews';

export const metadata = { title: 'Xəbərlər — Mlue' };

export default function XeberlerPage() {
  return (
    <section style={{ paddingTop: 48, paddingBottom: 64 }}>
      <div className="container">
        <MlueNews />
      </div>
    </section>
  );
}
