// ========== MEMORY.JS - ILLINOIS MEMORY GAME ==========

const { useState, useEffect } = React;

function IllinoisMemoryGame() {
    // ========== STATE VARIABLES (Variabile de stare) ==========
    const [cards, setCards] = useState([]); // Array-ul cu toate cardurile (16 carduri = 8 perechi × 2)
    const [flipped, setFlipped] = useState([]); // Array cu indexurile cardurilor întoarse
    const [matched, setMatched] = useState([]); // Array cu ID-urile cardurilor care au fost matched
    const [moves, setMoves] = useState(0); // Numărul de mișcări (moves)
    const [gameWon, setGameWon] = useState(false); // A câștigat jocul?

    // ========== ARRAY CU SIMBOLURI ILLINOIS ==========
    // Fiecare card are: id (identificator unic), symbol (emoji), name (nume descriptiv)
    const cardSymbols = [
        { id: 1, symbol: '🏛️', name: 'Capitol' },        // State Capitol
        { id: 2, symbol: '🌽', name: 'Corn' },            // Corn (agricultura Illinois)
        { id: 3, symbol: '🏙️', name: 'Chicago' },        // Skyline Chicago
        { id: 4, symbol: '🦌', name: 'Deer' },            // State Animal: White-tailed Deer
        { id: 5, symbol: '🐦', name: 'Cardinal' },        // State Bird: Cardinal
        { id: 6, symbol: '🌾', name: 'Prairie' },         // Prairie (câmpii)
        { id: 7, symbol: '🎭', name: 'Theater' },         // Chicago Theater
        { id: 8, symbol: '🪻', name: 'Violet' }           // State Flower: Violet
    ];

    // ========== FUNCȚIE PENTRU A AMESTECA CARDURILE ==========
    // Această funcție pregătește jocul: duplică cardurile, le amestecă și resetează totul
    const shuffleCards = () => {
        // Duplică fiecare card (avem nevoie de 2 pentru fiecare simbol)
        const duplicatedCards = [...cardSymbols, ...cardSymbols]
            // Adaugă un uniqueId pentru fiecare card (pentru React key)
            .map((card, index) => ({ ...card, uniqueId: index }))
            // Amestecă cardurile random
            .sort(() => Math.random() - 0.5);
        
        // Setează toate state-urile la valorile inițiale
        setCards(duplicatedCards);
        setFlipped([]); // Niciun card întors
        setMatched([]); // Niciun match găsit
        setMoves(0); // 0 mișcări
        setGameWon(false); // Jocul nu e câștigat
    };

    // ========== useEffect - INIȚIALIZARE JOC ==========
    // useEffect rulează cod când componenta se montează (apare pe ecran)
    // [] = array gol înseamnă "rulează doar o dată, la început"
    useEffect(() => {
        shuffleCards(); // Pregătește jocul când pagina se încarcă
    }, []);

    // ========== FUNCȚIE PENTRU CLICK PE CARD ==========
    const handleCardClick = (index) => {
        // VERIFICĂRI - Nu permite click în anumite situații:
        
        // 1. Dacă sunt deja 2 carduri întoarse (așteptăm să se verifice match-ul)
        if (flipped.length === 2) return;
        
        // 2. Dacă cardul pe care vrei să faci click e deja întors
        if (flipped.includes(index)) return;
        
        // 3. Dacă cardul a fost deja matched
        if (matched.includes(cards[index].id)) return;

        // ÎNTOARCE CARDUL
        // Adaugă indexul cardului în array-ul cu carduri întoarse
        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        // ========== VERIFICĂ MATCH (dacă sunt 2 carduri întoarse) ==========
        if (newFlipped.length === 2) {
            // Crește numărul de mișcări
            setMoves(moves + 1);
            
            // Ia cardurile care au fost întoarse
            const firstCard = cards[newFlipped[0]];
            const secondCard = cards[newFlipped[1]];

            // COMPARĂ CARDURILE
            if (firstCard.id === secondCard.id) {
                // ✅ MATCH GĂSIT!
                // Adaugă ID-ul cardului în array-ul matched
                setMatched([...matched, firstCard.id]);
                // Resetează array-ul flipped (cardurile rămân întoarse pentru că sunt în matched)
                setFlipped([]);
                
                // VERIFICĂ DACĂ JOCUL E CÂȘTIGAT
                // Dacă toate cardurile au fost matched
                if (matched.length + 1 === cardSymbols.length) {
                    // Așteaptă 500ms înainte să arate ecranul de victorie
                    setTimeout(() => setGameWon(true), 500);
                }
            } else {
                // ❌ NU E MATCH
                // Așteaptă 1 secundă și apoi întoarce cardurile înapoi
                setTimeout(() => setFlipped([]), 1000);
            }
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #581c87 0%, #7c3aed 50%, #c084fc 100%)',
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
                maxWidth: '900px',
                width: '100%'
            }}>
                
                {/* ========== HEADER ========== */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '2.5rem', color: '#581c87', marginBottom: '10px' }}>🎴 Illinois Memory Match</h1>
                    <p style={{ color: '#666' }}>Match the state symbols and landmarks!</p>
                    
                    {/* STATISTICI - Moves și Matches */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginTop: '20px', fontSize: '1.2rem' }}>
                        <div style={{ color: '#7c3aed', fontWeight: 'bold' }}>
                            Moves: <span style={{ fontSize: '1.8rem' }}>{moves}</span>
                        </div>
                        <div style={{ color: '#7c3aed', fontWeight: 'bold' }}>
                            Matches: <span style={{ fontSize: '1.8rem' }}>{matched.length}/{cardSymbols.length}</span>
                        </div>
                    </div>
                </div>

                {/* ========== CONDITIONAL RENDERING ========== */}
                {gameWon ? (
                    // ========== ECRAN DE VICTORIE ==========
                    <div style={{ textAlign: 'center', padding: '50px 0' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
                        <h2 style={{ fontSize: '2rem', color: '#581c87', marginBottom: '20px' }}>Congratulations!</h2>
                        <p style={{ fontSize: '1.2rem', color: '#333', marginBottom: '10px' }}>
                            You won in <span style={{ fontWeight: 'bold', color: '#7c3aed' }}>{moves}</span> moves!
                        </p>
                        {/* Mesaj diferit în funcție de performanță */}
                        <p style={{ color: '#666', marginBottom: '30px', fontSize: '1.1rem' }}>
                            {moves <= 12 ? '🌟 Perfect! Amazing memory!' : 
                             moves <= 18 ? '👍 Great job!' : 
                             '✅ Well done!'}
                        </p>
                        
                        {/* BUTON PLAY AGAIN */}
                        <button
                            onClick={shuffleCards}
                            style={{
                                backgroundColor: '#7c3aed',
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
                            🔄 Play Again
                        </button>
                    </div>
                ) : (
                    // ========== GRID CU CARDURI ==========
                    <div>
                        {/* GRID 4x4 (16 carduri) */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '15px',
                            marginBottom: '25px'
                        }}>
                            {/* .map() creează un buton pentru fiecare card */}
                            {cards.map((card, index) => {
                                // Verifică starea cardului
                                const isFlipped = flipped.includes(index); // E întors acum?
                                const isMatched = matched.includes(card.id); // A fost matched?
                                const showCard = isFlipped || isMatched; // Arată fața sau spatele?

                                let cardStyle = {
                                    aspectRatio: '1',
                                    borderRadius: '15px',
                                    fontSize: '2.5rem',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    cursor: isMatched ? 'default' : 'pointer',
                                    transition: 'all 0.3s',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    opacity: isMatched ? '0.7' : '1'
                                };

                                if (showCard) {
                                    if (isMatched) {
                                        cardStyle.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                                        cardStyle.color = 'white';
                                    } else {
                                        cardStyle.background = 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)';
                                        cardStyle.color = 'white';
                                    }
                                } else {
                                    cardStyle.background = 'linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)';
                                    cardStyle.color = 'white';
                                }

                                return (
                                    <button
                                        key={card.uniqueId} // Key unic pentru React
                                        onClick={() => handleCardClick(index)}
                                        disabled={isMatched} // Dezactivează cardurile matched
                                        style={cardStyle}
                                    >
                                        {showCard ? (
                                            // ========== FAȚA CARDULUI ==========
                                            <div>
                                                <div style={{ fontSize: '3rem', marginBottom: '5px' }}>{card.symbol}</div>
                                                <div style={{ fontSize: '0.7rem', fontWeight: '600' }}>{card.name}</div>
                                            </div>
                                        ) : (
                                            // ========== SPATELE CARDULUI ==========
                                            <div style={{ fontSize: '4rem' }}>?</div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* BUTON RESET GAME */}
                        <button
                            onClick={shuffleCards}
                            style={{
                                width: '100%',
                                backgroundColor: '#7c3aed',
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
                            🔄 Reset Game
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

// ========== RENDER APLICAȚIA ==========
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<IllinoisMemoryGame />);