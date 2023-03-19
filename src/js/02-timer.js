import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    onValidDatePicker(selectedDates[0]);
  },
};

let timerId = null;
let chosenDate = null;
startBtn.disabled = true;

startBtn.addEventListener('click', onStartBtnClick);

flatpickr(datetimePicker, options);

function onValidDatePicker(selectedDate) {
  chosenDate = selectedDate.getTime();
  if (selectedDate < Date.now()) {
    window.alert('Please choose a date in the future');
  }

  if (selectedDate >= Date.now()) {
    startBtn.disabled = false;
  }
}

function onStartBtnClick(evt) {
  timerId = setInterval(startTimer, 1000);
  startBtn.disabled = true;
  datetimePicker.disabled = true;
}

function startTimer() {
  const distance = chosenDate - Date.now();
  const formatedDate = convertMs(distance);
  renderDate(formatedDate);
  if (
    secondsEl.textContent === '00' &&
    minutesEl.textContent === '00' &&
    hoursEl.textContent === '00' &&
    daysEl.textContent === '00'
  ) {
    clearInterval(timerId);
    window.alert('Your time has come');
  }
}

function renderDate({ days, hours, minutes, seconds }) {
  secondsEl.textContent = addLeadingZero(seconds);
  minutesEl.textContent = addLeadingZero(minutes);
  hoursEl.textContent = addLeadingZero(hours);
  daysEl.textContent = addLeadingZero(days);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
