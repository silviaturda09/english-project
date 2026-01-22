// ========== QUIZ.JS - COD REACT CARE FUNCȚIONEAZĂ ÎN BROWSER ==========

const { useState } = React;

function IllinoisQuiz() {
  // VARIABILE DE STARE (STATE VARIABLES)
  // useState = hook care ne permite să stocăm și să modificăm date
  
  const [currentQuestion, setCurrentQuestion] = useState(0); // Întrebarea curentă (începem de la 0)
  const [score, setScore] = useState(0); // Scorul utilizatorului
  const [showScore, setShowScore] = useState(false); // Arată ecranul final sau nu?
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Ce răspuns a selectat userul
  const [isAnswered, setIsAnswered] = useState(false); // A răspuns deja la întrebare?

  // ARRAY CU ÎNTREBĂRI
  // Fiecare întrebare are: question (întrebarea), answers (array cu 4 răspunsuri), correct (indexul răspunsului corect)
  const questions = [
    {
      question: "Which famous sculpture is located in Millennium Park, Chicago?",
      answers: ["The Bean (Cloud Gate)", "The Statue of Liberty", "The Thinker", "Mount Rushmore"],
      correct: 0 // răspunsul corect e primul (index 0)
    },
    {
      question: "What is the state flower of Illinois?",
      answers: ["Rose", "Violet", "Sunflower", "Tulip"],
      correct: 1 // Violet
    },
    {
      question: "Which city is known as the 'Windy City'?",
      answers: ["Springfield", "Aurora", "Chicago", "Naperville"],
      correct: 2 // Chicago
    },
    {
      question: "Who was the 16th President of the United States, from Illinois?",
      answers: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "Barack Obama"],
      correct: 2 // Abraham Lincoln
    },
    {
      question: "What is the state bird of Illinois?",
      answers: ["Eagle", "Cardinal", "Robin", "Blue Jay"],
      correct: 1 // Cardinal
    },
    {
      question: "Where is Abraham Lincoln buried?",
      answers: ["Chicago", "Springfield", "Peoria", "Washington D.C."],
      correct: 1 // Springfield - Lincoln's Tomb
    },
    {
      question: "Which classic Christmas movie is set in a Chicago suburb?",
      answers: ["Elf", "Home Alone", "The Polar Express", "A Christmas Story"],
      correct: 1 // Home Alone
    },
    {
      question: "What is Illinois' official state nickname?",
      answers: ["The Prairie State", "The Sunshine State", "The Golden State", "The Empire State"],
      correct: 0 // The Prairie State
    }
  ];

  // FUNCȚIE PENTRU A VERIFICA RĂSPUNSUL
  // Această funcție se execută când user-ul face click pe un răspuns
  const handleAnswerClick = (answerIndex) => {
    // Dacă user-ul a răspuns deja, nu face nimic (previne modificarea răspunsului)
    if (isAnswered) return;
    
    // Salvează ce răspuns a fost selectat
    setSelectedAnswer(answerIndex);
    // Marchează că s-a răspuns la întrebare
    setIsAnswered(true);

    // VERIFICĂ DACĂ RĂSPUNSUL E CORECT
    // Compară indexul răspunsului selectat cu indexul răspunsului corect
    if (answerIndex === questions[currentQuestion].correct) {
      // Dacă e corect, crește scorul cu 1
      setScore(score + 1);
    }
  };

  // FUNCȚIE PENTRU URMĂTOAREA ÎNTREBARE
  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1; // Calculează numărul următoarei întrebări
    
    // Verifică dacă mai sunt întrebări
    if (nextQuestion < questions.length) {
      // Dacă da, treci la următoarea întrebare
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null); // Resetează răspunsul selectat
      setIsAnswered(false); // Resetează starea
    } else {
      // Dacă nu mai sunt întrebări, arată ecranul final
      setShowScore(true);
    }
  };

  // FUNCȚIE PENTRU RESTART QUIZ
  // Resetează toate valorile la valorile inițiale
  const restartQuiz = () => {
    setCurrentQuestion(0); // Prima întrebare
    setScore(0); // Scor 0
    setShowScore(false); // Nu arăta ecranul final
    setSelectedAnswer(null); // Niciun răspuns selectat
    setIsAnswered(false); // Nu s-a răspuns
  };

  // CALCULEAZĂ PROCENTUL PENTRU A AFIȘA EMOJI-URI DIFERITE
  const scorePercentage = (score / questions.length) * 100;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        padding: '40px',
        maxWidth: '700px',
        width: '100%'
      }}>
        {/* HEADER - Titlul quiz-ului */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#1e3a8a', marginBottom: '10px' }}>🏛️ Discover Illinois Quiz</h1>
          <p style={{ color: '#666' }}>Test your knowledge about the Prairie State!</p>
        </div>

        {/* CONDITIONAL RENDERING - Afișează fie scorul final, fie întrebările */}
        {showScore ? (
          // ========== ECRAN FINAL CU SCORUL ==========
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '30px' }}>
              {/* Afișează emoji diferit în funcție de scor */}
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>
                {scorePercentage >= 80 ? '🎉' : scorePercentage >= 50 ? '👍' : '📚'}
              </div>
              <h2 style={{ fontSize: '2rem', color: '#1e3a8a', marginBottom: '10px' }}>Quiz Complete!</h2>
              <p style={{ fontSize: '1.2rem', color: '#333' }}>
                You scored <span style={{ fontWeight: 'bold', color: '#3b82f6' }}>{score}</span> out of{' '}
                <span style={{ fontWeight: 'bold' }}>{questions.length}</span>
              </p>
              
              {/* PROGRESS BAR pentru scor */}
              <div style={{ marginTop: '20px' }}>
                <div style={{ backgroundColor: '#e5e7eb', borderRadius: '10px', height: '16px', overflow: 'hidden' }}>
                  {/* Bara albastră care arată procentul */}
                  <div 
                    style={{
                      backgroundColor: '#3b82f6',
                      height: '100%',
                      borderRadius: '10px',
                      width: `${scorePercentage}%`,
                      transition: 'width 0.5s'
                    }}
                  ></div>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>
                  {scorePercentage.toFixed(0)}% correct
                </p>
              </div>
            </div>
            
            {/* BUTON PENTRU RESTART */}
            <button
              onClick={restartQuiz}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                fontWeight: 'bold',
                padding: '15px 40px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s'
              }}
            >
              🔄 Try Again
            </button>
          </div>
        ) : (
          // ========== ÎNTREBĂRI ==========
          <div>
            {/* PROGRESS BAR - Arată la ce întrebare suntem */}
            <div style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>
                <span>Question {currentQuestion + 1}/{questions.length}</span>
                <span>Score: {score}</span>
              </div>
              {/* Bara de progres */}
              <div style={{ backgroundColor: '#e5e7eb', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
                <div 
                  style={{
                    backgroundColor: '#3b82f6',
                    height: '100%',
                    borderRadius: '10px',
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                    transition: 'width 0.3s'
                  }}
                ></div>
              </div>
            </div>

            {/* ÎNTREBAREA CURENTĂ */}
            <h2 style={{ fontSize: '1.5rem', color: '#1f2937', marginBottom: '25px' }}>
              {questions[currentQuestion].question}
            </h2>

            {/* RĂSPUNSURILE - folosim .map() pentru a crea un buton pentru fiecare răspuns */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '25px' }}>
              {questions[currentQuestion].answers.map((answer, index) => {
                // Verifică dacă acest răspuns e corect
                const isCorrect = index === questions[currentQuestion].correct;
                // Verifică dacă user-ul a selectat acest răspuns
                const isSelected = selectedAnswer === index;

                // STILIZARE DINAMICĂ a butonului 
                let buttonStyle = {
                  width: '100%',
                  textAlign: 'left',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '2px solid',
                  cursor: isAnswered ? 'default' : 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.3s',
                  backgroundColor: 'white',
                  fontWeight: '500'
                };

                if (!isAnswered) {
                  // Dacă nu s-a răspuns încă, butoanele sunt normale
                  buttonStyle.borderColor = '#d1d5db';
                } else {
                  // După răspuns, arată culori diferite
                  if (isCorrect) {
                    buttonStyle.borderColor = '#10b981'; // Verde pentru corect
                    buttonStyle.backgroundColor = '#d1fae5';
                  } else if (isSelected) {
                    buttonStyle.borderColor = '#ef4444'; // Roșu pentru greșit
                    buttonStyle.backgroundColor = '#fee2e2';
                  } else {
                    buttonStyle.borderColor = '#d1d5db'; // Gri pentru restul
                    buttonStyle.opacity = '0.5';
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={isAnswered}
                    style={buttonStyle}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>{answer}</span>
                      {/* Arată iconițe doar după ce s-a răspuns */}
                      {isAnswered && (
                        isCorrect ? (
                          <span style={{ color: '#10b981', fontSize: '1.5rem' }}>✓</span>
                        ) : isSelected ? (
                          <span style={{ color: '#ef4444', fontSize: '1.5rem' }}>✗</span>
                        ) : null
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* BUTON NEXT - Apare doar după ce s-a răspuns */}
            {isAnswered && (
              <button
                onClick={handleNextQuestion}
                style={{
                  width: '100%',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '15px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.3s'
                }}
              >
                {/* Text diferit pentru ultima întrebare */}
                {currentQuestion === questions.length - 1 ? 'See Results' : 'Next Question →'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ========== RENDER APLICAȚIA ==========
// Creează root-ul React și afișează componenta
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<IllinoisQuiz />);