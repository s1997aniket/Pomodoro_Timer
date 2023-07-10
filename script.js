// Timer variables
// Timer variables
let workTime = parseInt(document.getElementById('session-length').value) * 60;
let breakTime = parseInt(document.getElementById('break-length').value) * 60;
let sessions = 2*parseInt(document.getElementById('session-count').value);


let timerInterval;
let isPaused = true;
let remainingSeconds;
flag = 'Session';

// Update the timer display
function updateTimerDisplay() {
  const minutes = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
  const seconds = (remainingSeconds % 60).toString().padStart(2, '0');
  document.getElementById('timer').textContent = `${minutes}:${seconds}`;
}

// Start the timer
function startTimer() {
  if (isPaused) {
    isPaused = false;
    timerInterval = setInterval(updateTime, 1000);
  }
}

// Pause the timer
function pauseTimer() {
  isPaused = true;
  clearInterval(timerInterval);
}

// Reset the timer
function resetTimer() {
  pauseTimer();
  remainingSeconds = workTime;
  updateTimerDisplay();
}

// Update the timer every second
function updateTime() {
  remainingSeconds--;
  if (remainingSeconds < 0) {
    // Timer has reached zero
    pauseTimer();
    if (sessions > 1 && flag == 'Session') {
      // Start break time
      sessions--;
      remainingSeconds = breakTime;
      alert('Time for a break!');
      flag = 'Break'
    } 

    else if (sessions > 1 && flag == 'Break') {
      // Start break time
      sessions--;
      remainingSeconds = workTime;
      alert('Time for a Session!');
      flag = 'Session'
    } 
    
    else {
      // All sessions completed
      remainingSeconds = 0;
      alert('All sessions completed!');
    }
  }
  updateTimerDisplay();
}

// Event listeners for buttons
document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('pause-btn').addEventListener('click', pauseTimer);
document.getElementById('reset-btn').addEventListener('click', resetTimer);

// Initial setup
resetTimer();
