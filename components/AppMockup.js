export default function AppMockup() {
  return (
    <div className="mockup-wrap">
      <div className="mockup-frame">
        <div className="mockup-bar">
          <span className="mockup-dot" />
          <span className="mockup-dot" />
          <span className="mockup-dot" />
          <div className="mockup-address" />
        </div>
        <div className="mockup-body">
          <div className="mockup-sidebar">
            <div className="mockup-avatar" />
            <div className="mockup-line" style={{ width: '70%' }} />
            <div className="mockup-line" style={{ width: '50%' }} />
            <div className="mockup-line" style={{ width: '60%' }} />
            <div className="mockup-line" style={{ width: '42%' }} />
          </div>
          <div className="mockup-main">
            <div className="mockup-player">
              <div className="mockup-play">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7Z" /></svg>
              </div>
              <div className="mockup-progress"><span /></div>
            </div>
            <div className="mockup-line" style={{ width: '85%' }} />
            <div className="mockup-line" style={{ width: '64%' }} />
          </div>
        </div>
      </div>
      <div className="mockup-float mockup-float-1">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        <span>Kurs tamamlandı</span>
      </div>
      <div className="mockup-float mockup-float-2">
        <span className="mockup-float-num">92%</span>
        <span>irəliləyiş</span>
      </div>
    </div>
  );
}
