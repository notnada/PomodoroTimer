let focusTime = 25 * 60;
let breakTime = 5 * 60;

let time = focusTime;     // starts in focus mode
let interval = null;
let running = false;
let currentMode = "focus";   // "focus" or "break"

const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const modeBtn  = document.getElementById("mode");

// Update timer display
function updateTimer() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timerEl.textContent = `${minutes}:${seconds}`;
}

// MODE SWITCH BUTTON
modeBtn.addEventListener("click", () => {
    // Stop timer if running
    clearInterval(interval);
    interval = null;
    running = false;
    startBtn.textContent = "Start";

    if (currentMode === "focus") {
        currentMode = "break";
        time = breakTime;
        modeBtn.textContent = "Break Mode";
    } else {
        currentMode = "focus";
        time = focusTime;
        modeBtn.textContent = "Focus Mode";
    }

    updateTimer();
});

// START / PAUSE / RESUME button
startBtn.addEventListener("click", () => {
    if (!running) {
        running = true;
        startBtn.textContent = "Pause";

        interval = setInterval(() => {
            time--;
            updateTimer();

            if (time <= 0) {
                clearInterval(interval);
                interval = null;
                running = false;
                startBtn.textContent = "Start";
            }
        }, 1000);
    } else {
        running = false;
        startBtn.textContent = "Resume";
        clearInterval(interval);
        interval = null;
    }
});

// RESET button
resetBtn.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
    running = false;
    startBtn.textContent = "Start";

    time = currentMode === "focus" ? focusTime : breakTime;
    updateTimer();
});

// initial load
updateTimer();

const jumpscare = document.getElementById('jumpscare');
let jumpscareShown = false;
let lastY = null; // track previous mouse Y position

function showJumpscare() {
    if (jumpscareShown) return;
    jumpscareShown = true;
    jumpscare.style.display = 'block';
    // Automatically hide after 3 seconds if needed
    setTimeout(() => {
        jumpscare.style.display = 'none';
        jumpscareShown = false;
    }, 200);
}

// Track exit intent only when cursor moves **upwards** toward top
document.addEventListener('mousemove', (e) => {
    if (lastY === null) {
        lastY = e.clientY;
        return;
    }

    // Detect upward movement
    if (e.clientY < lastY && e.clientY < 50) {
        showJumpscare();
    }

    lastY = e.clientY;
});


