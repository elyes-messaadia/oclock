function updateClock() {
    const clockDisplay = document.getElementById('clock-display');
    const now = new Date();
    
    // Convertir l'heure au fuseau horaire UTC+1
    const localTime = new Date(now.getTime() + 60 * 60 * 1000);
    const hours = localTime.getHours().toString().padStart(2, '0');
    const minutes = localTime.getMinutes().toString().padStart(2, '0');
    const seconds = localTime.getSeconds().toString().padStart(2, '0');
    
    clockDisplay.textContent = `${hours}:${minutes}:${seconds}`;
  }
  
  // Met à jour l'horloge toutes les secondes
  setInterval(updateClock, 1000);
  updateClock();
  