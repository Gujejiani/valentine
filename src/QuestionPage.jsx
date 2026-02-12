import { useState, useRef, useEffect } from 'react';

const RUN_AWAY_THRESHOLD = 90;
const RUN_AWAY_STEP = 8;
/* No clamp – button can escape outside the box */
const MIN_PCT = -150;
const MAX_PCT = 250;

const STATIC_LEFT = { x: 25, y: 50 };
const STATIC_RIGHT = { x: 75, y: 50 };

const DEFAULT_LEFT = 'კი';
const DEFAULT_RIGHT = 'არა';

export default function QuestionPage({ pageIndex = 0, question, runAwayButton, leftLabel, rightLabel, advanceOnLeft, onYes, onNo, onRunawayYesClick, onRunawayNoClick }) {
  const left = leftLabel ?? DEFAULT_LEFT;
  const right = rightLabel ?? DEFAULT_RIGHT;
  const leftAdvances = advanceOnLeft ? onNo : onYes;
  const rightRunawayClick = advanceOnLeft ? onRunawayYesClick : onRunawayNoClick;
  const containerRef = useRef(null);
  const [runawayPos, setRunawayPos] = useState(runAwayButton === 'yes' ? STATIC_LEFT : STATIC_RIGHT);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const w = rect.width;
      const h = rect.height;

      const btnCenterX = (runawayPos.x / 100) * w;
      const btnCenterY = (runawayPos.y / 100) * h;
      const dist = Math.hypot(mx - btnCenterX, my - btnCenterY);

      if (dist < RUN_AWAY_THRESHOLD) {
        setRunawayPos((prev) => {
          const dx = (prev.x / 100) * w - mx;
          const dy = (prev.y / 100) * h - my;
          const len = Math.hypot(dx, dy) || 1;
          const moveX = (dx / len) * RUN_AWAY_STEP;
          const moveY = (dy / len) * RUN_AWAY_STEP;
          const newX = prev.x + (moveX / w) * 100;
          const newY = prev.y + (moveY / h) * 100;
          return {
            x: Math.min(MAX_PCT, Math.max(MIN_PCT, newX)),
            y: Math.min(MAX_PCT, Math.max(MIN_PCT, newY)),
          };
        });
      }
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [runawayPos.x, runawayPos.y]);

  const yesRunaway = runAwayButton === 'yes';

  const sharedBtnStyle = {
    transform: 'translate(-50%, -50%)',
  };

  return (
    <div className="question-card" style={{ transform: `translateY(${pageIndex % 2 === 1 ? -150 : 0}px)` }}>
      <p className="question-text">{question}</p>
      <div className="buttons-wrap" ref={containerRef}>
        {yesRunaway ? (
          <>
            <button
              type="button"
              className="btn-yes btn-runaway"
              style={{
                ...sharedBtnStyle,
                left: `${runawayPos.x}%`,
                top: `${runawayPos.y}%`,
              }}
              onClick={onRunawayYesClick}
            >
              {left}
            </button>
            <button
              type="button"
              className="btn-no btn-positioned"
              style={{
                ...sharedBtnStyle,
                left: `${STATIC_RIGHT.x}%`,
                top: `${STATIC_RIGHT.y}%`,
              }}
              onClick={onNo}
            >
              {right}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="btn-yes btn-positioned"
              style={{
                ...sharedBtnStyle,
                left: `${STATIC_LEFT.x}%`,
                top: `${STATIC_LEFT.y}%`,
              }}
              onClick={leftAdvances}
            >
              {left}
            </button>
            <button
              type="button"
              className="btn-no btn-runaway"
              style={{
                ...sharedBtnStyle,
                left: `${runawayPos.x}%`,
                top: `${runawayPos.y}%`,
              }}
              onClick={rightRunawayClick}
            >
              {right}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
