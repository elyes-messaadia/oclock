let timerInterval;

function startTimer() {
  const input = document.getElementById('timer-input').value;
  let time = parseInt(input, 10);

  if (isNaN(time) || time <= 0) {
    alert('Veuillez entrer un temps valide.');
    return;
  }

  const display = document.getElementById('timer-display');
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (time <= 0) {
      clearInterval(timerInterval);
      display.textContent = 'Temps écoulé!';
      alert('Le temps est écoulé!');
      return;
    }

    time--;
    display.textContent = new Date(time * 1000).toISOString().substr(14, 5);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}
