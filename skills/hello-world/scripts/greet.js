// greet.js - Logika umiejętności powitalnej

/**
 * Generuje spersonalizowane powitanie z aktualną sygnaturą czasową.
 */
function generateGreeting() {
    const now = new Date();

    // Formatowanie daty i czasu dla polskiej lokalizacji
    const timestamp = now.toLocaleString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    return `YOOO! I am your AI assistant. The current system time is: ${timestamp}.`;
}

// Wyświetlenie wyniku, który zostanie przechwycony przez agenta
console.log(generateGreeting());