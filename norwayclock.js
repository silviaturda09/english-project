// ========== CLOCK.JS - DUAL TIME CLOCK ==========

const { useState, useEffect } = React;

function DualClock() {
    // ============= STATE VARIABLES =============
    const [time, setTime] = useState(new Date()); // Timpul curent (Date object)
    const [darkMode, setDarkMode] = useState(false); // Mod intunecat (dark mode) sau deschis (light mode)

    // ============= useEffect - UPDATE TIMPUL LA FIECARE SECUNDA =============
    // Acest useEffect creeaza un "timer" care actualizeaza timpul
    useEffect(() => {
        // setInterval = executa o functie la fiecare X milisecunde
        // 1000ms = 1 secunda
        const timerId = setInterval(() => {
            setTime(new Date()); // Actualizeaza timpul cu timpul curent
        }, 1000);

        // CLEANUP FUNCTION
        // return = cod care se executa cand componenta se demonteaza (dispare)
        // clearInterval = opreste timer-ul (previne memory leaks)
        return () => clearInterval(timerId);
    }, []); // [] = ruleaza doar o data, la inceput

    // ============= FUNCTII PENTRU FORMATARE TIMP =============

    // Functie care formeaza ora in format 12h AM/PM
    const formatTime = (date, timezone) => {
        return date.toLocaleTimeString('en-US', {
            timeZone: timezone,         // Zona de timp (ex: 'Europe/Oslo')
            hour: '2-digit',            // Ora cu 2 cifre (01, 02, ..., 12)
            minute: '2-digit',         // Minute cu 2 cifre (00, 01, ..., 59)
            second: '2-digit',        // Secunde cu 2 cifre (00, 01, ..., 59)
            hour12: true,              // Format 12h (AM/PM)
        });
    };

    // Functie care formateaza data (ex: "Monday, December 4, 2024")
    const formatDate = (date, timezone) => {
        return date.toLocaleDateString('en-US', {
            timeZone: timezone,         // Zona de timp
            weekday: 'long',           // Ziua saptamanii (Monday, Tuesday, ...)
            year: 'numeric',           // Anul (2024)
            month: 'long',             // Luna (December)
            day: 'numeric',            // Ziua (4)
        });
    };

    // Functie care extrage doar ora (0-23) pentru a determina daca e zi sau noapte
    const getHour = (date, timezone) => {
        const hour = parseInt(date.toLocaleTimeString('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            hour12: false,      // Format 24h
        }));
        return hour;
    };

    // ============= CALCULEAZA TIMPURILE PENTRU AMBELE ZONE =============
    const norwayTime = formatTime(time, 'Europe/Oslo'); // Ora in Norvegia
    const illinoisTime = formatTime(time, 'America/Chicago'); // Ora in Illinois, USA
    const norwayDate = formatDate(time, 'Europe/Oslo'); // Data in Norvegia
    const illinoisDate = formatDate(time, 'America/Chicago'); // Data in Illinois, USA
    const norwayHour = getHour(time, 'Europe/Oslo'); // Ora curenta in Norvegia (0-23)
    const illinoisHour = getHour(time, 'America/Chicago'); // Ora curenta in Illinois (0-23)

    // ============= DETERMINA DACA E ZI SAU NOAPTE =============
    // Zi = intre 6 AM si 8 PM (6 - 20)
    const isNorwayDay = norwayHour >= 6 && norwayHour < 20;
    const isIllinoisDay = illinoisHour >= 6 && illinoisHour < 20;

    return (
        // ============= CONTAINER PRINCIPAL =============  
        // Culoarea de fundal se schimba in functie de darkMode
        <div style={{
            minHeight: '100vh',
            background: darkMode 
                ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                : 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            transition: 'background 0.5s'
        }}>
            <div style={{ width: '100%', maxWidth: '1400px' }}>

                {/* ============= HEADER CU DARK MODE TOGGLE ============= */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
                        {/* Iconita de ceas */}
                        <span style={{ fontSize: '2.5rem' }}>⏰</span>
                        <h1 style={{ 
                            fontSize: '2.5rem', 
                            fontWeight: 'bold',
                            color: darkMode ? 'white' : '#1e3a8a',
                            margin: 0
                        }}>
                            Dual Time Clock: Norway & Illinois
                        </h1>
                    </div>
                    
                    {/* BUTON DARK MODE TOGGLE */}
                    <button
                        onClick={() => setDarkMode(!darkMode)} // Schimba starea darkMode
                        style={{
                            padding: '12px 30px',
                            borderRadius: '50px',
                            fontWeight: 'bold',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'all 0.3s',
                            backgroundColor: darkMode ? '#fbbf24' : '#1f2937',
                            color: darkMode ? '#1f2937' : 'white'
                        }}
                    >
                        {/* Afiseaza icon si text diferit in functie de mod */}
                        {darkMode ? (
                            <>
                                <span style={{ fontSize: '1.2rem' }}>☀️</span>
                                Light Mode
                            </>
                        ) : (
                            <>
                                <span style={{ fontSize: '1.2rem' }}>🌙</span>
                                Dark Mode
                            </>
                        )}
                    </button>
                </div>

                {/* ============= GRID CU CELE DOUA CEASURI ============= */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '30px',
                    marginBottom: '30px'
                }}>
                    {/* ============= CEAS NORVEGIA ============= */}
                    <div style={{
                        backgroundColor: darkMode ? '#374151' : 'white',
                        borderRadius: '20px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                        padding: '40px',
                        textAlign: 'center',
                        border: darkMode ? '2px solid #4b5563' : 'none',
                        transition: 'all 0.5s'
                    }}>
                        {/* EMOJI ZI/NOAPTE pentru Norway */}
                        <div style={{ marginBottom: '20px' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '10px' }}>
                                {isNorwayDay ? '☀️' : '🌙'}
                            </div>
                            <h2 style={{ 
                                fontSize: '1.8rem', 
                                fontWeight: 'bold',
                                marginBottom: '5px',
                                color: darkMode ? 'white' : '#1f2937'
                            }}>
                                🇳🇴 Norway
                            </h2>
                            <p style={{ 
                                fontSize: '0.9rem',
                                color: darkMode ? '#9ca3af' : '#6b7280'
                            }}>
                                Oslo, Europe
                            </p>
                        </div>
                        
                        {/* ORA CURENTA */}
                        <div style={{ 
                            fontSize: '3.5rem', 
                            fontWeight: 'bold',
                            marginBottom: '20px',
                            fontFamily: 'monospace',
                            color: darkMode ? '#60a5fa' : '#3b82f6'
                        }}>
                            {norwayTime}
                        </div>
                        
                        {/* DATA CURENTA */}
                        <div style={{ 
                            fontSize: '1.1rem',
                            marginBottom: '25px',
                            color: darkMode ? '#d1d5db' : '#374151'
                        }}>
                            {norwayDate}
                        </div>

                        {/* INFO TIMEZONE */}
                        <div style={{ 
                            paddingTop: '25px',
                            borderTop: darkMode ? '1px solid #4b5563' : '1px solid #e5e7eb'
                        }}>
                            <p style={{ 
                                fontSize: '0.9rem',
                                color: darkMode ? '#9ca3af' : '#6b7280'
                            }}>
                                Time Zone: CET (UTC+1)
                            </p>
                        </div>
                    </div>

                    {/* =============== CEASUL ILLINOIS ================ */}
                    <div style={{
                        backgroundColor: darkMode ? '#374151' : 'white',
                        borderRadius: '20px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                        padding: '40px',
                        textAlign: 'center',
                        border: darkMode ? '2px solid #4b5563' : 'none',
                        transition: 'all 0.5s'
                    }}>
                        {/* EMOJI ZI/NOAPTE pentru Illinois */}
                        <div style={{ marginBottom: '20px' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '10px' }}>
                                {isIllinoisDay ? '☀️' : '🌙'}
                            </div>
                            <h2 style={{ 
                                fontSize: '1.8rem', 
                                fontWeight: 'bold',
                                marginBottom: '5px',
                                color: darkMode ? 'white' : '#1f2937'
                            }}>
                                🇺🇸 Illinois
                            </h2>
                            <p style={{ 
                                fontSize: '0.9rem',
                                color: darkMode ? '#9ca3af' : '#6b7280'
                            }}>
                                Chicago, USA
                            </p>
                        </div>
                        
                        {/* ORA CURENTA */}
                        <div style={{ 
                            fontSize: '3.5rem', 
                            fontWeight: 'bold',
                            marginBottom: '20px',
                            fontFamily: 'monospace',
                            color: darkMode ? '#c084fc' : '#7c3aed'
                        }}>
                            {illinoisTime}
                        </div>
                        
                        {/* DATA CURENTA */}
                        <div style={{ 
                            fontSize: '1.1rem',
                            marginBottom: '25px',
                            color: darkMode ? '#d1d5db' : '#374151'
                        }}>
                            {illinoisDate}
                        </div>

                        {/* INFO TIMEZONE */}
                        <div style={{ 
                            paddingTop: '25px',
                            borderTop: darkMode ? '1px solid #4b5563' : '1px solid #e5e7eb'
                        }}>
                            <p style={{ 
                                fontSize: '0.9rem',
                                color: darkMode ? '#9ca3af' : '#6b7280'
                            }}>
                                Time Zone: CST (UTC-6)
                            </p>
                        </div>
                    </div>
                </div>

                {/* =============== INFO DESPRE DIFERENTA DE TIMP ============== */}
                <div style={{
                    backgroundColor: darkMode ? '#374151' : 'white',
                    borderRadius: '20px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    textAlign: 'center',
                    padding: '30px',
                    border: darkMode ? '2px solid #4b5563' : 'none',
                    transition: 'all 0.5s'
                }}>
                    <p style={{ 
                        fontSize: '1.2rem',
                        color: darkMode ? '#d1d5db' : '#374151'
                    }}>
                        ⏱️ Time Difference: <span style={{ fontWeight: 'bold' }}>7 hours</span>
                    </p>
                    <p style={{ 
                        fontSize: '0.95rem',
                        marginTop: '10px',
                        color: darkMode ? '#9ca3af' : '#6b7280'
                    }}>
                        When it's noon in Illinois, it's 7 PM in Norway
                    </p>
                </div>
            </div>
        </div>
    );
}

// ========== RENDER APLICAȚIA ==========
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DualClock />);