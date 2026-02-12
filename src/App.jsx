import { useState, useEffect } from 'react';
import './App.css';
import QuestionPage from './QuestionPage';

const QUESTIONS = [
  { text: 'იქნები ჩემი ბატატუნა?', runAway: 'yes' },
  { text: 'იქნები ჩემი კნეინა?', runAway: 'yes' },
  { text: 'იქნები ჩემი დედოფალი?', runAway: 'yes' },
  { text: 'იქნები ჩემი ვალენტინი?', runAway: 'no' },
];

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function App() {
  const [page, setPage] = useState(0);
  const [habsulaAttacking, setHabsulaAttacking] = useState(false);
  const [angryHasbulla, setAngryHasbulla] = useState(false);
  const [mobileOverlay, setMobileOverlay] = useState(false);
  const [agreementAccepted, setAgreementAccepted] = useState(false);

  useEffect(() => {
    if (isMobileDevice()) setMobileOverlay(true);
  }, []);

  const onNo = () => {
    if (page < QUESTIONS.length - 1) setPage((p) => p + 1);
  };

  const onYes = () => {
    if (page === QUESTIONS.length - 1) setPage('success');
  };

  const onRunawayYesClick = () => {
    setHabsulaAttacking(true);
  };

  const onRunawayNoClick = () => {
    setAngryHasbulla(true);
  };

  const showMain = !mobileOverlay && agreementAccepted;

  return (
    <div className="app">
      {!mobileOverlay && !agreementAccepted && (
        <div className="agreement-overlay" role="dialog" aria-modal="true" aria-labelledby="agreement-title">
          <div className="agreement-modal">
            <h2 id="agreement-title" className="agreement-greeting">ჰეი ნინუცი, მზად ხარ რომ უპასუხო კითხვებს პატიოსნად?</h2>
            <div className="agreement-text">
              <p>ამ გვერდის გახსნით და ქვემოთ მოცემული „ვეთანხმები“-ს დაჭერით შენ ადასტურებ, რომ მზად ხარ ყოველ კითხვაზე პატიოსნად და გულიდან უპასუხო — ყოველგვარი ზედმეტი ხუმრობის ან „მერე ვიფიქრებ“-ის გარეშე. ჩვენ ვიცით, რომ პატიოსნად უპასუხებ და სწორედ ამიტომ ყოველი შენი არჩევანი აქ მნიშვნელოვანია.</p>
              <p>ეს არის განსაკუთრებული გამოცდა: არც ფურცელია, არც ქულები, მაგრამ შენი პასუხები იგივე სერიოზულობით უნდა მიუძღვნა. რასაც აირჩევ — კი თუ არა — ის იქნება და ამისთვის მხოლოდ შენ ხელს აწ.</p>
              <p className="agreement-final">შენს გამოცდებზე ნაკლები გამოცდა არ გეგონოს.</p>
            </div>
            <button type="button" className="agreement-accept" onClick={() => setAgreementAccepted(true)}>
              ვეთანხმები, მზად ვარ
            </button>
          </div>
        </div>
      )}


      {showMain && (
      <div className="hearts-bg" aria-hidden="true">
        <span>♥</span>
        <span>♥</span>
        <span>♥</span>
        <span>♥</span>
        <span>♥</span>
        <span>♥</span>
        <span>♥</span>
      </div>
      )}

      {showMain && habsulaAttacking && (
        <div className="habsula-overlay" role="alert">
          <div className="habsula-attack">
            <p className="habsula-title">Angry Habsula</p>
            <img src="/angry_hansula.jpeg" alt="Angry Habsula" className="habsula-face" />
            <p className="habsula-message">Wrong button! Click No!!</p>
            <button type="button" className="habsula-dismiss" onClick={() => setHabsulaAttacking(false)}>
              OK, OK!
            </button>
          </div>
        </div>
      )}

      {showMain && angryHasbulla && (
        <div className="habsula-overlay" role="alert">
          <div className="habsula-attack">
            <p className="habsula-title">Still No?!</p>
            <img
              src="https://media.tenor.com/pAopdLQCRaMAAAAM/honeycardi-hasbulla.gif"
              alt="Angry Hasbulla"
              className="habsula-face habsula-gif"
            />
            <p className="habsula-message">Say Yes already!</p>
            <button type="button" className="habsula-dismiss" onClick={() => setAngryHasbulla(false)}>
              OK, OK!
            </button>
          </div>
        </div>
      )}

      {mobileOverlay && (
        <div className="habsula-overlay mobile-overlay" role="alert">
          <div className="habsula-attack">
            <p className="habsula-title">I said no mobile? 😤😠🤬</p>
            <img
              src="https://media.tenor.com/742UgPZXYc8AAAAM/dead-hasbulla.gif"
              alt="Angry Hasbulla"
              className="habsula-face habsula-gif"
            />
            <p className="habsula-message">Use a desktop or laptop!</p>
          </div>
        </div>
      )}

      {showMain && page === 'success' ? (
        <div className="success-page">
          <div className="success-card">
            <h1 className="success-title">You said yes!</h1>
            <p className="success-sub">Happy Valentine's, my valentine ♥</p>
            <img
              src="https://media.tenor.com/Bt4FpXC_5xAAAAAM/hasbullaedit-hasbulla.gif"
              alt="Hasbulla"
              className="success-hasbulla-gif"
            />
            <div className="success-heart">♥</div>
          </div>
        </div>
      ) : showMain ? (
        <QuestionPage
          key={page}
          question={QUESTIONS[page].text}
          runAwayButton={QUESTIONS[page].runAway}
          onYes={onYes}
          onNo={onNo}
          onRunawayYesClick={QUESTIONS[page].runAway === 'yes' ? onRunawayYesClick : undefined}
          onRunawayNoClick={page === QUESTIONS.length - 1 ? onRunawayNoClick : undefined}
        />
      ) : null}
    </div>
  );
}

export default App;
