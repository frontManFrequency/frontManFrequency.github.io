const cornoButton = document.getElementById("cornoButton");
const timerButton = document.getElementById("timerButton");
const stopwatchButton = document.getElementById("alarmButton");

const cornoSection = document.getElementById("cornoSection");
const timerSection = document.getElementById("timerSection");
const stopwatchSection = document.getElementById("alarmSection");

cornoSection.style.display = "flex";
timerSection.style.display = "none";
alarmSection.style.display = "none";

function showSection(sectionId) {
  cornoSection.style.display = "none";
  timerSection.style.display = "none";
  alarmSection.style.display = "none";

  document.getElementById(sectionId).style.display = "flex";
}
function stylizeButton(buttonId) {
  cornoButton.style.borderBottom = "none";
  timerButton.style.borderBottom = "none";
  alarmButton.style.borderBottom = "none";

  document.getElementById(buttonId).style.borderBottom = "solid #944CE2 2px";
}
cornoButton.addEventListener("click", () => showSection("cornoSection"));
cornoButton.addEventListener("click", () => stylizeButton("cornoButton"));

timerButton.addEventListener("click", () => showSection("timerSection"));
timerButton.addEventListener("click", () => stylizeButton("timerButton"));

stopwatchButton.addEventListener("click", () => showSection("alarmSection"));
stopwatchButton.addEventListener("click", () => stylizeButton("alarmButton"));

//_____________________
//corno
//_____________________
const cornometerDisplay = document.getElementById("cornometer");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");
const resumeButton = document.getElementById("resumeButton");

let startTime = null;
let intervalId = null;
let elapsedTimeDuringPause = 0;
stopButton.disabled = true;
function updateCornometer() {
  if (startTime === null) return; // Don't update if not started

  const now = Date.now();
  const elapsedTime = now - startTime + elapsedTimeDuringPause;

  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);

  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  cornometerDisplay.textContent = formattedTime;
  let hh = document.getElementById("hh");
  let mm = document.getElementById("mm");
  let ss = document.getElementById("ss");

  let h = minutes / 60;
  let m = minutes;
  let s = seconds;

  hh.style.strokeDashoffset = 510 - (510 * h) / 60;
  mm.style.strokeDashoffset = 630 - (630 * m) / 60;
  ss.style.strokeDashoffset = 760 - (760 * s) / 60;
}

function startCornometer() {
  if (startTime === null) {
      startTime = Date.now();
  } else {
    startTime = Date.now() - elapsedTimeDuringPause
  }
 
  intervalId = setInterval(updateCornometer, 10); // Update every 10 milliseconds

  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;
}
function resumeCornometer() {
startCornometer()
}
function stopCornometer() {
  elapsedTimeDuringPause =+ Date.now() - startTime;
  clearInterval(intervalId);
  intervalId = null;
  startButton.style.display = "none";
  resumeButton.style.display = "block";
  stopButton.disabled = true;
}

function resetCornometer() {
  startTime = null;

  cornometerDisplay.textContent = "00:00:00";
  let hh = document.getElementById("hh");
  let mm = document.getElementById("mm");
  let ss = document.getElementById("ss");
  ss.style.strokeDashoffset = 760;
  mm.style.strokeDashoffset = 630;
  hh.style.strokeDashoffset = 510;

  resetButton.disabled = true;
  startButton.disabled = false;
  stopButton.disabled = true;
  startButton.style.display = "block";
  resumeButton.style.display = "none";
}

startButton.addEventListener("click", startCornometer);
stopButton.addEventListener("click", stopCornometer);
resetButton.addEventListener("click", resetCornometer);
resumeButton.addEventListener("click", resumeCornometer);

//_____________________
//Alarm
//_____________________
const clockDisplay = document.getElementById("clock");
const hourSelect = document.getElementById("hour");
const minuteSelect = document.getElementById("minute");
const ampmSelect = document.getElementById("ampm");
const setAlarmButton = document.getElementById("setAlarmButton");
const alarmSound = document.getElementById("alarmSound");

let alarmHour = null;
let alarmMinute = null;
let alarmAmPm = null;

