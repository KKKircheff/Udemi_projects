/* initialising watch arrows and time variables */ 
let timeStart = new Date();
let seconds = timeStart.getSeconds();
let minutes = timeStart.getMinutes();
let hours = timeStart.getHours();
let secEl = document.getElementById("secondArrow");
let minEl = document.getElementById("minuteArrow");
let hourEl = document.getElementById("hourArrow");
secEl.style.transform = `rotate(${seconds / 60 - 0.25}turn)`;
minEl.style.transform = `rotate(${minutes / 60 - 0.25}turn)`;
hourEl.style.transform = `rotate(${(hours + (minutes/60)) / 12 - 0.25}turn)`;
/*secEl.style.backgroundColor = `#003089`;
minEl.style.backgroundColor = `#a80b03`;
hourEl.style.backgroundColor = `#df0000`;*/

/* Preparing and display cifers */
  /*  - creating new LI */
 
  let cifersNum;
  let setAfter;
  for (let i=1; i<13; i++) {
    cifersNum= document.createElement('li');
    cifersNum.append(`${i}`);
    cifersNum.classList.add(`n${i}`);
    cifersNum.classList.add('nums');
    cifersNum.style.transform =`rotate(${i / 12}turn)`;
    setAfter = document.querySelector('.watch');
    setAfter.appendChild(cifersNum);
  }



/* Functions that display the time */

setInterval(timeDraw, 1000);

function timeDraw() {
  timeStart = new Date();
  seconds = timeStart.getSeconds();
  minutes = timeStart.getMinutes();
  hours = timeStart.getHours();
  secEl.style.transform = `rotate(${seconds / 60 - 0.25}turn)`;
  minEl.style.transform = `rotate(${minutes / 60 - 0.25}turn)`;
  hourEl.style.transform = `rotate(${(hours + (minutes/60)) / 12 - 0.25}turn)`;
}