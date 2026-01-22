// question-game.js
const questions = [
  { question: "What is the capital of Illinois?", options: ["Chicago", "Springfield", "Peoria", "Rockford"], answer: "Springfield" },
  { question: "Which river runs through Illinois?", options: ["Mississippi River", "Illinois River", "Ohio River", "Missouri River"], answer: "Illinois River" },
  { question: "What is the state flower of Illinois?", options: ["Rose", "Violet", "Sunflower", "Lily"], answer: "Violet" },
  { question: "What is the state animal of Illinois?", options: ["Bald Eagle", "White-tailed Deer", "American Bison", "Red Fox"], answer: "White-tailed Deer" },
  { question: "What is the state motto of Illinois?", options: ["Land of Lincoln", "The Prairie State", "State Sovereignty, National Union", "The Heartland State"], answer: "State Sovereignty, National Union" },
  { question: "Which famous film was filmed in Chicago?", options: ["Transformers", "The Dark Knight", "Groundhog Day", "Home Alone"], answer: "The Dark Knight" },
  { question: "What famous park is located in Chicago?", options: ["Millennium Park", "Lincoln Park", "Humboldt Park", "Jackson Park"], answer: "Millennium Park" },
  { question: "What is the largest city in Illinois?", options: ["Chicago", "Aurora", "Naperville", "Rockford"], answer: "Chicago" },
  { question: "What is the most visited attraction in Chicago?", options: ["Millennium Park", "The Art Institute of Chicago", "Navy Pier", "Willis Tower"], answer: "Navy Pier" },
  { question: "What is the state bird of Illinois?", options: ["Northern Cardinal", "American Robin", "Blue Jay", "Goldfinch"], answer: "Northern Cardinal" }
];

let questionNumber = questions.length;
let currentQuestionIndex = 0;
let score = 0;
let root = null;

// Render o întrebare
function renderQuestion() {
  const q = questions[currentQuestionIndex];
  root.innerHTML = '';

  // Card întrebarea + tabel vizual
  const card = document.createElement('div');
  card.className = 'question-card';

  const qtable = document.createElement('div');
  qtable.className = 'question-table';
  qtable.textContent = `${currentQuestionIndex + 1}. ${q.question}`;
  card.appendChild(qtable);

  // Opțiuni 2x2
  const list = document.createElement('div');
  list.className = 'options';
  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = option;
    btn.addEventListener('click', () => {
      try { playClick(); } catch(e) {}
      handleAnswer(btn, option);
    });
    list.appendChild(btn);
  });
  card.appendChild(list);

  root.appendChild(card);

  // Meta + controale
  const meta = document.createElement('div');
  meta.className = 'meta-row';

  const controls = document.createElement('div');
  controls.className = 'controls';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn-primary';
  nextBtn.textContent = 'Next';
  nextBtn.disabled = true;
  nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionNumber) renderQuestion();
    else showResults();
  });

  const restartBtn = document.createElement('button');
  restartBtn.className = 'btn-secondary';
  restartBtn.textContent = 'Restart';
  restartBtn.addEventListener('click', () => {
    score = 0; currentQuestionIndex = 0; renderQuestion();
  });

  controls.appendChild(nextBtn);
  controls.appendChild(restartBtn);
  meta.appendChild(controls);

  const scoreEl = document.createElement('div');
  scoreEl.className = 'score';
  scoreEl.textContent = `Score: ${score} / ${questionNumber}`;
  meta.appendChild(scoreEl);

  root.appendChild(meta);

  // Referințe pentru handler
  renderQuestion._nextBtn = nextBtn;
  renderQuestion._scoreEl = scoreEl;
}

// Handler răspuns
function handleAnswer(button, selected) {
  const correct = questions[currentQuestionIndex].answer;
  const optionButtons = Array.from(button.parentNode.children);
  optionButtons.forEach(b => b.disabled = true);

  if (selected === correct) {
    button.classList.add('correct');
    score++;
    try { playCorrect(); } catch(e) {}
  } else {
    button.classList.add('wrong');
    const correctBtn = optionButtons.find(b => b.textContent === correct);
    if (correctBtn) correctBtn.classList.add('correct');
    try { playWrong(); } catch(e) {}
  }

  if (renderQuestion._scoreEl) renderQuestion._scoreEl.textContent = `Score: ${score} / ${questionNumber}`;
  if (renderQuestion._nextBtn) renderQuestion._nextBtn.disabled = false;
}

// Afișează rezultatul final
function showResults() {
  root.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'question-card';

  const title = document.createElement('div');
  title.className = 'question-table';
  title.textContent = 'Quiz finished';
  card.appendChild(title);

  const details = document.createElement('div');
  details.style.marginTop = '12px';
  details.innerHTML = `<h2>Your score: ${score} / ${questionNumber}</h2>`;
  card.appendChild(details);

  const actions = document.createElement('div');
  actions.style.marginTop = '10px';

  const restart = document.createElement('button');
  restart.className = 'btn-primary';
  restart.textContent = 'Play again';
  restart.addEventListener('click', () => {
    score = 0; currentQuestionIndex = 0; renderQuestion();
  });

  actions.appendChild(restart);
  card.appendChild(actions);

  root.appendChild(card);
}

// Inițializare când DOM este gata
document.addEventListener('DOMContentLoaded', () => {
  root = document.getElementById('root');
  if (!root) { console.error('#root not found'); return; }
  renderQuestion();

});