function updateClock() {
  const now = new Date();
  const hours = now.getHours() % 12; // Convert to 12-hour format
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = now.getHours() >= 12 ? "PM" : "AM";

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  clockDisplay.textContent = formattedTime;

  // Check for alarm every second
  if (
    alarmHour !== null &&
    alarmMinute !== null &&
    alarmAmPm !== null &&
    hours === alarmHour &&
    minutes === alarmMinute &&
    ampm === alarmAmPm
  ) {
    alarmSound.play(); // Play the alarm sound
  }
}

function setAlarm() {
  alarmHour = parseInt(hourSelect.value);
  alarmMinute = parseInt(minuteSelect.value);
  alarmAmPm = ampmSelect.value;
  alert("آلارم شما تنظیم شد");
}

// Populate hour and minute select options
for (let i = 1; i <= 12; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = i.toString().padStart(2, "0");
  hourSelect.appendChild(option);
}

for (let i = 0; i < 60; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = i.toString().padStart(2, "0");
  minuteSelect.appendChild(option);
}

// Update clock every second
setInterval(updateClock, 1000);

setAlarmButton.addEventListener("click", setAlarm);
//_____________________
//Timer
//_____________________
const stopButton1 = document.getElementById("stopButton1");
const alarmSound1 = document.getElementById("alarmSound1");
const resetButton1 = document.getElementById("resetButton1");
const countdownDisplay = document.getElementById("countdownDisplay"); // Get reference after element is loaded
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");
const startButton1 = document.getElementById("startButton1");

let targetTime = null;
let intervalId1 = null;

function updateCountdown() {
  if (targetTime === null || targetTime <= Date.now()) {
    clearInterval(intervalId1);
    intervalId1 = null;
    countdownDisplay.textContent = "00:00:00:00";

    startButton1.disabled = false;
    stopButton1.disabled = false; // Enable reset button when countdown ends
    alarmSound.play(); // Play the alarm sound
    return;
  }

  const remainingTime = targetTime - Date.now();

  const hours = Math.floor((remainingTime / (1000 * 3600)) % 60);
  const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
  const seconds = Math.floor((remainingTime / 1000) % 60);
  const milliseconds = Math.floor((remainingTime % 1000) / 10); // Added milliseconds

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds
    .toString()
    .padStart(3, "0")}`;
  countdownDisplay.textContent = formattedTime;

  let hh = document.getElementById("hh-timer");
  let mm = document.getElementById("mm-timer");
  let ss = document.getElementById("ss-timer");

  let h = hours;
  let m = minutes;
  let s = seconds;

  hh.style.strokeDashoffset = -510 - (510 * h) / 12;
  mm.style.strokeDashoffset = -630 - (630 * m) / 60;
  ss.style.strokeDashoffset = -760 - (760 * s) / 60;
}

function startCountdown() {
  const minutes = parseInt(minutesInput.value);
  const seconds = parseInt(secondsInput.value);

  if (isNaN(minutes) || isNaN(seconds) || minutes < 0 || seconds < 0) {
    alert("لطفا برای دقیقه و ثانیه مقدار عددی تعیین کنید");
    return;
  }

  targetTime = Date.now() + minutes * 60 * 1000 + seconds * 1000;
  intervalId1 = setInterval(updateCountdown, 10); // Update every 10 milliseconds for smoother display
  stopButton1.disabled = false;
  startButton1.disabled = true; // Disable start button while counting down
  resetButton1.disabled = false; // Enable stop and reset after start
}
function stopCountdown() {
  clearInterval(intervalId1);
  intervalId1 = null;
  targetTime = null;

  startButton1.disabled = false;
  stopButton1.disabled = true;
}
function resetCountdown() {
  targetTime = null;
  countdownDisplay.textContent = "00:00:00";

  alarmSound.pause(); // Ensure alarm is paused on reset
  stopCountdown(); // Stop the timer if running before reset
  let hh = document.getElementById("hh-timer");
  let mm = document.getElementById("mm-timer");
  let ss = document.getElementById("ss-timer");
  ss.style.strokeDashoffset = 760;
  mm.style.strokeDashoffset = 630;
  hh.style.strokeDashoffset = 510;
  startButton1.disabled = false;
  stopButton1.disabled = true;
  resetButton1.disabled = true; // Disable stop and reset after reset
}
startButton1.addEventListener("click", startCountdown);
stopButton1.addEventListener("click", stopCountdown);
resetButton1.addEventListener("click", resetCountdown);
