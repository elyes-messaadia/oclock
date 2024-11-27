let stopwatchInterval;
let elapsedTime = 0;
let isRunning = false;

function toggleStopwatch() {
  if (isRunning) {
    clearInterval(stopwatchInterval);
  } else {
    stopwatchInterval = setInterval(() => {
      elapsedTime += 1;
      document.getElementById('stopwatch-display').textContent = new Date(elapsedTime * 1000).toISOString().substr(11, 8);
    }, 1000);
  }
  isRunning = !isRunning;
}

function recordLap() {
  const lapTime = new Date(elapsedTime * 1000).toISOString().substr(11, 8);
  const lapList = document.getElementById('laps');
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  lapList.appendChild(lapItem);
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  elapsedTime = 0;
  isRunning = false;
  document.getElementById('stopwatch-display').textContent = '00:00:00';
  document.getElementById('laps').innerHTML = '';
}
